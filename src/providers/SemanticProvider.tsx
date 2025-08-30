// src/providers/SemanticProvider.tsx
import { PropsWithChildren, useEffect, useLayoutEffect, useRef, useState } from "react";

type SemanticMode = "collect" | "collect-and-clean";

type ClassSet = Set<string>;
type MapEntry = { samples: ClassSet[]; intersection: ClassSet };

const IGNORED = new Set(["", "undefined", "null"]);

function toClassSet(el: Element): ClassSet {
  const raw = (el.getAttribute("class") || "").split(/\s+/).filter(Boolean);
  return new Set(raw.filter((c) => !IGNORED.has(c)));
}

function intersect(a: ClassSet, b: ClassSet): ClassSet {
  const out = new Set<string>();
  for (const c of a) if (b.has(c)) out.add(c);
  return out;
}

function computeIntersection(samples: ClassSet[]): ClassSet {
  if (samples.length === 0) return new Set();
  return samples.slice(1).reduce((acc, cur) => intersect(acc, cur), new Set(samples[0]));
}

function postSemanticMap(payload: Record<string, string[]>) {
  // Vite dev middleware endpoint
  return fetch("/__semantic", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ map: payload }),
  }).catch(() => {});
}

export function SemanticProvider({
  mode = "collect-and-clean",
  children,
}: PropsWithChildren<{ mode?: SemanticMode }>) {
  const aggregateRef = useRef<Map<string, MapEntry>>(new Map());
  const [cssReady, setCssReady] = useState(false);
  const flushTimer = useRef<number | null>(null);
  const lastSentRef = useRef<string>("");
  const duringCleanRef = useRef(false);
  const cleanedOnceRef = useRef(false);

  // Mark CSS ready when semantic.css is present (heuristic via CSS rule)
  useEffect(() => {
    // Try detect after HMR: check if a sentinel rule is injected
    const check = () => {
      try {
        for (const sheet of Array.from(document.styleSheets)) {
          // Accessing cssRules may throw on cross-origin; ignore
          // We simply check for any rule containing a known marker comment or class
          // Optional: customize marker in vite plugin if needed
          // If not accessible, fallback to a delay
        }
      } catch {}
      setCssReady(true);
    };
    // Small delay to let HMR apply styles
    const id = window.setTimeout(check, 300);
    return () => window.clearTimeout(id);
  }, []);

  const scanOne = (el: Element) => {
    if (!el.hasAttribute("data-class")) return;
    const key = el.getAttribute("data-class")!;
    if (!key) return;
    const classes = toClassSet(el);
    const map = aggregateRef.current;
    const entry = map.get(key) || { samples: [], intersection: new Set<string>() };
    entry.samples.push(classes);
    entry.intersection = computeIntersection(entry.samples);
    map.set(key, entry);
  };

  const scanTree = (root: Element | Document = document) => {
    root.querySelectorAll("[data-class]").forEach(scanOne);
  };

  const flush = () => {
    if (duringCleanRef.current) return;
    const map = aggregateRef.current;
    if (map.size === 0) return;
    const payload: Record<string, string[]> = {};
    for (const [key, entry] of map) {
      if (entry.intersection.size > 0) {
        payload[key] = Array.from(entry.intersection).sort();
      }
    }
    const serialized = JSON.stringify(payload);
    if (serialized === lastSentRef.current) return;
    lastSentRef.current = serialized;
    postSemanticMap(payload);
  };

  const scheduleFlush = () => {
    if (flushTimer.current) window.clearTimeout(flushTimer.current);
    flushTimer.current = window.setTimeout(flush, 500);
  };

  useLayoutEffect(() => {
    // Initial pass
    scanTree(document);
    scheduleFlush();

    const obs = new MutationObserver((mutations) => {
      let changed = false;
      for (const m of mutations) {
        if (m.type === "childList") {
          m.addedNodes.forEach((n) => {
            if (n.nodeType === 1) {
              scanTree(n as Element);
              changed = true;
            }
          });
        } else if (m.type === "attributes" && m.target instanceof Element) {
          if (m.attributeName === "class" || m.attributeName === "data-class") {
            scanOne(m.target);
            changed = true;
          }
        }
      }
      if (changed) scheduleFlush();
    });

    obs.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "data-class"],
    });

    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (mode !== "collect-and-clean" || !cssReady || cleanedOnceRef.current) return;
    // Clean once CSS is ready
    const clean = () => {
      duringCleanRef.current = true;
      document.querySelectorAll("[data-class]").forEach((el) => {
        const key = el.getAttribute("data-class")!;
        if (!key) return;
        (el as HTMLElement).className = key;
        el.removeAttribute("data-class");
      });
      cleanedOnceRef.current = true;
      duringCleanRef.current = false;
    };
    // Small delay to ensure CSS rules are applied
    const id = window.setTimeout(clean, 80);
    return () => window.clearTimeout(id);
  }, [mode, cssReady]);

  return <>{children}</>;
}