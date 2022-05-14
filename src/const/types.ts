
export type ColorType = "GRAY" | "GREEN" | "YELLOW" | "BLANK";



export type GameElementType = {
  letter: string;
  color: ColorType;
}

export type GameRow = {
  length: number;
  elements: GameElementType[];
}


export type GameState = {
  rowsNumber: number;
  rows: GameRow[];
}
