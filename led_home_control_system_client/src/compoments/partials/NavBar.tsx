import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="NavBar">
      <div>
        <h4 className="nav-header">LED Home Control System</h4>
      </div>
      <div className='nav-div'>
        <NavLink to="/displays" className="nav-item">
          Displays
        </NavLink>
        <NavLink to="/displays/new" className="nav-item">
          Add a Display
        </NavLink>
      </div>
    </header>
  );
};

export default NavBar;
