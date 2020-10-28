import React from "react";
import { useHistory } from "react-router-dom";

import { DisplayQuery } from "../../js/request";

interface Display {
  name: string;
  ipaddress: string;
  led_number: number;
  id?: number;
}

interface Props {
  displays: Display[];
  missingDisplays: Display[];
  update: Function;
  updateAll: Function;
}

const DisplayIndex = (props: Props) => {
  const { missingDisplays, displays, update, updateAll } = props;
  const history = useHistory();

  const redirctToShow = (id: number) => {
    history.push(`/displays/${id}`);
  };

  const searchDisplay = async (id: number) => {
    const result = await DisplayQuery.search(id);
    if (result.error) {
      document.querySelector(`#error-${id}`)?.classList.remove("hidden");
    } else {
      await update(id);
    }
  };

  return (
    <main className="DisplayIndex">
      <div className="card-index">
        <h2 className="card-header"> Available LED Displays </h2>
        <button>All OFF</button>
        <button>All On</button>
        <div className="list-div">
          <div className="display-list">
            <h4 className="column_1 table-header">Name</h4>
            <h4 className="column_2 table-header">ipaddress</h4>
            <h4 className="column_3 table-header">On/Off</h4>
          </div>
          {displays.length > 0 ? (
            <>
              {displays.map((display: Display) => (
                <div
                  key={display.id}
                  className="display-list"
                  onClick={() => redirctToShow(display.id ? display.id : 0)}
                >
                  <p className="display-item toCapital"> {display.name}</p>
                  <p className="display-item"> {display.ipaddress}</p>
                  <p className="display-item"> off</p>
                </div>
              ))}
            </>
          ) : (
            <p className="display-message">No Available Displays</p>
          )}
        </div>
      </div>

      {missingDisplays.length > 0 ? (
        <div className="card-index">
          <h2 className="card-header">Unavailable LED Display</h2>
          <div className="list-div">
            <div className="display-list toCapital">
              <button
                className="btn btn-search column_3"
                onClick={() => {
                  updateAll();
                }}
              >
                search All
              </button>
              <h4 className="column_1 table-header">Name</h4>
              <h4 className="column_2 table-header">ipaddress</h4>
              <h4 className="column_3 table-header">search</h4>
            </div>
            {missingDisplays.map((display: Display) => (
              <div key={display.id} className="display-list">
                <p onClick={() => redirctToShow(display.id ? display.id : 0)}>
                  {display.name}
                </p>
                <p onClick={() => redirctToShow(display.id ? display.id : 0)}>
                  {display.ipaddress}
                </p>
                <button
                  className="btn btn-search"
                  onClick={() => {
                    searchDisplay(display.id ? display.id : 0);
                  }}
                >
                  Search
                </button>
                <p id={`error-${display.id}`} className="hidden">
                  {" "}
                  Display not founded
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default DisplayIndex;
