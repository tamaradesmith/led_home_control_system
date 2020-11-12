import React, { useState, useEffect, useContext } from "react";
import DisplayContext from "../../partials/DisplayContext";

import PatternShow from "./PatternShow";
import RandomShow from "./RandomShow";

import { ColourQuery, LedQuery, ShowQuery } from "../../../js/request";
import CueShow from "./CueShow";

interface Type {
  id: number;
  type: string;
}

interface Colour {
  name: string;
  hue: number;
  saturation: number;
  lightness: number;
  id: number;
}
interface Cue {
  id?: number;
  show_id?: number;
  wait_time: number;
  pattern_length: number;
  group_length: number;
  fade: number;
  colours: [];
}

interface Show {
  id?: number;
  show_id?: number;
  wait_time: number;
  name: string;
  pattern_length: number;
  group_length: number;
  display_id?: number;
  type: string;
  type_id: number;
  cue?: Cue;
}

interface Display {
  name: string;
  ipaddress: string;
  led_number: number;
  id?: number | string;
  default_on?: boolean;
}

interface Props {
  cancel: (event: React.MouseEvent<HTMLElement>) => void;
  save: Function;
  editShow?: Show;
}

const ShowForm = (props: Props) => {
  const allDisplays = useContext(DisplayContext);

  const { save, cancel, editShow } = props;

  // Lists
  const [showTypes, setShowTypes] = useState([{ type: "", id: 0 }]);
  const [colourList, setColourList] = useState<Colour[] | undefined>();
  const [displays, setDisplays] = useState<Display[]>([]);

  // Show info

  const [showName, setShowName] = useState("");
  const [selectedType, setSelectedType] = useState({ type: "cue", id: 2 });
  const [display, setDisplay] = useState(0);
  const [testDisplay, setTestDisplay] = useState(0);
  const [testDisplaySelected, setTestDisplaySelected] = useState(false);

  const [displayCue, setDisplayCue] = useState<Display | undefined>();

  // Edit
  const [editPattern, setEditPattern] = useState<Cue | undefined>();

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
        if (display.id == parseInt(value)) {
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
    }
    const show: {
      name: string;
      type_id: number;
      display_id?: number;
      id?: number;
    } = {
      name: showName,
      type_id: selectedType.id,
    };
    if (display !== 0) {
      show.display_id = display;
    }
    if (editShow) {
      show.id = editShow.id;
    }
    return show;
  };

  const handleSave = (cue: {}) => {
    const show = getShowInfo();
  
    const saved = save(show, cue,selectedType.type);
    return saved;
  };

  const saveCue = () =>{console.log('save cue')}

  const handleTest = (showInfo: Show) => {
    if (selectedType) {
      showInfo.type = selectedType.type;
    } else {
      alert("select a test type");
    }
    if (!testDisplaySelected) {
      alert("select a test display");
    } else {
      LedQuery.sendShow(testDisplay, showInfo);
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
            if (type.type === editShow.type) {
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

  useEffect(() => {
    if (editShow) {
      setShowName(editShow.name);
      setDisplay(editShow.display_id ? editShow.display_id : 0);
      setTestDisplay(editShow.display_id ? editShow.display_id : 0);
      setTestDisplaySelected(editShow.display_id ? true : false);
      setEditPattern(editShow ? editShow.cue : undefined);
      showTypes.forEach((type) => {
        if (editShow.type === type.type) {
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

      <label htmlFor="display" className="column_1">
        display:
      </label>
      <select
        name="display"
        id="display"
        className="column_2_4"
        onChange={pickDisplay}
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
            handleSave={handleSave}
            handleTest={handleTest}
            cancel={cancel}
            editPattern={editPattern}
          />
        ) : null}
      </div>

      <div className="column_1_5">
        {selectedType.type === "random" ? (
          <RandomShow
            handleSave={handleSave}
            handleTest={handleTest}
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
            handleSaveCue={saveCue}
            cancel={cancel}
            display={displayCue}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ShowForm;
