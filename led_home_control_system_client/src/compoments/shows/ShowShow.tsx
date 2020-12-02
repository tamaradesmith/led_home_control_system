import React, { useState, useEffect } from "react";
import { match, useHistory } from "react-router-dom";
import { ShowQuery, LedQuery } from "../../js/request";

import PatternShowDetails from "./partials/PatternShowDetails";
import RandomShowDetails from "./partials/RandomShowDetails";
import CueShowDetails from "./partials/CueShowDetails";

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
    display_id: -1,
    cue: {},
    id: 0,
  });

  const [cuePattern, setCuePattern] = useState({
    id: -1,
    wait_time: -1,
    fade: 0,
    colours: [
      {
        name: "",
        hue: 0,
        saturation: -1,
        lightness: -1,
        id: -1,
      },
      {
        name: "",
        hue: 0,
        saturation: -1,
        lightness: -1,
        id: -1,
      },
    ],
    show_id: -1,
  });
  const [CueRandom, setCueRandom] = useState({
    id: -1,
    wait_time: -1,
    fade: 0,
    wait_random: false,
    fade_random: false,
    hue_max: 360,
    hue_min: 0,
    lightness: 50,
    saturation: 100,
    show_id: -1,
  });
  const [cueCues, setCueCues] = useState([
    {
      id: -1,
      time_code: -1,
      show_id: -1,
      leds: [
        {
          id: -1,
          fade: 0,
          led_colour: -1,
          led_number: -1,
          colour: {
            name: "",
            hue: 0,
            saturation: -1,
            lightness: -1,
            id: -1,
          },
        },
      ],
    },
  ]);

  const [deleteDiv, setDeleteDiv] = useState(true);

  const getShow = async () => {
    const savedShow = await ShowQuery.getOne(parseInt(match.params.id));
    const showCue = savedShow.cue;
    showCue.type = savedShow.type;
    setShow(savedShow);
    switch (showCue.type) {
      case "pattern":
        setCuePattern(showCue);
        break;
      case "random":
        setCueRandom(showCue);
        break;
      case "cue":
        setCueCues(showCue);
        break;
      default:
        break;
    }
  };

  const playShow = async () => {
    await LedQuery.sendShow(show.display_id, cueCues, show.type);
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
    return object === "random";
  };
  const instanceOfPatternCue = (object: any): object is PatternCue => {
    return object === "pattern";
  };
  const instanceOfCueCue = (object: any): object is CueCue => {
    return object === "cue";
  };

  useEffect(() => {
    getShow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div>
          <h4 className="column_1_5 header-secondary"> Cue</h4>

          {instanceOfPatternCue(show.type) ? (
            <PatternShowDetails cue={cuePattern} />
          ) : null}

          {instanceOfRandomCue(show.type) ? (
            <RandomShowDetails cue={CueRandom} />
          ) : null}

          {instanceOfCueCue(show.type) ? (
            <CueShowDetails cues={cueCues} />
          ) : null}
        </div>

        <div className="btn-div">
          {instanceOfCueCue(show.type) ? (
            <button onClick={playShow} className="btn btn_save">
              play
            </button>
          ) : null}
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
