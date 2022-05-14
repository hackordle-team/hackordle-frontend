import React, { useMemo } from "react";
import { GameState } from "../const/types";
import BoardElement from "./BoardElement";

interface BoardProps {
  rows: number;
  gameState: GameState;
}

const getGameRow = (gameState: GameState, row: number) => {
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
      ? gameState.cellNumber - gameState.rows[row].length
      : gameState.cellNumber;

  const blanks = [...new Array(blanksNumber)].map((blank, key) => (
    <BoardElement key={key} color="BLANK" />
  ));
  return [...letters, ...blanks];
};

const getGameRows = (gameState: GameState, rows: number) => {
  return [...new Array(rows)].map((row, i) => (
    <div key={`key-${i}`} className="m-auto flex space-x-3">
      {getGameRow(gameState, i).map((el, id) => (
        <div key={id}>{el}</div>
      ))}
    </div>
  ));
};

const Board: React.FC<BoardProps> = ({ rows, gameState }) => {
  const generatedRows = useMemo(
    () => getGameRows(gameState, rows),
    [gameState, rows]
  );

  return (
    <div className="flex flex-col space-y-3 justify-center">
      {generatedRows.map((el, id) => el)}
    </div>
  );
};

export default Board;
