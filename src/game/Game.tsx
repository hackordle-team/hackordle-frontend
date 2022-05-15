import React, { useCallback, useContext, useEffect, useState } from "react";
import Board from "./Board";
import Keyboard from "./Keyboard";
import Hackbar from "./Hackbar";
import { ColorType, GameElementType, GameState } from "../const/types";
import { GameContendContext } from "../App";
import "react-toastify/dist/ReactToastify.css";
import Notification from "../components/Notification";
import { useNavigate } from "react-router-dom";
import Question from "../components/Question";
import { makeToast } from "../components/Toast";

const LOCALSTORAGE_GAMESTATE_KEY = "hackordle_game_state";
const DEFAULT_COLUMNS = 8;
const DEFAULT_ROWS = 6;

interface DailyGameState {
  gameState: GameState;
  date: string;
  rows: number;
  columns: number;
}

enum GameStatus {
  IN_PROGRESS,
  WON,
  LOST,
}

const Game: React.FC = () => {
  const content = useContext(GameContendContext);
  const navigate = useNavigate();
  const [innerInput, setInnerInput] = useState<string>("");
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [gameState, setGameState] = useState<GameState>({
    rowsNumber: 0,
    rows: [],
  });
  const [gameStatus, setGameStatus] = useState(GameStatus.IN_PROGRESS);
  const [enter, setEnter] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const defFunc = () => {
    console.log("init");
  };
  const [currentHack, setCurrentHack] = useState(() => defFunc);

  const handleHackMethod = useCallback((func: () => void) => {
    setCurrentHack(() => func);
  }, []);

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

  const handleDeleteColumn = useCallback(() => {
    if (content.wordOfDay && content.wordOfDay.length < columns) {
      setInnerInput((prevState) => prevState.slice(0, Math.min(columns-1, prevState.length)))
      setColumns((prevState) => prevState - 1);
      makeToast("Udało się usunąć kolumnę");
    } else makeToast("Osiągnięto najmniejszą liczbę kolumn");
  }, [columns, content.wordOfDay, innerInput]);

  const handleAddRow = useCallback(() => {
    setRows((prevState) => prevState + 1);
    makeToast("Dodano nową próbę");
  }, []);

  const handleGetWordLength = useCallback(() => {
    const wordLn = innerInput.length;
    if (content.wordOfDay) {
      if (wordLn > content.wordOfDay.length)
        makeToast("Twoje słowo jest dłuższe");
      else if (wordLn == content.wordOfDay.length)
        makeToast("Twoje słowo i słowo dnia są tej samej długości");
      else
        makeToast("Twoje słowo jest krótsze");
    }
  }, [innerInput, content.wordOfDay]);

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
        let color: ColorType = "MISSED";
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

  useEffect(() => {
    if (gameState.rowsNumber == 0) return;

    const lastRow = gameState.rows[gameState.rowsNumber - 1];
    const greenTailsCount = lastRow.elements.filter(
      (el) => el.color === "GREEN"
    ).length;

    if (
      greenTailsCount === lastRow.length &&
      lastRow.length === content.wordOfDay?.length
    ) {
      setGameStatus(GameStatus.WON);
      return;
    }

    if (rows === gameState.rowsNumber) {
      setGameStatus(GameStatus.LOST);
      return;
    }
  }, [gameState]);

  useEffect(() => {
    const retrievedGameState = localStorage.getItem(LOCALSTORAGE_GAMESTATE_KEY);
    console.log(`retrieve gameState ${retrievedGameState}`);
    if (retrievedGameState) {
      const dailyGameState: DailyGameState = JSON.parse(retrievedGameState);
      if (dailyGameState.date === new Date().toISOString().slice(0, 10)) {
        setGameState(dailyGameState.gameState);
        setRows(dailyGameState.rows);
        setColumns(dailyGameState.columns);
      }
    }
  }, []);

  useEffect(() => {
    if (
      gameState.rowsNumber > 0 ||
      rows > DEFAULT_ROWS ||
      columns < DEFAULT_COLUMNS
    ) {
      const dailyGameState: DailyGameState = {
        gameState: gameState,
        date: new Date().toISOString().slice(0, 10),
        rows: rows,
        columns: columns,
      };
      const gameStateString = JSON.stringify(dailyGameState);
      console.log(`save gameState`);
      localStorage.setItem(LOCALSTORAGE_GAMESTATE_KEY, gameStateString);
    }
  }, [gameState, rows, columns]);

  const handleEnter = () => {
    setEnter(true);
  };

  const handleGameFinish = () => {
    navigate("/");
  };

  const [notificationTitle, notificationMsg, notificationWordOfDay] = (() => {
    if (gameStatus == GameStatus.WON)
      return ["Wygrałeś", "Gratulacje! Udało ci się odgadnąć słowo.", content.wordOfDay];
    else if (gameStatus == GameStatus.LOST)
      return ["Przegrałeś", "Niestety nie udało si się odgadnąć słowa.", content.wordOfDay];
    else return ["", ""];
  })();

  return (
    <div className="w-full m-auto">
      <Notification
        title={notificationTitle}
        msg={notificationMsg}
        wordOfDay={notificationWordOfDay}
        open={gameStatus !== GameStatus.IN_PROGRESS}
        handleClose={handleGameFinish}
      >
        <button
          className={
            "rounded-3xl text-white px-4 py-2 border-box mx-6 w-full bg-neutral-400 hover:bg-neutral-300"
          }
          style={{ margin: "1vh" }}
          onClick={handleGameFinish}
        >
          MENU
        </button>
      </Notification>
      <Board
        cols={columns}
        rows={rows}
        gameState={gameState}
        innerState={innerInput}
      />
      <Hackbar
        hackNames={["HACK 1", "HACK 2", "HACK 3", "HACK 4"]}
        hackFunctions={[
          handleDeleteColumn,
          handleAddRow,
          handleGetWordLength,
          handleDeleteColumn,
        ]}
        questionFunction={() => setShowQuestion(true)}
        callbackMethod={handleHackMethod}
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
          onResult={
            (correctAnswer) => {
              setShowQuestion(false)
              if (correctAnswer)
                currentHack();
               else 
                setGameStatus(GameStatus.LOST);
            }
            
          }
        />
      )}
    </div>
  );
};

export default Game;
