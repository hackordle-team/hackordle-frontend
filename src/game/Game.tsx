import React, { useContext, useState } from "react";
import Board from "./Board";
import { MockGameState } from "../const/const";
import Keyboard from "./Keyboard";
import Hackbar from "./Hackbar";
import { GameContendContext } from "../App";



const Game: React.FC = () => {
  const content = useContext(GameContendContext);
  console.log(content);

  const [innerInput, setInnerInput] = useState<string>("");

  const handleBackspace = () => {
    setInnerInput((prevState) => prevState.slice(0,-1));
  };

  const handleLetter = (val: string) => {
    setInnerInput((prevState) => prevState + val);
  }
  console.log(innerInput);
  
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
      <Keyboard handleBackspace={handleBackspace} handleLetter={handleLetter}/>
    </div>
  );
};

export default Game;
