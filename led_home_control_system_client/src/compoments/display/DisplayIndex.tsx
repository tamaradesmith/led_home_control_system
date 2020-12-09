import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import DisplayContext from "../partials/DisplayContext";
import { DisplayQuery, LedQuery } from "../../js/request";
import ButtonCompoment from "../partials/ButtonCompoment";

interface Props {
  update: Function;
  updateAll: Function;
}

const DisplayIndex = (props: Props) => {
  const { update, updateAll } = props;
  const history = useHistory();

  const allDisplays = useContext(DisplayContext);

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

  const playAll = () => {
    LedQuery.playAll();
  };

  const playOne = (display: Display) => {
    if (display.id) {
      LedQuery.playOne(display.id);
    }
  };

  const stopAll = () => {
    LedQuery.stopAll();
  };

  const stopOne = (display: Display) => {
    if (display.id) {
      LedQuery.stopOne(display.id);
    }
  };

  return (
    <main className="DisplayIndex">
      <div className="card-index">
        <h2 className="card-header"> Available LED Displays </h2>
        <ButtonCompoment text={'Stop All'} action={stopAll} styleClass={'btn btn_cancel'} />
        <ButtonCompoment text={'Play All'} action={playAll} styleClass={'btn btn_save'} />

        <div className="list-div">
          <div className="display-list">
            <h4 className="column_1 table-header">Name</h4>
            <h4 className="column_2 table-header">ipaddress</h4>
            <h4 className="column_3 table-header">play</h4>
            <h4 className="column_4 table-header">stop</h4>
          </div>
          {allDisplays.displays && allDisplays.displays.length > 0 ? (
            <>
              {allDisplays.displays.map((display: Display) => (
                <div
                  key={display.id}
                  className="display-list"
                >
                  <p className="display-item toCapital" onClick={() => redirctToShow(display.id ? display.id : 0)}> {display.name}</p>
                  <p className="display-item" onClick={() => redirctToShow(display.id ? display.id : 0)}> {display.ipaddress}</p>
                  <ButtonCompoment text={'play'} action={() => { playOne(display); }} styleClass={'btn btn_save'} />
                  <ButtonCompoment text={'stop'} action={() => { stopOne(display); }} styleClass={'btn btn_cancel'} />

                </div>
              ))}
            </>
          ) : (
              <p className="display-message">No Available Displays</p>
            )}
        </div>
      </div>

      { allDisplays.missingDisplays && allDisplays.missingDisplays.length > 0 ? (
        <div className="card-index">
          <h2 className="card-header">Unavailable LED Display</h2>
          <div className="list-div">
            <div className="display-list toCapital">
              <ButtonCompoment text={'Search All'} action={() => {
                updateAll();
              }} styleClass={"btn btn-search column_3"} />

              <h4 className="column_1 table-header">Name</h4>
              <h4 className="column_2 table-header">ipaddress</h4>
              <h4 className="column_3 table-header">search</h4>
            </div>
            {allDisplays.missingDisplays.map((display: Display) => (
              <div key={display.id} className="display-list">
                <p onClick={() => redirctToShow(display.id ? display.id : 0)}>
                  {display.name}
                </p>
                <p onClick={() => redirctToShow(display.id ? display.id : 0)}>
                  {display.ipaddress}
                </p>
                <ButtonCompoment text={'Search'}
                  styleClass={"btn btn-search"}
                  action={() => {
                    searchDisplay(display.id ? display.id : 0);
                  }}
                />

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
