import React, { useEffect, useState, useContext } from "react";
import { match, useHistory } from "react-router-dom";

import DisplayContext from "../partials/DisplayContext";

import { DisplayQuery, LedQuery } from "../../js/request";

import ButtonCompoment from "../partials/ButtonCompoment";
import ShowList from "./partials/ShowList";

interface DisplayParams {
  id: string;
}

interface DisplaysProps {
  required: string;
  match: match<DisplayParams>;
}

const DisplayShow = (props: DisplaysProps) => {
  const history = useHistory();
  const match = props.match;

  const allDisplays = useContext(DisplayContext);

  const [display, setDisplay] = useState({
    name: "",
    ipaddress: "",
    id: 0,
    led_number: 0,
    shows: [],
    default_on: true,
    default_show: { name: "", id: 0, display_id: 0, type_id: 0 },
  });

  const [deleteDiv, setDeleteDiv] = useState(true);
  const [showlist, setShowList] = useState(false);

  const getDisplay = async () => {
    const displayInfo = await DisplayQuery.getOne(match.params.id);
    displayInfo.shows.forEach((show: { id: number; }) => {
      if (show.id === displayInfo.default_show) {
        displayInfo.default_show = show;
      }
    });
    setDisplay(displayInfo);
  };
  const confirmDelete = () => {
    setDeleteDiv(false);
  };
  const deleteDisplay = async () => {
    const result = await DisplayQuery.delete(display.id);
    if (result === 200) {
      setDeleteDiv(true);
      history.push(`/displays`);
    } else {
      const message = document.querySelector<HTMLElement>(
        "#errorMessage"
      ) as HTMLElement;
      message.innerText = "Something when wrong please try again";
    }
  };

  const cancel = () => {
    playShow(display.default_show);
    setDeleteDiv(true);
  };

  const editDisplay = () => {
    history.push(`/displays/${display.id}/edit`);
  };

  const cancelShow = () => {
    setShowList(false);
  };

  const saveShow = async (show: Show) => {
    const displayUpdated = {
      name: display.name,
      ipaddress: display.ipaddress,
      led_number: display.led_number,
      id: display.id,
      default_show: show.id,
      default_on: display.default_on,
    };
    const res = await DisplayQuery.update(displayUpdated);
    if (res.id) {
      setShowList(false);
      getDisplay();
    }
  };

  const playShow = async (show: Show) => {
    await LedQuery.playShow(display.id, show.id ? show.id : 0);
  };

  const playDefaultShow = async () => {
    if (display.default_show) {
      await LedQuery.playOne(display.id);
    } else {
      const message = document.querySelector<HTMLElement>(
        "#message"
      ) as HTMLElement;
      message.innerText = "Please select a show";
    }
  };

  const stopDefaultShow = () => {
    LedQuery.stopOne(display.id);
  };

  const checkForDisplay = () => {
    let result = 'false';
    if (allDisplays) {
      allDisplays.displays.forEach(oneDisplay => {
        if (display.id === oneDisplay.id) {
          result = 'true';
        }
      });
      return result;
    }
  };

  useEffect(() => {
    getDisplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="DisplayShow">
      <div className="card-div">
        <div className="card">
          <h4 className="card-header"> {display.name}</h4>

          <p className="card-label">Contection:</p>
          <p className="column_2">{checkForDisplay()}</p>

          <div className="column_3_4 show-btn-div">
            <ButtonCompoment text={'Play'} styleClass={"btn btn_save"} action={playDefaultShow} />
            <ButtonCompoment text={'Stop'} styleClass={"btn btn_cancel"} action={stopDefaultShow} />

          </div>
          {/* <ButtonCompoment className="card-label column_4" />  */}

          <p id="message" className="message-text"></p>
          <p className="card-label column_1">Current Show:</p>
          <p className="column_2_4">
            {" "}
            {display.default_show ? (
              <>{display.default_show.name}</>
            ) : (
                <>none</>
              )}
          </p>

          <ButtonCompoment
            text={'Change Shows'}
            styleClass="btn_save btn btn_x_big column_4"
            action={() => {
              setShowList(showlist ? false : true);
            }}
          />

          <div className="btn-div">

            <ButtonCompoment text={'Edit'} styleClass={"btn btn_save"} action={editDisplay} />

            <ButtonCompoment text={'Delete'} action={confirmDelete} styleClass={"btn btn_cancel"} />

          </div>
        </div>
      </div>
      <div className={!showlist ? "hidden" : ""}>
        <ShowList
          shows={display.shows ? display.shows : display.shows[0]}
          cancel={cancelShow}
          save={saveShow}
          current={display.default_show}
          play={playShow}
        />
      </div>

      <p id="errorMessage" className="message-text"></p>
      <div id="confirm" className={deleteDiv ? "hidden" : "confirm-delete-div"}>
        {" "}
        <p>Are you sure you wish to delete {display.name} display?</p>{" "}
        <div className="confirm-btn">
          <button
            onClick={deleteDisplay}
            className="btn btn_save"
            disabled={deleteDiv}
          >
            Yes
          </button>

          <ButtonCompoment text={'Cancel'} action={cancel} styleClass={'btn btn_cancel'} />

        </div>
      </div>
    </div>
  );
};

export default DisplayShow;
