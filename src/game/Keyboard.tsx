import React from "react";

interface KeyProps {
  value: string;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  color: string;
  hover: string;
}
const Key: React.FC<KeyProps> = ({ value, handleClick, color, hover }) => {
  return (
    <button
      className={`${color} hover:${hover} m-0.5 text-white font-bold py-2 px-4 rounded-full`}
      onClick={handleClick}
      value={value}
    >
      {value}
    </button>
  );
};

const Keyboard: React.FC = () => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget.value);
  };

  // todo get colors for each char
  return (
    <div>
      <div className="flex justify-center mb-1">
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((char) => (
          <Key
            color={"bg-green-500"}
            hover={"bg-green-700"}
            key={char}
            handleClick={handleClick}
            value={char}
          />
        ))}
      </div>
      <div className="flex justify-center mb-1">
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((char) => (
          <Key
            color={"bg-neutral-500"}
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
        {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((char) => (
          <Key
            color={"bg-yellow-500"}
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
