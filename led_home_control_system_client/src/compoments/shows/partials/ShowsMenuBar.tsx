import React from "react";
import { NavLink } from "react-router-dom";


const ShowMenuBar = ()=>{
  return (
    <div className="ShowMenuBar nav-secondary">
        <NavLink to="/shows" className="nav-item">
          shows
        </NavLink>
        <NavLink to="/shows/new" className="nav-item">
        new Show
        </NavLink>
      </div>
  )
}

export default ShowMenuBar;