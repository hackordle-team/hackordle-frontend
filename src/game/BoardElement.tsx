import React from "react";
import { ColorType } from "../const/types";
import clsx from "clsx";

interface BoardElementProps {
  letter?: string;
  color: ColorType;
}

const BoardElement: React.FC<BoardElementProps> = ({ color, letter }) => {
  if (color === "BLANK") {
    return <div className="border-4 border-white w-12 h-12 rounded-full " />;
  }
  if (color === "INNER") {
    return (
      <div className="border-4 border-white w-12 h-12 rounded-full font-bold text-white text-3xl text-center flex items-center justify-center">
        {letter}
      </div>
    );
  }
  return (
    <div
      className={clsx(
        "w-12 h-12 rounded-full text-center flex items-center justify-center font-bold text-white text-3xl",
        color == "GRAY" && "bg-gray-500",
        color == "GREEN" && "bg-green-600",
        color == "YELLOW" && "bg-yellow-500",
        color == "MISSED" && "bg-gray-700"
      )}
    >
      {letter?.toUpperCase()}
    </div>
  );
};

export default BoardElement;
