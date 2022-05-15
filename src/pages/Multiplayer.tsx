import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../components/Wrapper";
import Game from "../game/Game";
import BlurredBoard from "../game/BlurredBoard";
import { GameState } from "../const/types";

// const MULTI_SERVER_URL = "";

const Multiplayer: React.FC = () => {
  const webSocket = useRef<WebSocket>();

  const [opponentState, setOpponentState] = useState<GameState>({
    rowsNumber: 0,
    rows: [],
  });

  useEffect(() => {
    if (webSocket.current?.readyState == WebSocket.CONNECTING) return;
    //console.log("initializaing");
    webSocket.current = new WebSocket("ws://217.182.75.199:5000/multiplayer");

    webSocket.current.onmessage = (message) => {
      console.log("Message: ", message.data);
      const d = JSON.parse(message.data);

      // console.log(d);

      if (d?.status == "update") {
        // console.log("SETTING");
        // console.log(d);
        setOpponentState(d?.data);
      }
    };

    //return () => webSocket.current?.close();
  }, []);

  //console.log("message: ", messages);

  return (
    <Wrapper>
      <div className="flex w-full space-x-3">
        <div className="w-3/5">
          <Game isMulti={true}
            onUpdate={(n) => {
              const obj = {
                status: "update",
                data: n,
              };
              //console.log("on update");
              if (webSocket.current?.readyState === WebSocket.OPEN) {
                //console.log("sending");
                webSocket.current?.send(JSON.stringify(obj).toString());
              }
            }}
          />
        </div>
        <div className="w-2/5">
          <BlurredBoard cols={10} rows={8} gameState={opponentState} />
        </div>
      </div>
    </Wrapper>
  );
};

export default Multiplayer;
