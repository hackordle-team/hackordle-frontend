import React, { useMemo } from "react";
import { GameState } from "../const/types";
import BoardElement from "./BoardElement";

interface BoardProps {
  cols: number;
  rows: number;
  gameState: GameState;
}

const getGameRow = (cols: number, gameState: GameState, row: number) => {
  const letters =
    row < gameState.rowsNumber
      ? gameState.rows[row].elements.map((boardElement, i) => (
          <BoardElement
            key={i}
            letter={boardElement.letter}
            color={boardElement.color}
          />
        ))
      : [];

  const blanksNumber =
    row < gameState.rowsNumber && gameState.rows[row]?.length
      ? cols - gameState.rows[row].length
      : cols;

  const blanks = [...new Array(blanksNumber)].map((blank, key) => (
    <BoardElement key={key} color="BLANK" />
  ));
  return [...letters, ...blanks];
};

const getGameRows = (cols: number, gameState: GameState, rows: number) => {
  return [...new Array(rows)].map((row, i) => (
    <div key={`key-${i}`} className="m-auto flex space-x-3">
      {getGameRow(cols, gameState, i).map((el, id) => (
        <div key={id}>{el}</div>
      ))}
    </div>
  ));
};

const Board: React.FC<BoardProps> = ({ cols, rows, gameState }) => {
  const generatedRows = useMemo(
    () => getGameRows(cols, gameState, rows),
    [cols, gameState, rows]
  );

  return (
    <div className="flex flex-col space-y-3 justify-center">
      {generatedRows.map((el, id) => el)}
    </div>
  );
};

export default Board;
