import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../components/Wrapper";
import Game from "../game/Game";
import BlurredBoard from "../game/BlurredBoard";
import { MockGameState } from "../const/const";

// const MULTI_SERVER_URL = "";

const Multiplayer: React.FC = () => {
  const webSocket = useRef<WebSocket>();
  const [messages, setMessages] = useState<string[]>([]);

  // const [opponentState, setOpponentState] = useState<GameState>({
  //   rowsNumber: 0,
  //   rows: [],
  // });

  useEffect(() => {
    webSocket.current = new WebSocket("ws://url");

    webSocket.current.onmessage = (message) => {
      setMessages((prev) => [...prev, message.data]);
    };

    return () => webSocket.current?.close();
  }, []);

  console.log(messages);

  return (
    <Wrapper>
      {/*<Link className="bg-blue-500 p-5 m-10" to={`/multi/345`}>*/}
      {/*  Start match with id 345*/}
      {/*</Link>*/}
      {/*<Outlet />*/}
      <div className="flex w-full space-x-3">
        <div className="w-3/5">
          <Game />
        </div>
        <div className="w-2/5">
          <BlurredBoard cols={10} rows={8} gameState={MockGameState} />
        </div>
      </div>
    </Wrapper>
  );
};

export default Multiplayer;
