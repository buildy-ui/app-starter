"use client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";

import { Dashboard } from "@/layouts";
import { Blank, _404 } from "@/pages";
import { lesseUITheme } from "@ui8kit/theme";

function App() {

  return (
    <ThemeProvider theme={lesseUITheme}>
      <Router>
        <Routes>
          <Route index element={<Dashboard page={Blank} />} />
          <Route path="*" element={<Dashboard page={_404} />} />
        </Routes>
      </Router>
    </ThemeProvider>
      
  );
}

export default App; 