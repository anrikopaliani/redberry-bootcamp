import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import FirstPage from "./components/firstpage/FirstPage";
import Home from "./components/homepage/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/first" element={<FirstPage />} />
      </Routes>
    </Router>
  );
}

export default App;
