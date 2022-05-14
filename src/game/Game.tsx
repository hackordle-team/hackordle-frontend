import React, { useContext } from "react";
import Board from "./Board";
import { MockGameState } from "../const/const";
import Keyboard from "./Keyboard";
import Hackbar from "./Hackbar";
import { DictionaryContext } from "../App";

interface GameProps {
  wordOfDay: string;
}

const Game: React.FC<GameProps> = ({ wordOfDay }) => {
  const dict = useContext(DictionaryContext);

  return (
    <div className="w-full m-auto">
      <Board cols={10} rows={8} gameState={MockGameState} />
      <Hackbar
        hackNames={["HACK 1", "HACK 2", "HACK 3", "HACK 4"]}
        hackFunctions={[
          () => console.log("ADD ROW"),
          () => console.log("ADD COIL"),
          () => console.log("ADD COIL"),
          () => console.log("ADD COIL"),
        ]}
      />
      <Keyboard />
    </div>
  );
};

export default Game;
