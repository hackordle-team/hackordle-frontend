import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import { GameState } from "../const/types";

interface HackbarProps {
    hackName: string;
    hackFunction: () => void;
    questionFunction: () => void;
    callbackMethod: (func: () => void) => void;
  }

const HackButton: React.FC<HackbarProps> = ({hackName, hackFunction, questionFunction, callbackMethod}) => {   
    const execute = () => {
      callbackMethod(hackFunction);
      questionFunction()
    } 
    return (
      <div>
        <button className="rounded-3xl bg-neutral-500 text-white font-bold px-4 py-2 border-box mx-6 hover:bg-neutral-400"
                onClick={execute} key={hackName}>{hackName}</button>
        <ToastContainer />
      </div>
    )
};

export default HackButton;
