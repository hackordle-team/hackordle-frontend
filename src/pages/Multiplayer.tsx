import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../components/Wrapper";
import Game from "../game/Game";
import BlurredBoard from "../game/BlurredBoard";
import { GameState } from "../const/types";
import Notification from "../components/Notification";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

// const MULTI_SERVER_URL = "";

const Multiplayer: React.FC<{
  onWordChange: (word: string) => void;
}> = ({ onWordChange }) => {
  const webSocket = useRef<WebSocket>();
  const [waiting, setWaiting] = useState(true);
  const [lost, setLost] = useState(false);
  const [word, setWord] = useState("");

  const [opponentState, setOpponentState] = useState<GameState>({
    rowsNumber: 0,
    rows: [],
  });

  useEffect(() => {
    if (webSocket.current?.readyState == WebSocket.CONNECTING) return;
    //console.log("initializaing");
    webSocket.current = new WebSocket("wss://wolk-arkadiusz.xyz/multiplayer");

    webSocket.current.onmessage = (message) => {
      console.log("Message: ", message.data);
      const d = JSON.parse(message.data);

      console.log(d);

      if (d?.type == "start") {
        setWaiting(false);
        onWordChange(d?.word);
        setWord(d?.word);
      }
      if (d?.status == "win") {
        setLost(true);
      }

      if (d?.status == "update") {
        // console.log("SETTING");
        // console.log(d);
        setOpponentState(d?.data);
      }
    };

    //return () => webSocket.current?.close();
  }, []);

  //console.log("message: ", messages);
  const [notificationTitle, notificationMsg, notificationWordOfDay] = (() => {
    if (lost)
      return ["Przegrałeś", "Niestety nie udało si się odgadnąć słowa.", word];
    else return ["", "", ""];
  })();

  const navigate = useNavigate();
  const handleGameFinish = () => {
    navigate("/");
  };

  return (
    <>
      {waiting && (
        <Wrapper>
          <div className="justify-center items-center w-full flex h-full overflow-hide flex-col">
            <ReactLoading
              type={"bars"}
              color={"white"}
              height={100}
              width={100}
            />
            <p className="text-lg text-white">Waiting for a player...</p>
          </div>
        </Wrapper>
      )}
      {!waiting && (
        <Wrapper>
          <div className="flex w-full space-x-3">
            <Notification
              title={notificationTitle}
              msg={notificationMsg}
              wordOfDay={notificationWordOfDay}
              open={lost}
              handleClose={handleGameFinish}
            >
              <button
                className={
                  "rounded-3xl text-white px-4 py-2 border-box mx-6 w-full bg-neutral-400 hover:bg-neutral-300"
                }
                style={{ margin: "1vh" }}
                onClick={handleGameFinish}
              >
                MENU
              </button>
            </Notification>

            <div className="w-3/5">
              <Game
                word={word}
                isMulti={true}
                onWin={() => {
                  const obj = {
                    status: "win",
                  };
                  //console.log("on update");
                  if (webSocket.current?.readyState === WebSocket.OPEN) {
                    console.log("sending");
                    webSocket.current?.send(JSON.stringify(obj).toString());
                  }
                }}
                onUpdate={(n) => {
                  const obj = {
                    status: "update",
                    data: n,
                  };
                  //console.log("on update");
                  if (webSocket.current?.readyState === WebSocket.OPEN) {
                    console.log("sending");
                    webSocket.current?.send(JSON.stringify(obj).toString());
                  }
                }}
              />
            </div>
            {!waiting && (
              <div className="w-2/5">
                <BlurredBoard cols={10} rows={10} gameState={opponentState} />
              </div>
            )}
          </div>
        </Wrapper>
      )}
    </>
  );
};

export default Multiplayer;
