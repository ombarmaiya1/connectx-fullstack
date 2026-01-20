import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Landing } from "./components/Landing";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { DashboardLayout } from "./components/DashboardLayout";
import { Feed } from "./components/Feed";
import { Network } from "./components/Network";
import { Profile } from "./components/Profile";

import { ChatScreen } from "./components/ChatScreen";
import { Opportunities } from "./components/Opportunities";
import { CustomCursor } from "./components/CustomCursor";
import { Footer } from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App dark-theme">
          <div className="bg-orb orb-1"></div>
          <div className="bg-orb orb-2"></div>
          <CustomCursor />
          <Navbar />
          <Routes>
            <Route path="/" element={<><Landing /><Footer /></>} />
            <Route path="/login" element={<><Login /><Footer /></>} />
            <Route path="/signup" element={<><Signup /><Footer /></>} />

            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Opportunities />} />
              <Route path="feed" element={<Feed />} />
              <Route path="network" element={<Network />} />
              <Route path="opportunities" element={<Opportunities />} />
              <Route path="profile" element={<Profile />} />
              <Route path="messages" element={<ChatScreen />} />
              <Route path="chat/:userId" element={<ChatScreen />} />
              <Route path="chat" element={<ChatScreen />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
