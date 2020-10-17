import React, { useEffect, useState } from "react";
import "../styles/styles.css";

import { DisplayQuery } from "../js/request";

interface Display {
  name: string;
  ipaddress: string;
  led_number: number;
  id: number;
}

const DisplayIndex = () => {
  const [displays, setDisplays] = useState([]);

  const getAllDisplays = async () => {
    try {
      const allDisplays = await DisplayQuery.getAll();
      console.log("getAllDisplays -> allDisplays", allDisplays);
      setDisplays(allDisplays);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllDisplays();
  }, []);
  return (
    <main className="DisplayIndex">
      <h2> Available LED Displays </h2>
      <button>All OFF</button>
      <button>All On</button>
      <div>
        <div className="display-list">
          <h4>Name</h4>
          <h4>Current Show</h4>
          <h4>On/Off</h4>
        </div>
        {displays.map((display: Display) => (
          <div key={display.id} className="display-list">
            <p className="display-item"> {display.name}</p>
            <p className="display-item"> Hudson</p>
            <p className="display-item"> off</p>
          </div>
        ))}
      </div>

      <h2>Unavailable LED Display</h2>
      <button>search All</button>
      <div className="display-list">
        <h4>Name</h4>
        <h4>ipaddress</h4>
        <h4>search</h4>
      </div>
      <div className="display-list">
        <p>Hudson</p>
        <p>192.168.0.231</p>
        <p>Search</p>
      </div>
    </main>
  );
};

export default DisplayIndex;
