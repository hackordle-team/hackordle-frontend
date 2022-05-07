import React from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../components/Wrapper";

const MultiplayerGame: React.FC = () => {
  const params = useParams();

  return <Wrapper>game id: {params.gameId}</Wrapper>;
};

export default MultiplayerGame;
