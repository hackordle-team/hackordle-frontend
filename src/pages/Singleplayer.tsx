import React from "react";
import Wrapper from "../components/Wrapper";
import Game from "../game/Game";

const Singleplayer: React.FC = () => {
  return (
    <Wrapper center>
      <div className="w-full flex justify-center">
        <div className="max-w-min">
          <Game isMulti={false}/>
        </div>
      </div>
    </Wrapper>
  );
};

export default Singleplayer;
