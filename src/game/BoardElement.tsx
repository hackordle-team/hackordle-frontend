import React from "react";
import { ColorType } from "../const/types";
import clsx from "clsx";

interface BoardElementProps {
  letter?: string;
  color: ColorType;
}

const BoardElement: React.FC<BoardElementProps> = ({ color, letter }) => {
  if (color === "BLANK") {
    return (
      <div className="border-2 border-white bg-black w-12 h-12 rounded-full " />
    );
  }
  return (
    <div
      className={clsx(
        "w-12 h-12 rounded-full text-center flex items-center justify-center font-semibold",
        color == "GRAY" && "bg-gray-500",
        color == "GREEN" && "bg-green-500",
        color == "YELLOW" && "bg-yellow-500"
      )}
    >
      {letter?.toUpperCase()}
    </div>
  );
};

export default BoardElement;
