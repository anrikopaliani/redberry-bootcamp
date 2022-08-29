import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import FirstPage from "./components/firstpage/FirstPage";
import Home from "./components/homepage/Home";

import { FormProvider } from "./context/FormContext";

function App() {
  return (
    <FormProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/first" element={<FirstPage />} />
        </Routes>
      </Router>
    </FormProvider>
  );
}

export default App;
