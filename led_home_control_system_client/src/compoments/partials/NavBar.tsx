import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

import ColourMenuBar from "../colours/partials/ColourMenuBar";
import DisplayMenuBar from "../display/partials/DisplayMenuBar";
import ShowMenuBar from "../shows/partials/ShowsMenuBar";

const NavBar = () => {
  const history = useHistory();

  const [colourMenu, setColourMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);

  const handleColour = () => {
    setColourMenu(true);
  };

  const handleShow = () => {
    setShowMenu(true);
  };

  const handleDisplay = () => {
    setColourMenu(false);
    setShowMenu(false);
    setDisplayMenu(true);

  };

  useEffect(() => {
    if (history.location.pathname.includes("colour")) {
      setColourMenu(true);
      setShowMenu(false);
      setDisplayMenu(false);
    } else if (history.location.pathname.includes("show")) {
      setShowMenu(true);
      setColourMenu(false);
      setDisplayMenu(false);
    } else {
      setDisplayMenu(true);
      setShowMenu(false);
      setColourMenu(false);
    }
  }, [history.location.pathname]);

  return (
    <header className="NavBar">
      <div>
        <h4 className="nav-header">LED Home Control System</h4>
      </div>
      <div className="nav-div">

        <NavLink to={"/displays"}
          className="nav-item"
          onClick={handleDisplay}>
          Displays
        </NavLink>

        <NavLink
          to={"/colours"}
          className="nav-item"
          onClick={handleColour}
        >
          colours
        </NavLink>

        <NavLink
          to={"/shows"}
          className="nav-item"
          onClick={handleShow}
        >
          shows
        </NavLink>
      </div>

      <div className={displayMenu ? "" : "hidden"}>
        <DisplayMenuBar />
      </div>

      <div className={colourMenu ? "" : "hidden"}>
        <ColourMenuBar />
      </div>

      <div className={showMenu ? "" : "hidden"}>
        <ShowMenuBar />
      </div>

    </header>
  );
};

export default NavBar;
