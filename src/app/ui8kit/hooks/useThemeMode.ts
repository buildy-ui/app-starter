import { useState, useEffect } from 'react';

const THEME_MODE_KEY = 'ui8kit-theme-mode';

export function useThemeMode() {
  const [mode, setMode] = useState<'utility' | 'semantic'>('utility');

  useEffect(() => {
    // Check localStorage on initialization
    const savedMode = localStorage.getItem(THEME_MODE_KEY) as 'utility' | 'semantic';
    
    if (savedMode && (savedMode === 'utility' || savedMode === 'semantic')) {
      setMode(savedMode);
    } else {
      setMode('utility');
      localStorage.setItem(THEME_MODE_KEY, 'utility');
      setMode('utility');
    }
  }, []);

  const switchMode = (newMode: 'utility' | 'semantic') => {
    setMode(newMode);
    localStorage.setItem(THEME_MODE_KEY, newMode);
    
    // Optionally: you can add an event for synchronization between tabs
    window.dispatchEvent(new CustomEvent('themeMode', { detail: newMode }));
  };

  const toggleMode = () => {
    const newMode = mode === 'utility' ? 'semantic' : 'utility';
    switchMode(newMode);
  };

  // Synchronization between tabs (optional)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === THEME_MODE_KEY && e.newValue) {
        const newMode = e.newValue as 'utility' | 'semantic';
        if (newMode === 'utility' || newMode === 'semantic') {
          setMode(newMode);
        }
      }
    };

    const handleCustomEvent = (e: CustomEvent) => {
      const newMode = e.detail as 'utility' | 'semantic';
      if (newMode === 'utility' || newMode === 'semantic') {
        setMode(newMode);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('themeMode', handleCustomEvent as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('themeMode', handleCustomEvent as EventListener);
    };
  }, []);

  return { mode, toggleMode, switchMode };
}
