import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import MultiplayerGame from "./pages/MultiplayerGame";
import Multiplayer from "./pages/Multiplayer";
import Singleplayer from "./pages/Singleplayer";
import Help from "./pages/Help";

export const DictionaryContext = createContext<DictionaryType>([]);

type DictionaryType = string[];

const App: React.FC = () => {
  const [dictionary, setDictionary] = useState<DictionaryType>([]);

  useEffect(() => {
    fetch("https://hackordle.herokuapp.com/dictionary")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setDictionary(json?.dictionary || []);
      });
  }, []);

  return (
    <DictionaryContext.Provider value={dictionary}>
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
    </DictionaryContext.Provider>
  );
};

export default App;
