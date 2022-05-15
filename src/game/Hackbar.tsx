import React from "react";
import HackButton from "./HackButton";

interface HackbarProps {
  hackNames: Array<string>;
  hackFunctions: Array<() => void>;
  questionFunction: () => void;
  callbackMethod: (func: () => void) => void;
}

const Hackbar: React.FC<HackbarProps> = ({
  hackNames,
  hackFunctions,
  questionFunction,
  callbackMethod,
}) => {
  return (
    <div className="flex justify-center px-4 py-4 w-full">
      {hackNames.map((item, index) => {
        return (
          <HackButton
            key={item}
            hackName={item}
            hackFunction={hackFunctions[index]}
            questionFunction={questionFunction}
            callbackMethod={callbackMethod}
          />
        );
      })}
    </div>
  );
};

export default Hackbar;
