import { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LandingPage } from "./pages/LandingPage";

import { Box, Button, Icon } from "@ui8kit/core"
import { Moon, Sun } from "lucide-react"

function App() {

  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark mode toggle
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      document.documentElement.classList.toggle('dark', newMode);
      return newMode;
    });
  }, []);

  // Initialize dark mode from system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const initialMode = mediaQuery.matches;
    setIsDarkMode(initialMode);
    document.documentElement.classList.toggle('dark', initialMode);
  }, []);

  return (
      <Router>
        <Box position="fixed" style={{ right: 5, bottom: 10 }}>
          <Button variant="link" onClick={toggleDarkMode}>
            <Icon lucideIcon={isDarkMode ? Moon : Sun} />
          </Button>
        </Box>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
      
  );
}

export default App; 