import React from "react";

interface HackbarProps {
    hackName: string;
    hackFunction: () => void;
  }


const HackButton: React.FC<HackbarProps> = ({hackName, hackFunction}) => {    
    return (
        <button className="rounded-3xl bg-neutral-500 text-black font-bold p-4 border-box mx-6 hover:bg-neutral-400"
                onClick={hackFunction} key={hackName}>{hackName}</button>
    )
};

export default HackButton;
