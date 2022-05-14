import React, { useCallback, useContext, useEffect, useState } from "react";
import Board from "./Board";
import Keyboard from "./Keyboard";
import Hackbar from "./Hackbar";
import { ColorType, GameElementType, GameState } from "../const/types";
import { GameContendContext } from "../App";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Game: React.FC = () => {

  function makeToansify(message: string) {
    toast.info(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      });
  }

  const content = useContext(GameContendContext);

  const [innerInput, setInnerInput] = useState<string>("");
  const [columns, setColumns] = useState(8);
  const [rows, setRows] = useState(6);
  const [gameState, setGameState] = useState<GameState>({
    rowsNumber: 0,
    rows: [],
  });
  const [enter, setEnter] = useState(false);

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
  
  const handleDeleteColumn = useCallback(
    () => {
      if (content.wordOfDay && content.wordOfDay.length < columns) {
        setColumns((prevState) => prevState - 1)
        makeToansify("Udało się usunąć kolumnę")
      } else
        makeToansify("Osiągnięto najmniejszą liczbę kolumn")
    },
    [columns]
  )

  const handleAddRow = useCallback(
    () => {
      setRows((prevState) => ( prevState + 1
      ));
      makeToansify("Dodano nową próbę")
    },
    []
  )

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
    console.log("Enter pressed");
  };

  return (
    <div className="w-full m-auto">
      <Board
        cols={columns}
        rows={rows}
        gameState={gameState}
        innerState={innerInput}
      />
      <Hackbar hackNames={["HACK 1", "HACK 2"]}
               hackFunctions={[handleDeleteColumn, handleAddRow]}/>
      <Keyboard
        handleBackspace={handleBackspace}
        handleLetter={handleLetter}
        handleEnter={handleEnter}
      />
      <ToastContainer />

    </div>
  );
};

export default Game;
