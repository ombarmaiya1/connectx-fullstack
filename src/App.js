import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Landing } from "./components/Landing";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { DashboardLayout } from "./components/DashboardLayout";
import { Feed } from "./components/Feed";
import { Network } from "./components/Network";
import { Profile } from "./components/Profile";
import { Messages } from "./components/Messages";
import { Opportunities } from "./components/Opportunities";
import { Footer } from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="App dark-theme">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Feed />} />
            <Route path="network" element={<Network />} />
            <Route path="opportunities" element={<Opportunities />} />
            <Route path="profile" element={<Profile />} />
            <Route path="messages" element={<Messages />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
