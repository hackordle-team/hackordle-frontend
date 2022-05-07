import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white px-8 py-5 w-full">
      <Link to="/">Hackordle</Link>
      <div className="flex gap-x-10 mr-6">
        <Link to="/single">Singleplayer</Link>
        <Link to="/multi">Mutliplayer</Link>
        <Link to="/help">Help</Link>
      </div>
    </nav>
  );
};

export default Navbar;
