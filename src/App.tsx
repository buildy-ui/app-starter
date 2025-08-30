"use client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SemanticProvider } from "@/providers/SemanticProvider";

import { Dashboard } from "@/layouts";
import { Blank, _404 } from "@/pages";
import { lesseUITheme } from "@ui8kit/theme";

function App() {

  return (
    <ThemeProvider theme={lesseUITheme}>
      <SemanticProvider mode="collect-and-clean">
        <Router>
          <Routes>
            <Route index element={<Blank />} />
          </Routes>
        </Router>
      </SemanticProvider>
    </ThemeProvider>

  );
}

export default App; 