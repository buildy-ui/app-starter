/**
 * Grid component using Tailwind CSS classes (JIT-compatible)
 * 
 * Uses className for responsive grid layouts (md:, lg:, xl: modifiers)
 * All class strings are static for proper Tailwind JIT compilation
 */
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

// =============================================================================
// STATIC CLASS MAPS - All strings are static for Tailwind JIT
// =============================================================================

const GRID_COLUMN_CLASSES = {
  "1": "grid-cols-1",
  "2": "grid-cols-2",
  "3": "grid-cols-3",
  "4": "grid-cols-4",
  "5": "grid-cols-5",
  "6": "grid-cols-6",
  "12": "grid-cols-12",
  // Responsive patterns (static strings for JIT)
  "1-2": "grid-cols-1 md:grid-cols-2",
  "1-3": "grid-cols-1 lg:grid-cols-3",
  "1-4": "grid-cols-1 lg:grid-cols-4",
  "1-5": "grid-cols-1 lg:grid-cols-5",
  "1-6": "grid-cols-1 lg:grid-cols-6",
  "2-3": "grid-cols-2 lg:grid-cols-3",
  "2-4": "grid-cols-2 lg:grid-cols-4",
  "2-5": "grid-cols-2 lg:grid-cols-5",
  "2-6": "grid-cols-2 lg:grid-cols-6",
  "3-4": "grid-cols-3 lg:grid-cols-4",
  "3-5": "grid-cols-3 lg:grid-cols-5",
  "3-6": "grid-cols-3 lg:grid-cols-6",
  "4-5": "grid-cols-4 lg:grid-cols-5",
  "4-6": "grid-cols-4 lg:grid-cols-6",
  "5-6": "grid-cols-5 lg:grid-cols-6",
  "1-2-3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  "1-2-4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  "1-2-6": "grid-cols-1 md:grid-cols-2 lg:grid-cols-6",
  "1-3-4": "grid-cols-1 md:grid-cols-3 lg:grid-cols-4",
  "1-3-6": "grid-cols-1 md:grid-cols-3 lg:grid-cols-6",
  "2-3-4": "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  "1-2-3-4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
} as const;

const GAP_CLASSES = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  "2xl": "gap-10",
  "3xl": "gap-12"
} as const;

const GAP_X_CLASSES = {
  none: "gap-x-0",
  xs: "gap-x-1",
  sm: "gap-x-2",
  md: "gap-x-4",
  lg: "gap-x-6",
  xl: "gap-x-8"
} as const;

const GAP_Y_CLASSES = {
  none: "gap-y-0",
  xs: "gap-y-1",
  sm: "gap-y-2",
  md: "gap-y-4",
  lg: "gap-y-6",
  xl: "gap-y-8"
} as const;

const ALIGN_CLASSES = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch"
} as const;

const JUSTIFY_CLASSES = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly"
} as const;

const JUSTIFY_ITEMS_CLASSES = {
  start: "justify-items-start",
  center: "justify-items-center",
  end: "justify-items-end",
  stretch: "justify-items-stretch"
} as const;

const ROW_CLASSES = {
  "1": "grid-rows-1",
  "2": "grid-rows-2",
  "3": "grid-rows-3",
  "4": "grid-rows-4",
  "5": "grid-rows-5",
  "6": "grid-rows-6",
  "12": "grid-rows-12"
} as const;

const CONTENT_CLASSES = {
  start: "content-start",
  center: "content-center",
  end: "content-end",
  between: "content-between",
  around: "content-around",
  evenly: "content-evenly"
} as const;

const FLOW_CLASSES = {
  row: "grid-flow-row",
  col: "grid-flow-col",
  dense: "grid-flow-dense",
  rowDense: "grid-flow-row-dense",
  colDense: "grid-flow-col-dense"
} as const;

const AUTO_ROWS_CLASSES = {
  auto: "auto-rows-auto",
  min: "auto-rows-min",
  max: "auto-rows-max",
  fr: "auto-rows-fr"
} as const;

const AUTO_COLS_CLASSES = {
  auto: "auto-cols-auto",
  min: "auto-cols-min",
  max: "auto-cols-max",
  fr: "auto-cols-fr"
} as const;

const COL_SPAN_CLASSES = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
  auto: "col-auto",
  full: "col-span-full"
} as const;

const COL_START_CLASSES = {
  auto: "col-start-auto",
  1: "col-start-1",
  2: "col-start-2",
  3: "col-start-3",
  4: "col-start-4",
  5: "col-start-5",
  6: "col-start-6",
  7: "col-start-7",
  8: "col-start-8",
  9: "col-start-9",
  10: "col-start-10",
  11: "col-start-11",
  12: "col-start-12",
  13: "col-start-13"
} as const;

