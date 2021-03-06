import React, { useCallback, useEffect } from "react";
import { ColorType } from "../const/types";
import { LETTER_BOTTOM, LETTER_MID, LETTER_TOP } from "../const/const";

interface KeyProps {
  value: string;
  handleClick: (val: string) => void;
  color: string;
  hover: string;
}

const Key: React.FC<KeyProps> = ({ value, handleClick, color, hover }) => {
  return (
    <button
      className={`${color} hover:${hover} m-0.5 text-white font-bold py-2 px-4 rounded-full`}
      onClick={(e) => {
        e.currentTarget.blur();
        handleClick(value);
      }}
      value={value}
    >
      {value}
    </button>
  );
};

interface KeyboardProps {
  handleEnter: () => void;
  handleBackspace: () => void;
  handleLetter: (val: string) => void;
  colors: { [k: string]: ColorType };
}

const Keyboard: React.FC<KeyboardProps> = ({
  handleBackspace,
  handleLetter,
  handleEnter,
  colors,
}) => {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleEnter();
      } else if (event.key === "Backspace") {
        handleBackspace();
      } else if (
        event.key.length === 1 &&
        (event.key.match(/[a-z]/i) || event.key.match(/[A-Z]/i))
      ) {
        handleLetter(event.key.toUpperCase());
      }
    };
    window.addEventListener("keydown", listener);

    return () => window.removeEventListener("keydown", listener);
  }, [handleLetter]);

  const handleClick = (val: string) => {
    if (val === "DELETE") {
      handleBackspace();
    } else if (val === "ENTER") {
      handleEnter();
    } else if (
      val.length === 1 &&
      (val.match(/[a-z]/i) || val.match(/[A-Z]/i))
    ) {
      handleLetter(val);
    }
  };

  // // todo get colors for each char
  // const letter = [...LETTER_TOP, ...LETTER_MID, ...LETTER_BOTTOM];

  // const [colors, setColors] = useState(
  //   Object.fromEntries(letter.map((key) => [key, "GRAY" as ColorType]))
  // );

  // useEffect(() => {
  //   const innerColors = { ...colors };

  //   gameState.rows.map((row) => {
  //     row.elements.map((el) => {
  //       innerColors[el.letter] = el.color;
  //     });
  //   });
  //   setColors(innerColors);
  // }, [gameState, setColors]);

  const getColor = useCallback(
    (col: ColorType) => {
      if (col === "GREEN") return "bg-green-500";
      if (col === "YELLOW") return "bg-yellow-500";
      if (col === "GRAY") return "bg-gray-500";
      if (col == "MISSED") return "bg-gray-700";
    },
    [colors]
  );

  return (
    <div>
      <div className="flex justify-center mb-1">
        {LETTER_TOP.map((char) => (
          <Key
            color={getColor(colors[char]) ?? ""}
            hover={"bg-green-700"}
            key={char}
            handleClick={handleClick}
            value={char}
          />
        ))}
      </div>
      <div className="flex justify-center mb-1">
        {LETTER_MID.map((char) => (
          <Key
            color={getColor(colors[char]) ?? ""}
            hover={"bg-neutral-700"}
            key={char}
            handleClick={handleClick}
            value={char}
          />
        ))}
      </div>
      <div className="flex justify-center mb-1">
        <Key
          color={"bg-neutral-500"}
          hover={"bg-neutral-700"}
          value="ENTER"
          handleClick={handleClick}
        />
        {LETTER_BOTTOM.map((char) => (
          <Key
            color={getColor(colors[char]) ?? ""}
            hover={"bg-yellow-700"}
            key={char}
            handleClick={handleClick}
            value={char}
          />
        ))}
        <Key
          color={"bg-neutral-500"}
          hover={"bg-neutral-700"}
          value="DELETE"
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

export default Keyboard;
