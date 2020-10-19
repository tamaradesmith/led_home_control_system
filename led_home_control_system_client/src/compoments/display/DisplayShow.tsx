import React, { useEffect, useState } from "react";
import { match, useHistory } from "react-router-dom";

import { DisplayQuery } from "../../js/request";

interface DetailParams {
  id: string;
}

interface DetailsProps {
  required: string;
  match: match<DetailParams>;
}

const DisplayShow = (props: DetailsProps) => {
  const history = useHistory();
  const match = props.match;

  const [display, setDisplay] = useState({
    name: "",
    ipaddress: "",
    id: 0,
    led_number: 0,
  });
  const [deleteDiv, setDeleteDiv] = useState(true);

  const getDisplay = async () => {
    const displayInfo = await DisplayQuery.getOne(match.params.id);
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

  useEffect(() => {
    getDisplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="DisplayShow">
      <h4> {display.name}</h4>
      <p>Show: Move show Red</p>
      <p>Status: on</p>
      <p> change show: "drop down of avablie shows"</p>
      <p> change default show: "dropdown of avaible shows"</p>
      <button onClick={editDisplay} className="btn btn_save">
        Edit
      </button>
      <button onClick={confirmDelete} className="btn btn_cancel">
        {" "}
        Delete
      </button>

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
