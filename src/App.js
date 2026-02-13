import React from "react";
 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Donors from "./pages/Donors";
import Location from "./pages/Location";
import Info from "./pages/Info";
import Login from "./pages/Login";
import About from "./pages/About";
import Success from "./pages/Success";


function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/donors" element={<Donors />} />
          <Route path="/Success" element={<Success />} />
          <Route path="/location" element={<Location />} />
          <Route path="/info" element={<Info />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
