import React, { useCallback, useContext, useEffect, useState } from "react";
import Board from "./Board";
import Keyboard from "./Keyboard";
import Hackbar from "./Hackbar";
import { ColorType, GameElementType, GameState } from "../const/types";
import { GameContendContext } from "../App";
import Question from "../components/Question";

const Game: React.FC = () => {
  const content = useContext(GameContendContext);
  const [innerInput, setInnerInput] = useState<string>("");
  const [columns, setColumns] = useState(10);
  const [gameState, setGameState] = useState<GameState>({
    rowsNumber: 0,
    rows: [],
  });
  const [enter, setEnter] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);

  const handleBackspace = useCallback(() => {
    setInnerInput((prevState) => prevState.slice(0, -1));
  }, [setInnerInput]);

  const handleLetter = useCallback(
    (val: string) => {
      setInnerInput((prevState) =>
        prevState.length < columns ? prevState + val : prevState
      );
    },
    [columns]
  );

  useEffect(() => {
    if (!enter) {
      return;
    }
    if (!content.dictionary?.includes(innerInput.toLowerCase())) {
      setEnter(false);
      return;
    }
    const lettersColored: GameElementType[] = innerInput
      .split("")
      .map((letter, id) => {
        let color: ColorType = "GRAY";
        if (content.wordOfDay?.toUpperCase().includes(letter)) {
          color = "YELLOW";
        }
        if (content.wordOfDay?.[id]?.toUpperCase() === letter) {
          color = "GREEN";
        }
        return {
          color,
          letter,
        };
      });
    setGameState((prevState) => ({
      rowsNumber: prevState.rowsNumber + 1,
      rows: [
        ...prevState.rows,
        { elements: lettersColored, length: lettersColored.length },
      ],
    }));
    setEnter(false);
    setInnerInput("");
  }, [innerInput, gameState, enter, content]);

  const handleEnter = () => {
    setEnter(true);
    //console.log("Enter pressed");
  };

  return (
    <div className="w-full m-auto">
      <Board
        cols={columns}
        rows={8}
        gameState={gameState}
        innerState={innerInput}
      />
      <Hackbar
        hackNames={["HACK 1", "HACK 2", "HACK 3", "HACK 4"]}
        hackFunctions={[
          () => setShowQuestion(true),
          () => setShowQuestion(true),
          () => setShowQuestion(true),
          () => setShowQuestion(true),
        ]}
      />
      <Keyboard
        handleBackspace={handleBackspace}
        handleLetter={handleLetter}
        handleEnter={handleEnter}
        gameState={gameState}
      />
      {showQuestion && (
        <Question
          question={content.questions?.[0]}
          hackName={"hack"}
          onResult={() => setShowQuestion(false)}
        />
      )}
    </div>
  );
};

export default Game;
