import React from "react";
import Board from "./Board";
import { MockGameState } from "../const/const";
import Keyboard from "./Keyboard";
import Hackbar from "./Hackbar";
import RemoveColumn from "./HackUtil";

interface GameProps {
  wordOfDay: string;
}

const Game: React.FC<GameProps> = ({ wordOfDay }) => {
  return (
    <div className="w-full m-auto">
      <Board rows={8} gameState={MockGameState} />
      <Hackbar hackNames={["HACK 1"]}
               hackFunctions={[RemoveColumn]}
               gameState={MockGameState}/>
      <Keyboard />
    </div>
  );
};

export default Game;
