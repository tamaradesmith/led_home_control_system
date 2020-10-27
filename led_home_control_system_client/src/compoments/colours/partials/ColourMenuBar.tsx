import React from "react";
import { NavLink } from "react-router-dom";


const ColourMenuBar = ()=>{
  return (
    <div className="ColourMenuBar nav-secondary">
        <NavLink to="/colours" className="nav-item">
          colours
        </NavLink>
        <NavLink to="/colours/new" className="nav-item">
        new colours
        </NavLink>
      </div>
  )
}

export default ColourMenuBar;