export type ColorType = "GRAY" | "GREEN" | "YELLOW" | "BLANK" | "INNER";

export type GameElementType = {
  letter: string;
  color: ColorType;
};

export type GameRow = {
  length: number;
  elements: GameElementType[];
};

export type GameState = {
  rowsNumber: number;
  rows: GameRow[];
};

export type AnswerType = {
  content: string;
  correct: boolean;
};

export type QuestionType = {
  question: string;
  answers: AnswerType[];
};

export type GameContentType = {
  wordOfDay?: string;
  dictionary?: string[];
  questions?: QuestionType[];
};
