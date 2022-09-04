import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import FirstPage from "./components/firstpage/FirstPage";
import Home from "./components/homepage/Home";
import Laptops from "./components/laptops/Laptops";
import SecondPage from "./components/secondpage/SecondPage";
import SingleLaptop from "./components/SingleLaptop/SingleLaptop";

import { FormProvider } from "./context/FormContext";

function App() {
  return (
    <FormProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/first" element={<FirstPage />} />
          <Route path="/second" element={<SecondPage />} />
          <Route path="/laptops" element={<Laptops />} />
          <Route path="/laptop/:id" element={<SingleLaptop />} />
        </Routes>
      </Router>
    </FormProvider>
  );
}

export default App;
