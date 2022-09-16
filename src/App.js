import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Hastalar from "./pages/Hastalar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hastalar" element={<Hastalar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
