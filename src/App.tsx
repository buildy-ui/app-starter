"use client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SemanticProvider } from "@/providers/SemanticProvider";

import { Dashboard } from "@/layouts";
import { Blank, _404 } from "@/pages";
import { lesseUITheme } from "@ui8kit/theme";

/**
 * @author BuildY/UI
 * @version 1.0.0
 * @description BuildY/UI is a UI library for building web applications.
 * @returns 
 * 
 * Next steps:
 * - improved hot reload watching for semantic css or save files because the hmr is not working for semantic css
 * - perfect names and organize data-class attribute
 * - create mini ui framework pure semantic - button button-primary button-small
 */

function App() {

  return (
    <ThemeProvider theme={lesseUITheme}>
      <SemanticProvider mode="collect-and-clean">
        <Router>
          <Routes>
            <Route index element={<Dashboard page={Blank} />} />
          </Routes>
        </Router>
      </SemanticProvider>
    </ThemeProvider>

  );
}

export default App; 