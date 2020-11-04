import React, { useEffect, useState } from "react";
import { match, useHistory } from "react-router-dom";

import { DisplayQuery } from "../../js/request";
import ShowList from "./partials/ShowList";

interface DisplayParams {
  id: string;
}
interface Show {
  name: string;
  id: number;
  display_id: number;
}

interface DisplaysProps {
  required: string;
  match: match<DisplayParams>;
}

const DisplayShow = (props: DisplaysProps) => {
  const history = useHistory();
  const match = props.match;

  const [display, setDisplay] = useState({
    name: "",
    ipaddress: "",
    id: 0,
    led_number: 0,
    shows: [],
    default_on: true,
    default_show: { name: "", id: 0, display_id: 0 },
  });

  const [deleteDiv, setDeleteDiv] = useState(true);
  const [showlist, setShowList] = useState(false);

  const getDisplay = async () => {
    const displayInfo = await DisplayQuery.getOne(match.params.id);
    displayInfo.shows.forEach((show: { id: number }) => {
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
    await DisplayQuery.update(displayUpdated);
    setShowList(false);
    getDisplay();
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
          <p className="column_2">true</p>
          <p className="card-label column_3"> Stauts: </p>
          <p className="column_4">play</p>
          <p className="card-label">Current Show:</p>
          <p className="column_2_4">
            {" "}
            {display.default_show ? (
              <>{display.default_show.name}</>
            ) : (
              <>none</>
            )}
          </p>

          <p
            className="column_4"
            onClick={() => {
              setShowList(showlist ? false : true);
            }}
          >
            Change Shows
          </p>
          <div className="btn-div">
            <button onClick={editDisplay} className="btn btn_save">
              Edit
            </button>
            <button onClick={confirmDelete} className="btn btn_cancel">
              {" "}
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className={!showlist ? "hidden" : ""}>
        <ShowList
          shows={display.shows ? display.shows : []}
          cancel={cancelShow}
          save={saveShow}
          current={display.default_show}
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
          <button onClick={cancel} className="btn btn_cancel">
            {" "}
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayShow;
