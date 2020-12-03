import React from "react";
import { NavLink } from "react-router-dom";


const DisplayMenuBar = () => {

  return (
    <div className="DisplayMenuBar nav-secondary">
      <NavLink to="/displays" className="nav-item">
        Displays
        </NavLink>
      <NavLink
        to="/displays/new"
        className="nav-item">
        Add a Display
        </NavLink>
    </div>
  );
};

export default DisplayMenuBar;