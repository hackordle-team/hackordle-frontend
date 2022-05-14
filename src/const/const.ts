import { GameElementType, GameState } from "./types";

export const MockElement1: GameElementType = {
  letter: "a",
  color: "GRAY",
};

export const MockElement2: GameElementType = {
  letter: "b",
  color: "YELLOW",
};

export const MockElement3: GameElementType = {
  letter: "a",
  color: "GREEN",
};

export const MockGameState: GameState = {
  rowsNumber: 4,
  rows: [
    {
      length: 7,
      elements: [
        MockElement1,
        MockElement2,
        MockElement3,
        MockElement1,
        MockElement1,
        MockElement3,
        MockElement3,
      ],
    },
    {
      length: 5,
      elements: [
        MockElement1,
        MockElement2,
        MockElement2,
        MockElement1,
        MockElement3,
      ],
    },
    {
      length: 7,
      elements: [
        MockElement1,
        MockElement1,
        MockElement2,
        MockElement3,
        MockElement2,
        MockElement2,
        MockElement2,
      ],
    },
    {
      length: 4,
      elements: [MockElement1, MockElement2, MockElement1, MockElement3],
    },
  ],
};

export const LETTER_TOP = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
export const LETTER_MID = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
export const LETTER_BOTTOM = ["Z", "X", "C", "V", "B", "N", "M"];
