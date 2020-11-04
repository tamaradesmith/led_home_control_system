import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import DisplayContext from "../partials/DisplayContext";

import { ShowQuery } from "../../js/request";

interface Show {
  name: string;
  id: number;
  type: string;
  display_id?: number;
  display_name?: string;
}

const ShowIndex = () => {
  const history = useHistory();
  const allDisplays = useContext(DisplayContext);

  const [shows, setShows] = useState([]);

  const getShows = async () => {
    const allShows = await ShowQuery.getAll();
    const displays = allDisplays.displays.concat(allDisplays.missingDisplays);
    allShows.forEach((show: Show) => {
      if (!show.display_id) {
        show.display_name = "general";
      } else {
        displays.forEach((display) => {
          if (`${display.id}` === `${show.display_id}`) {
            show.display_name = display.name;
          }
        });
      }
    });
    setShows(allShows);
  };

  const redirctToEdit = (id: number) => {
    history.push(`/shows/${id}`);
  };

  useEffect(() => {
    getShows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDisplays]);

  return (
    <div className="ShowIndex">
      <div className="card-show">
        <h2 className="card-header">Show index</h2>
        <div className="show-list">
          <h4 className="column_1 table-header">Name</h4>
          <h4 className="column_2 table-header">type</h4>
          <h4 className="column_3 table-header">display</h4>
        </div>
        {shows.map((show: Show) => (
          <div
            key={show.id}
            className="show-list"
            onClick={() => {
              redirctToEdit(show.id);
            }}
          >
            <p className="display-item toCapital">{show.name}</p>
            <p className="display-item"> {show.type}</p>
            <p className="display-item"> {show.display_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ShowIndex;
