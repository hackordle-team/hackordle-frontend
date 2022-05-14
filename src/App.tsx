import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import MultiplayerGame from "./pages/MultiplayerGame";
import Multiplayer from "./pages/Multiplayer";
import Singleplayer from "./pages/Singleplayer";
import Help from "./pages/Help";
import Hackbar from "./game/Hackbar";


const App: React.FC = () => {
  return (
    <Router>
      <Hackbar hackNames={["ADD ROW", "ADD COIl", "HACK 3", "HACK 4"]}
               hackFunctions={[() => console.log("ADD ROW"), () => console.log("ADD COIL"),
                              () => console.log("ADD COIL"), () => console.log("ADD COIL")]}/>
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
