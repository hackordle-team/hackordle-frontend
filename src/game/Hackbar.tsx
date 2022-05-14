import React from "react";
import HackButton from "./HackButton";

interface HackbarProps {
    hackNames: Array<string>;
    hackFunctions: Array<() => void>;
  }

const Hackbar: React.FC<HackbarProps> = ({hackNames, hackFunctions}) => {    
    return (
        <div className="flex justify-center bg-gray-900 px-8 py-5 w-full">
            {hackNames.map((item,index)=>{
                return <HackButton key={item} hackName={item} hackFunction={hackFunctions[index]}/>
            })}
        </div>
    )
};

export default Hackbar;

