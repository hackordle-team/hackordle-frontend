import React, {useContext} from "react";
import Wrapper from "../components/Wrapper";
import Game from "../game/Game";
import {GameContendContext} from "../App";

const Singleplayer: React.FC = () => {
  const content = useContext(GameContendContext);

  if(!content.wordOfDay)
    return <div></div>

  return (
    <Wrapper center>
      <div className="w-full flex justify-center">
        <div className="max-w-min">
          <Game isMulti={false} word={content.wordOfDay}/>
        </div>
      </div>
    </Wrapper>
  );
};

export default Singleplayer;
