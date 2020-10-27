import React, { useEffect, useState } from "react";
import { match, useHistory } from "react-router-dom";

import { DisplayQuery } from "../../js/request";

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
      <h4 className="main-header"> {display.name}</h4>
      <div className="card-div">
        <div className="card">
          <h6 className="card-header">Current Stauts</h6>
          <p className="card-label">Contection:</p>
          <p className="column_2">true</p>
          <p className="card-label column_3"> Stauts: </p>
          <p className="column_4">play</p>
          <p className="card-label">Current Show:</p>
          <p className="column_2_5"> Move show Red</p>
          <p className="card-label column_1"> change show: </p>
          <p className="column_2_5">"drop down of avablie shows"</p>
        </div>

        <div className="card">
          <h6 className="card-header">Setups</h6>
          <p className="card-label"> startup:</p>
          <p>Play </p>
          <p className="card-label column_1"> default show: </p>
          <p className='column_2_4'> red Move </p>
           <p>click change defeaut show</p>
        </div>
      </div>
      <div className="btn-div">
        <button onClick={editDisplay} className="btn btn_save">
          Edit
        </button>
        <button onClick={confirmDelete} className="btn btn_cancel">
          {" "}
          Delete
        </button>
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
