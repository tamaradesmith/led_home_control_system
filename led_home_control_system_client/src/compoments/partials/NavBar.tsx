import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ColourMenuBar from "../colours/partials/ColourMenuBar";

const NavBar = () => {
  const [colourMenu, setColourMenu] = useState(false);

  const handleColour = () => {
    setColourMenu(colourMenu ? false : true);
  };

  return (
    <header className="NavBar">
      <div>
        <h4 className="nav-header">LED Home Control System</h4>
      </div>
      <div className="nav-div">
        <NavLink to="/displays" className="nav-item">
          Displays
        </NavLink>
        <NavLink to="/displays/new" className="nav-item">
          Add a Display
        </NavLink>
        <NavLink
          to={!colourMenu ? "/colours" : "/displays"}
          className="nav-item"
          onClick={handleColour}
        >
          colours
        </NavLink>
      </div>
      <div className={colourMenu ? "" : "hidden"}>
        <ColourMenuBar />
      </div>
    </header>
  );
};

export default NavBar;
