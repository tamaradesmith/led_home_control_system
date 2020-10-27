import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

import ColourMenuBar from "../colours/partials/ColourMenuBar";

const NavBar = () => {
  const history = useHistory();

  const [colourMenu, setColourMenu] = useState(false);

  const handleColour = () => {
    setColourMenu(colourMenu ? false : true);
  };

  const handleDisplay = () => {
    setColourMenu(false);
  };

  useEffect(() => {
    if (history.location.pathname.includes("colour")) {
      setColourMenu(true);
    } else {
      setColourMenu(false);
    }
  }, [history.location.pathname]);

  return (
    <header className="NavBar">
      <div>
        <h4 className="nav-header">LED Home Control System</h4>
      </div>
      <div className="nav-div">
        <NavLink to="/displays" onClick={handleDisplay} className="nav-item">
          Displays
        </NavLink>
        <NavLink
          to="/displays/new"
          onClick={handleDisplay}
          className="nav-item"
        >
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
