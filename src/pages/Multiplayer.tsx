import React from "react";
import Wrapper from "../components/Wrapper";
import { Link, Outlet } from "react-router-dom";

const Multiplayer: React.FC = () => {
  return (
    <Wrapper>
      Multi player page
      <Link className="bg-blue-500 p-5 m-10" to={`/multi/345`}>
        Start match with id 345
      </Link>
      <Outlet />
    </Wrapper>
  );
};

export default Multiplayer;