const COL_END_CLASSES = {
  auto: "col-end-auto",
  1: "col-end-1",
  2: "col-end-2",
  3: "col-end-3",
  4: "col-end-4",
  5: "col-end-5",
  6: "col-end-6",
  7: "col-end-7",
  8: "col-end-8",
  9: "col-end-9",
  10: "col-end-10",
  11: "col-end-11",
  12: "col-end-12",
  13: "col-end-13"
} as const;

const ORDER_CLASSES = {
  first: "order-first",
  last: "order-last",
  none: "order-none",
  1: "order-1",
  2: "order-2",
  3: "order-3",
  4: "order-4",
  5: "order-5",
  6: "order-6",
  7: "order-7",
  8: "order-8",
  9: "order-9",
  10: "order-10",
  11: "order-11",
  12: "order-12"
} as const;

// =============================================================================
// TYPES
// =============================================================================

type GridCols = keyof typeof GRID_COLUMN_CLASSES;
type GridGap = keyof typeof GAP_CLASSES;
type GridGapX = keyof typeof GAP_X_CLASSES;
type GridGapY = keyof typeof GAP_Y_CLASSES;
type GridAlign = keyof typeof ALIGN_CLASSES;
type GridJustify = keyof typeof JUSTIFY_CLASSES;
type GridJustifyItems = keyof typeof JUSTIFY_ITEMS_CLASSES;
type GridRows = keyof typeof ROW_CLASSES;
type GridContent = keyof typeof CONTENT_CLASSES;
type GridFlow = keyof typeof FLOW_CLASSES;
type GridAutoRows = keyof typeof AUTO_ROWS_CLASSES;
type GridAutoCols = keyof typeof AUTO_COLS_CLASSES;
type GridColSpan = keyof typeof COL_SPAN_CLASSES;
type GridColStart = keyof typeof COL_START_CLASSES;
type GridColEnd = keyof typeof COL_END_CLASSES;
type GridOrder = keyof typeof ORDER_CLASSES;

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns or responsive pattern like "1-2-3" */
  cols?: GridCols;
  /** Gap between items */
  gap?: GridGap;
  /** Horizontal gap */
  gapX?: GridGapX;
  /** Vertical gap */
  gapY?: GridGapY;
  /** Vertical alignment of items */
  align?: GridAlign;
  /** Horizontal distribution of items */
  justify?: GridJustify;
  /** Alignment of items within cells */
  justifyItems?: GridJustifyItems;
  /** Number of rows */
  rows?: GridRows;
  /** Alignment of rows */
  content?: GridContent;
  /** Grid auto-flow direction */
  flow?: GridFlow;
  /** Auto-generated row sizing */
  autoRows?: GridAutoRows;
  /** Auto-generated column sizing */
  autoCols?: GridAutoCols;
}

export interface GridColProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns to span */
  span?: GridColSpan;
  /** Starting column */
  start?: GridColStart;
  /** Ending column */
  end?: GridColEnd;
  /** Display order */
  order?: GridOrder;
}

// =============================================================================
// GRID COMPONENT
// =============================================================================

const Grid = forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  const {
    cols = "1",
    gap = "md",
    gapX,
    gapY,
    align,
    justify,
    justifyItems,
    rows,
    content,
    flow,
    autoRows,
    autoCols,
    children,
    className,
    ...rest
  } = props;

  const gridClassName = cn(
    "grid",
    GRID_COLUMN_CLASSES[cols],
    GAP_CLASSES[gap],
    gapX && GAP_X_CLASSES[gapX],
    gapY && GAP_Y_CLASSES[gapY],
    align && ALIGN_CLASSES[align],
    justify && JUSTIFY_CLASSES[justify],
    justifyItems && JUSTIFY_ITEMS_CLASSES[justifyItems],
    rows && ROW_CLASSES[rows],
    content && CONTENT_CLASSES[content],
    flow && FLOW_CLASSES[flow],
    autoRows && AUTO_ROWS_CLASSES[autoRows],
    autoCols && AUTO_COLS_CLASSES[autoCols],
    className
  );

  return (
    <div ref={ref} className={gridClassName} {...rest}>
      {children}
    </div>
  );
});

Grid.displayName = "Grid";

// =============================================================================
// GRID COL COMPONENT
// =============================================================================

const GridCol = forwardRef<HTMLDivElement, GridColProps>((props, ref) => {
  const { span, start, end, order, children, className, ...rest } = props;

  const colClassName = cn(
    span && COL_SPAN_CLASSES[span],
    start && COL_START_CLASSES[start],
    end && COL_END_CLASSES[end],
    order && ORDER_CLASSES[order],
    className
  );

  return (
    <div ref={ref} className={colClassName} {...rest}>
      {children}
    </div>
  );
});

GridCol.displayName = "GridCol";

// =============================================================================
// COMPOUND EXPORT
// =============================================================================

const CompoundGrid = Object.assign(Grid, {
  Col: GridCol
});

export { CompoundGrid as Grid, GridCol };
