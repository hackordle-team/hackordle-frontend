import React from "react";
import Board from "./Board";
import { MockGameState } from "../const/const";
import Keyboard from "./Keyboard";

interface GameProps {
  wordOfDay: string;
}

const Game: React.FC<GameProps> = ({ wordOfDay }) => {
  return (
    <div className="w-full m-auto">
      <Board cols={10} rows={8} gameState={MockGameState} />
      <Keyboard />
    </div>
  );
};

export default Game;
