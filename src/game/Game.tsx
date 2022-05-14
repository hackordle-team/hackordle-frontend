import React, { useCallback, useState } from "react";
import Board from "./Board";
import { MockGameState } from "../const/const";
import Keyboard from "./Keyboard";
import Hackbar from "./Hackbar";

const Game: React.FC = () => {
  // const content = useContext(GameContendContext);
  // console.log(content);

  const [innerInput, setInnerInput] = useState<string>("");
  const [columns, setColumns] = useState(10);

  const handleBackspace = useCallback(() => {
    setInnerInput((prevState) => prevState.slice(0, -1));
  }, [setInnerInput]);

  const handleLetter = useCallback(
    (val: string) => {
      setInnerInput((prevState) =>
        prevState.length < columns ? prevState + val : prevState
      );
    },
    [setInnerInput, columns]
  );

  console.log(innerInput);

  return (
    <div className="w-full m-auto">
      <Board
        cols={columns}
        rows={8}
        gameState={MockGameState}
        innerState={innerInput}
      />
      <Hackbar
        hackNames={["HACK 1", "HACK 2", "HACK 3", "HACK 4"]}
        hackFunctions={[
          () => console.log("ADD ROW"),
          () => console.log("ADD COIL"),
          () => console.log("ADD COIL"),
          () => console.log("ADD COIL"),
        ]}
      />
      <Keyboard handleBackspace={handleBackspace} handleLetter={handleLetter} />
    </div>
  );
};

export default Game;
