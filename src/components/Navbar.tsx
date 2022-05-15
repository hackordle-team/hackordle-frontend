import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center bg-black text-white px-8 py-5 w-full">
      <Link to="/">Hackordle</Link>
      <div className="flex gap-x-10 mr-6">
        <Link className="text-white font-bold" to="/">Singleplayer</Link>
        <Link className="text-white font-bold" to="/multi">Mutliplayer</Link>
        <Link className="text-white font-bold" to="/help">Help</Link>
      </div>
    </nav>
  );
};

export default Navbar;
