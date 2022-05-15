import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import MultiplayerGame from "./pages/MultiplayerGame";
import Multiplayer from "./pages/Multiplayer";
import Singleplayer from "./pages/Singleplayer";
import Help from "./pages/Help";
import useInitialContent from "./hooks/useInitalContent";
import { GameContentType, QuestionType } from "./const/types";

export const GameContendContext = createContext<GameContentType>({});

type DictionaryType = string[];

const App: React.FC = () => {
  const [dictionary, setDictionary] = useState<DictionaryType | undefined>();
  const [word, setWord] = useState<string | undefined>();
  const [questions, setQuestions] = useState<QuestionType[] | undefined>();

  useEffect(() => {
    useInitialContent({
      onQuestionsLoad: (q) => setQuestions(q),
      onDictionaryLoad: (d) => setDictionary(d),
      onWordOfDayLoad: (w) => setWord(w),
    })();
  }, []);

  return (
    <GameContendContext.Provider
      value={{ dictionary, questions, wordOfDay: word }}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Singleplayer />} />
          <Route path="multi" element={<Multiplayer />} />
          <Route path="multi/:gameId" element={<MultiplayerGame />} />
          <Route path="help" element={<Help />} />
          <Route path="*" element={<h1>This page doesn&apos;t exist</h1>} />
        </Routes>
      </Router>
    </GameContendContext.Provider>
  );
};

export default App;
