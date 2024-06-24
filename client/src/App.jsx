import React from "react";
import LandingPage from "./LandingPage";
import MeetingPage from "./components/MeetingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="*" element={<LandingPage />} />
          <Route path="/meeting/:roomId" element={<MeetingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
