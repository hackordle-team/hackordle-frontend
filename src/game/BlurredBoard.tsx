import React, { useMemo } from "react";
import { ColorType, GameState } from "../const/types";

interface BlurredBoardProps {
  cols: number;
  rows: number;
  gameState: GameState;
}

interface ProgressBarProps {
  green: number;
  yellow: number;
  gray: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ green, yellow, gray }) => {
  return (
    <div className="w-full rounded-lg h-12 border-4 border-white rounded-full flex space-x-1 p-1">
      <div
        className="bg-green-600 rounded-full"
        style={{
          height: "100%",
          width: `${green}%`,
          textAlign: "right",
        }}
      />
      <div
        className="bg-yellow-500 rounded-full"
        style={{
          height: "100%",
          width: `${yellow}%`,
          textAlign: "right",
        }}
      />
      <div
        className="bg-gray-500 rounded-full"
        style={{
          height: "100%",
          width: `${gray}%`,
          textAlign: "right",
        }}
      />
    </div>
  );
};

const getGameRow = (cols: number, gameState: GameState, row: number) => {
  type LettersCountObj = {
    [index in ColorType]: number;
  };

  if (row < gameState.rowsNumber) {
    const letters = gameState.rows?.[row].elements.map(
      (element) => element.color
    );

    const counted = letters.reduce((res, letter) => {
      res[letter] += 1;
      return res;
    }, Object.fromEntries(letters.map((letter) => [letter, 0])) as LettersCountObj);

    const sum = letters.length;

    return (
      <ProgressBar
        green={(counted.GREEN * 100) / sum}
        yellow={(counted.YELLOW * 100) / sum}
        gray={(counted.GRAY * 100) / sum}
      />
    );
  }

  return <ProgressBar green={0} yellow={0} gray={0} />;
};

const getGameRows = (cols: number, gameState: GameState, rows: number) => {
  return [...new Array(rows)].map((row, i) => (
    <div key={`key-${i}`} className="m-auto flex space-x-2 w-full">
      <div className="w-full">{getGameRow(cols, gameState, i)}</div>)
    </div>
  ));
};

const BlurredBoard: React.FC<BlurredBoardProps> = ({
  cols,
  rows,
  gameState,
}) => {
  const generatedRows = useMemo(
    () => getGameRows(cols, gameState, rows),
    [cols, gameState, rows]
  );

  return (
    <div className="flex flex-col space-y-2 justify-center w-full">
      {generatedRows.map((el, id) => el)}
    </div>
  );
};

export default BlurredBoard;
