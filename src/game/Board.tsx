import React, { useMemo } from "react";
import { GameState } from "../const/types";
import BoardElement from "./BoardElement";

interface BoardProps {
  cols: number;
  rows: number;
  gameState: GameState;
  innerState: string;
}

const getGameRow = (
  cols: number,
  gameState: GameState,
  row: number,
  innerState: string
) => {
  let letters: JSX.Element[] = [];
  let blanksNumber: number = cols;

  if (row < gameState.rowsNumber) {
    letters = gameState.rows?.[row].elements.map((boardElement, i) => (
      <BoardElement
        key={i}
        letter={boardElement.letter}
        color={boardElement.color}
      />
    ));
    blanksNumber = cols - gameState.rows?.[row]?.length;
  } else if (row == gameState.rowsNumber) {
    letters = innerState
      ?.split("")
      .map((e, i) => <BoardElement key={i} letter={e} color="INNER" />);
    blanksNumber = cols - (innerState?.length ?? 0);
  }

  const blanks = [...new Array(blanksNumber)].map((blank, key) => (
    <BoardElement key={key} color="BLANK" />
  ));
  return [...letters, ...blanks];
};

const getGameRows = (
  cols: number,
  gameState: GameState,
  rows: number,
  innerState: string
) => {
  return [...new Array(rows)].map((row, i) => (
    <div key={`key-${i}`} className="m-auto flex space-x-3">
      {getGameRow(cols, gameState, i, innerState).map((el, id) => (
        <div key={id}>{el}</div>
      ))}
    </div>
  ));
};

const Board: React.FC<BoardProps> = ({ cols, rows, gameState, innerState }) => {
  const generatedRows = useMemo(
    () => getGameRows(cols, gameState, rows, innerState),
    [cols, gameState, rows, innerState]
  );

  return (
    <div className="flex flex-col space-y-3 justify-center">
      {generatedRows.map((el, id) => el)}
    </div>
  );
};

export default Board;
