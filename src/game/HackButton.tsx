import React from "react";
import { ToastContainer } from "react-toastify";

interface HackbarProps {
  hackName: string;
  hackFunction: () => void;
  questionFunction: () => void;
  callbackMethod: (func: () => void) => void;
  image: string;
}

const HackButton: React.FC<HackbarProps> = ({
  hackName,
  hackFunction,
  questionFunction,
  callbackMethod,
  image,
}) => {
  const execute = () => {
    callbackMethod(hackFunction);
    questionFunction();
  };
  return (
    <div>
      <button
        className="rounded-3xl bg-neutral-500 text-white font-bold px-4 py-2 border-box mx-6 hover:bg-neutral-400"
        onClick={execute}
        key={hackName}
      >
        <img src="/assets/add_row.svg" alt={hackName}></img>
      </button>
      <ToastContainer />
    </div>
  );
};

export default HackButton;
