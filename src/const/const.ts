import { GameElementType, GameState } from "./types";
import BoardElement from "../game/BoardElement";

export const MockElement1: GameElementType = {
  letter: "a",
  color: "GRAY"
};

export const MockElement2: GameElementType = {
  letter: "b",
  color: "YELLOW"
};

export const MockElement3: GameElementType = {
  letter: "a",
  color: "GREEN"
};

export const MockGameState: GameState = {
  rowsNumber: 4,
  rows: [
    {
      length: 7,
      elements: [MockElement1, MockElement2, MockElement3, MockElement1, MockElement1, MockElement3, MockElement3]
    },
    {
      length: 5,
      elements: [MockElement1, MockElement2, MockElement2, MockElement1, MockElement3]
    },
    {
      length: 7,
      elements: [MockElement1, MockElement1, MockElement2, MockElement3, MockElement2, MockElement2, MockElement2]
    },
    {
      length: 4,
      elements: [MockElement1, MockElement2, MockElement1, MockElement3]
    }, 
  ]
};
