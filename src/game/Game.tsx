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
import { LETTER } from "../const/const";

const LOCALSTORAGE_GAMESTATE_KEY = "hackordle_game_state";
const DEFAULT_COLUMNS = 10;
const DEFAULT_ROWS = 8;

enum GameStatus {
  IN_PROGRESS,
  WON,
  LOST,
}

interface DailyGameState {
  gameState: GameState;
  date: string;
  rows: number;
  columns: number,
  status: GameStatus;
}

interface GameProps {
  word: string,
  isMulti: boolean;
  onUpdate?: (val: GameState) => void;
  onWin?: () => void;
}

const Game: React.FC<GameProps> = ({word, isMulti, onUpdate, onWin }) => {
  const content = useContext(GameContendContext);
  const navigate = useNavigate();
  const [innerInput, setInnerInput] = useState<string>("");
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionSelected, setQuestionSelected] = useState(false);
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

  const [colors, setColors] = useState(
    Object.fromEntries(LETTER.map((key) => [key, "GRAY" as ColorType]))
  );

  useEffect(() => onUpdate?.(gameState), [gameState]);

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
    if (word && word.length < columns) {
      setInnerInput((prevState) =>
        prevState.slice(0, Math.min(columns - 1, prevState.length))
      );
      setColumns((prevState) => prevState - 1);
      makeToast("Uda??o si?? usun???? kolumn??");
    } else makeToast("Osi??gni??to najmniejsz?? liczb?? kolumn");
  }, [columns, word, innerInput]);

  const handleAddRow = useCallback(() => {
    setRows((prevState) => prevState + 1);
    makeToast("Dodano now?? pr??b??");
  }, []);

  const handleDeleteLetter = useCallback(() => {
    const innerColors = { ...colors };
    let count = 0;
    let deleted = undefined;
    LETTER.sort(() => 0.5 - Math.random()).map((el) => {
      if (
        count === 0 &&
        !word?.toUpperCase().includes(el) &&
        innerColors[el] === "GRAY"
      ) {
        count += 1;
        deleted = el;
        innerColors[el] = "MISSED";
      }
    });
    setColors(innerColors);
    if (count === 1) {
      makeToast(`Wykre??lono litere ${deleted}`);
    } else {
      makeToast("Brak litery do usuniecia");
    }
  }, [colors, setColors, word]);

  useEffect(() => {
    const innerColors = { ...colors };

    gameState.rows.map((row) => {
      row.elements.map((el) => {
        innerColors[el.letter] = el.color;
      });
    });
    setColors(innerColors);
    //console.log(colors);
  }, [gameState, setColors]);
  const handleGetWordLength = useCallback(() => {
    if (word && gameState.rowsNumber > 0) {
      const wordLn = gameState.rows[gameState.rowsNumber-1].length;
      if (wordLn > word.length)
        makeToast("Twoje s??owo jest d??u??sze");
      else if (wordLn == word.length)
        makeToast("Twoje s??owo i s??owo dnia s?? tej samej d??ugo??ci");
      else makeToast("Twoje s??owo jest kr??tsze");
    }
  }, [innerInput, word]);

  useEffect(() => {
    if (!enter) {
      return;
    }
    if (!content.dictionary?.includes(innerInput.toLowerCase())) {
      setEnter(false);
      makeToast("Has??a nie ma w s??owniku");
      return;
    }
    const lettersColored: GameElementType[] = innerInput
      .split("")
      .map((letter, id) => {
        let color: ColorType = "MISSED";
        if (word?.toUpperCase().includes(letter)) {
          color = "YELLOW";
        }
        if (word?.[id]?.toUpperCase() === letter) {
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
      lastRow.length === word?.length
    ) {
      setGameStatus(GameStatus.WON);
      onWin?.();
      return;
    }

    if (rows === gameState.rowsNumber) {
      setGameStatus(GameStatus.LOST);
      return;
    }
  }, [gameState]);

  useEffect(() => {
    if (isMulti) return;

    const retrievedGameState = localStorage.getItem(LOCALSTORAGE_GAMESTATE_KEY);
    console.log(`retrieve gameState ${retrievedGameState}`);
    if (retrievedGameState) {
      const dailyGameState: DailyGameState = JSON.parse(retrievedGameState);
      if (dailyGameState.date === new Date().toISOString().slice(0, 10)) {
        setGameState(dailyGameState.gameState);
        setRows(dailyGameState.rows);
        setColumns(dailyGameState.columns);
        setGameStatus(dailyGameState.status);
      }
    }
  }, []);

  useEffect(() => {
    if (isMulti) return;

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
        status: gameStatus
      };
      const gameStateString = JSON.stringify(dailyGameState);
      console.log(`save gameState`);
      localStorage.setItem(LOCALSTORAGE_GAMESTATE_KEY, gameStateString);
    }
  }, [gameState, rows, columns, gameStatus]);

  useEffect(() => {
    console.log(content.questions)
    if (showQuestion && content.questions){
      const max = content.questions.length;
      const min = 0;
      const val = Math.floor(Math.random() * (max - min)) + min;
      console.log(val);
      setCurrentQuestion(val);
      setQuestionSelected(true);
    }
  }, [showQuestion])

  const handleEnter = () => {
    setEnter(true);
  };

  const handleGameFinish = () => {
    navigate("/help");
  };

  const [notificationTitle, notificationMsg, notificationWordOfDay] = (() => {
    if (gameStatus == GameStatus.WON)
      return [
        "Wygra??e??",
        "Gratulacje! Uda??o ci si?? odgadn???? s??owo.",
        word,
      ];
    else if (gameStatus == GameStatus.LOST)
      return [
        "Przegra??e??",
        "Niestety nie uda??o si si?? odgadn???? s??owa.",
        word,
      ];
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
        hackNames={["REMOVE_COL", "ADD_ROW", "CHECK_LENGTH", "REMOVE_LETTER"]}
        hackFunctions={[
          handleDeleteColumn,
          handleAddRow,
          handleGetWordLength,
          handleDeleteLetter,
        ]}
        questionFunction={() => setShowQuestion(true)}
        callbackMethod={handleHackMethod}
        images={[
          "remove_col.png",
          "add_row.png",
          "check_length.png",
          "remove_letter.png",
        ]}
      />
      <Keyboard
        handleBackspace={handleBackspace}
        handleLetter={handleLetter}
        handleEnter={handleEnter}
        colors={colors}
      />

      {showQuestion && questionSelected && (
        <Question
          question={content.questions?.at(currentQuestion)}
          hackName={"hack"}
          onResult={(correctAnswer) => {
            setQuestionSelected(false);
            setShowQuestion(false);
            if (correctAnswer) currentHack();
            else setGameStatus(GameStatus.LOST);
          }}
        />
      )}
    </div>
  );
};

export default Game;
