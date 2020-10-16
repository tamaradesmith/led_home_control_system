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
      <div>
        {displays.map((display: Display) => (
          <div key={display.id} className="display-list">
            <p> {display.name}</p>
            <p> {display.led_number}</p>
          </div>
        ))}
      </div>

      <h2>Unavailable LED Display</h2>
      <p>
        {" "}
        Hudson <small>Search</small>
      </p>
    </main>
  );
};

export default DisplayIndex;
