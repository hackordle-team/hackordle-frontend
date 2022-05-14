import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import MultiplayerGame from "./pages/MultiplayerGame";
import Multiplayer from "./pages/Multiplayer";
import Singleplayer from "./pages/Singleplayer";
import Help from "./pages/Help";
import Game from "./game/Game";


const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="single" element={<Singleplayer />} />
        <Route path="multi" element={<Multiplayer />} />
        <Route path="multi/:gameId" element={<MultiplayerGame />} />
        <Route path="help" element={<Help />} />
        <Route path="*" element={<h1>This page doesn&apos;t exist</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
