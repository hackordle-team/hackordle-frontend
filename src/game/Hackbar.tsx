import React from "react";
import { GameState } from "../const/types";
import HackButton from "./HackButton";

interface HackbarProps {
    hackNames: Array<string>;
    hackFunctions: Array<() => void>;
  }

const Hackbar: React.FC<HackbarProps> = ({hackNames, hackFunctions}) => {    
    return (
        <div className="flex justify-center px-4 py-4 w-full">
            {hackNames.map((item,index)=>{
                return <HackButton key={item} hackName={item} hackFunction={hackFunctions[index]}/>
            })}
        </div>
    )
};

export default Hackbar;

