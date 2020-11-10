import React, { useState, useEffect } from "react";
import { match, useHistory } from "react-router-dom";
import { ShowQuery } from "../../js/request";

import PatternShowDetails from "./partials/PatternShowDetails";
import RandomShow from "./partials/RandomShow";
import RandomShowDetails from "./partials/RandomShowDetails";

interface Show {
  name: string;
  type_id: number;
  display_id?: number;
  cue: PatternCue | RandomCue;
  type: string;
}

interface Colour {
  name: string;
  hue: number;
  saturation: number;
  lightness: number;
  id?: number;
}

interface PatternCue {
  id?: number;
  show_id?: number;
  wait_time: number;
  pattern_length?: number;
  group_length: number;
  fade: number;
  colours: Colour[] | [];
  type?: string;
}

interface RandomCue {
  id?: number;
  show_id?: number;
  wait_time: number;
  wait_random: boolean;
  fade: number;
  fade_random: boolean;
  hue_max: number;
  hue_min: number;
  lightness: number;
  saturation: number;
  type?: string;
}

interface ShowParams {
  id: string;
}

interface Props {
  match: match<ShowParams>;
}

const ShowShow = (props: Props) => {
  const match = props.match;
  const history = useHistory();

  const [show, setShow] = useState({
    name: "",
    type: "",
    display_id: null,
    cue: {},
    id: 0,
  });

  const [cue, setCue] = useState({
    colours: [],
    fade: 0,
    wait_time: 0,
    group_length: 0,
  });


  const [deleteDiv, setDeleteDiv] = useState(true);

  const getShow = async () => {
    const savedShow = await ShowQuery.getOne(parseInt(match.params.id));
    const showCue = savedShow.cue;
    showCue.type = savedShow.type;
    setShow(savedShow);
    setCue(showCue);
  };

 
  const editShow = () => {
    history.push(`/shows/${show.id}/edit`);
  };

  const cancel = () => {
    setDeleteDiv(true);
  };

  const confirmDelete = async () => {
    setDeleteDiv(false);
  };

  const deleteShow = async () => {
    const result = await ShowQuery.delete(show.id);
    if (result === 200) {
      history.push("/shows");
    } else {
      const message = document.querySelector<HTMLElement>(
        "#errorMessage"
      ) as HTMLElement;
      message.innerText = "Something when wrong please try again";
    }
  };

  const instanceOfRandomCue = (object: any): object is RandomCue => {
    return object.type === "random";
  };
  const instanceOfPatternCue = (object: any): object is PatternCue => {
    return object.type === "pattern";
  };

  useEffect(() => {
    getShow();
  }, []);

  return (
    <div className="ShowShow">
      <div className="card-show">
        <h4 className="card-header">{show ? show.name : ""} </h4>
        <p>Type: {show.type} </p>
        <p>
          {" "}
          display: {show.display_id === null ? "General" : show.display_id}
        </p>
        <div >
          <h4 className="column_1_5 header-secondary"> Cue</h4>

          {instanceOfPatternCue(cue) ? <PatternShowDetails cue={cue} /> : null}

          {instanceOfRandomCue(cue) ? <RandomShowDetails cue={cue} /> : null}
        </div>

        <div className="btn-div">
          <button onClick={editShow} className="btn btn_save">
            Edit
          </button>
          <button onClick={confirmDelete} className="btn btn_cancel">
            {" "}
            Delete
          </button>
        </div>
      </div>

      <p id="errorMessage" className="message-text"></p>
      <div id="confirm" className={deleteDiv ? "hidden" : "confirm-delete-div"}>
        {" "}
        <p>Are you sure you wish to delete {show.name} show?</p>{" "}
        <div className="confirm-btn">
          <button
            onClick={deleteShow}
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

export default ShowShow;
