import React, { useState, useEffect, useContext } from "react";
import DisplayContext from "../../partials/DisplayContext";

import PatternShow from "./PatternShow";
import RandomShow from "./RandomShow";

import { ColourQuery, LedQuery, ShowQuery } from "../../../js/request";
import CueShow from "./CueShow";

interface Props {
  cancel: (event: React.MouseEvent<HTMLElement>) => void;
  save: Function;
  handleRedirect: Function
  cueShow?: CueShow;
  patternShow?: PatternShow;
  randomShow?: RandomShow;
  editShow?: string;
}

const ShowForm = (props: Props) => {
  const allDisplays = useContext(DisplayContext);

  const { save, cancel, cueShow, randomShow, patternShow, editShow, handleRedirect } = props;

  //STATES:

  // Lists
  const [showTypes, setShowTypes] = useState([{ type: "", id: 0 }]);
  const [colourList, setColourList] = useState<Colour[] | undefined>();
  const [displays, setDisplays] = useState<Display[]>([]);

  // Show info

  const [showName, setShowName] = useState("");
  const [selectedType, setSelectedType] = useState({ type: "", id: 0 });
  const [display, setDisplay] = useState(0);
  const [testDisplay, setTestDisplay] = useState(0);
  const [testDisplaySelected, setTestDisplaySelected] = useState(false);

  const [displayCue, setDisplayCue] = useState<Display | undefined>();

  // Edit
  const [editPattern, setEditPattern] = useState<PatternShow | undefined>();
  const [editRandom, setEditRandom] = useState<RandomShow | undefined>();
  const [editCueList, setEditCueList] = useState<CueShow | undefined>();

  // Functions
  const getShowTypes = async () => {
    const types = await ShowQuery.getShowTypes();
    setShowTypes(types);
  };

  const getColours = async () => {
    const colours = await ColourQuery.getAll();
    setColourList(colours);
  };

  const handleType = () => {
    const type = (document.querySelector("#type") as HTMLInputElement).value;
    if (type !== "-1") {
      setSelectedType(showTypes[parseInt(type)]);
    } else {
      setSelectedType({ type: "", id: -1 });
    }
  };

  const pickTestDisplay = () => {
    const testValue = (document.querySelector(
      "#testDisplay"
    ) as HTMLInputElement).value;
    setTestDisplay(parseInt(testValue));
    setTestDisplaySelected(true);
  };

  const pickDisplay = () => {
    const value = (document.querySelector("#display") as HTMLInputElement)
      .value;
    setDisplay(parseInt(value));
    setTestDisplay(parseInt(value));
    setTestDisplaySelected(true);
    if (selectedType.type === "cue") {
      displays.forEach((display) => {
        if (`${display.id}` === value) {
          setDisplayCue(display);
        }
      });
    }
  };

  const handleChange = () => {
    const value = (document.querySelector("#showName") as HTMLInputElement)
      .value;
    setShowName(value);
  };

  const getShowInfo = () => {
    if (showName.length < 1) {
      document.querySelector("#name")?.classList.add("missing_field");
      document.querySelector("#missing")?.classList.remove("hidden");
    } else {
      document.querySelector("#name")?.classList.remove("missing_field");
      document.querySelector("#missing")?.classList.add("hidden");
    }
    const show: Show
      = {
      name: showName,
      type_id: selectedType.id,
    };
    if (display) {
      show.display_id = display;
    }
    if (cueShow) {
      show.id = cueShow.id;
    }
    if (patternShow) {
      show.id = patternShow.id;
    }
    if (randomShow) {
      show.id = randomShow.id;
    }
    return show;
  };

  const handleSave = async(cue: {}) => {
    const show = getShowInfo();
    const saved = await save(show, cue, selectedType.type);
    return saved;
  };

  const saveCue = async ( cue: CueCue) => {
    const savedCue = await ShowQuery.createCue(cue);
    return savedCue;
  };

  const updateShow = async (cue: CueCue | PatternCue | RandomCue) => {
    const show = getShowInfo();
    const updated = await save(show, cue);
    return updated;
  };

  const handleTest = (showInfo: PatternCue | RandomCue | CueCue[]) => {
    if (selectedType) {
      if (!testDisplaySelected) {
        alert("select a test display");
      } else {
        LedQuery.sendShow(testDisplay, showInfo, selectedType.type);
      }
    } else {
      alert("select a test type");
    }
  };

  const handleCueTest = (showInfo: CueCue[]) => {
    if (selectedType) {
      if (!testDisplaySelected) {
        alert("select a test display");
      } else {
        LedQuery.sendShow(testDisplay, showInfo, selectedType.type);
      }
    } else {
      alert("select a test type");
    }
  };

  const getdefaultType = () => {
    let defaultType = -1;
    if (selectedType) {
      showTypes.forEach((type, index) => {
        if (type.type === selectedType.type) {
          defaultType = index;
        } else if (editShow) {
          showTypes.forEach((type, index) => {
            if (type.type === editShow) {
              defaultType = index;
            }
          });
        }
      });
    }
    return defaultType;
  };

  useEffect(() => {
    getShowTypes();
    getColours();
  }, []);

  const editInfo = (show: Show | undefined, type: string) => {
    setShowName(show ? show.name : "");
    if (show && show.display_id) {
      setDisplay(show.display_id);
      setTestDisplay(show.display_id);
      setTestDisplaySelected(true);
      displays.forEach((displayCheck) => {
        if (`${displayCheck.id}` === `${show.display_id}`) {
          setDisplayCue(displayCheck);
        }
      });
    }
  };

  useEffect(() => {
    if (editShow) {
      switch (editShow) {
        case "pattern":
          editInfo(patternShow, editShow);
          setEditPattern(patternShow ? patternShow : undefined);
          break;
        case "random":
          setEditRandom(randomShow ? randomShow : undefined);
          editInfo(randomShow, editShow);
          break;
        case "cue":
          setEditCueList(cueShow ? cueShow : undefined);
          editInfo(cueShow, editShow);
          break;
        default:
          break;
      }
      showTypes.forEach((type) => {
        if (type.type === editShow) {
          setSelectedType(type);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editShow]);

  useEffect(() => {
    const joinDisplays = allDisplays.displays.concat(
      allDisplays.missingDisplays
    );
    setDisplays(joinDisplays);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDisplays]);

  return (
    <div className="ShowForm form">
      <label htmlFor="name" className="column_1">
        {" "}
        Name:{" "}
      </label>
      <input
        type="text"
        name="name"
        id="showName"
        placeholder="Enter Show name"
        className="column_2_4"
        value={showName}
        onChange={handleChange}
      />
      <p id="missing" className="hidden">
        {" "}
        Please add name{" "}
      </p>

      <label htmlFor="type" className="column_1">
        Type Of Show
      </label>

      {editShow === undefined ? (

        <select
          name="type"
          id="type"
          className="column_2_4"
          onChange={handleType}
          value={getdefaultType()}
        >
          <option value={-1}></option>
          {showTypes.map((type: Type, index) => (
            <option key={type.id} value={index}>
              {type.type}
            </option>
          ))}
        </select>

      ) : (<p>{selectedType.type}</p>)}

      <label htmlFor="display" className="column_1">
        display:
      </label>
      <select
        name="display"
        id="display"
        className="column_2_4"
        onChange={pickDisplay}
        value={display}
      >
        {selectedType.type === "cue" ? (
          <option value="-1"></option>
        ) : (
            <option value="0">General</option>
          )}
        {displays?.map((display) => (
          <option key={display.id} value={display.id}>
            {display.name}
          </option>
        ))}
      </select>
      {selectedType.type !== "cue" ? (
        <>
          {display === 0 ? (
            <>
              <label htmlFor="testDisplay" className="column_1">
                Test display:
              </label>
              <select
                name="testDisplay"
                id="testDisplay"
                className="column_2_4"
                onChange={pickTestDisplay}
              >
                <option value=""></option>

                {displays?.map((display) => (
                  <option key={display.id} value={display.id}>
                    {display.name}
                  </option>
                ))}
              </select>
            </>
          ) : null}
        </>
      ) : null}

      <div className="column_1_5">
        {selectedType.type === "pattern" ? (
          <PatternShow
            colours={colourList}
            editPattern={editPattern}
            handleSave={handleSave}
            handleTest={handleTest}
            updateShow={updateShow}
            cancel={cancel}
          />
        ) : null}
      </div>

      <div className="column_1_5">
        {selectedType.type === "random" ? (
          <RandomShow
            editRandom={editRandom}
            handleSave={handleSave}
            handleTest={handleTest}
            handleUpdate={updateShow}
            cancel={cancel}
          />
        ) : null}
      </div>
      <div className="column_1_5">
        {selectedType.type === "cue" ? (
          <CueShow
            colours={colourList}
            handleSave={handleSave}
            handleTest={handleTest}
            handleCueTest={handleCueTest}
            handleSaveCue={saveCue}
            cancel={cancel}
            display={displayCue}
            editCue={editCueList}
            updateShow={updateShow}
            handleRedirect={handleRedirect}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ShowForm;
