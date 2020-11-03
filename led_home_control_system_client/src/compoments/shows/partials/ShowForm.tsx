import React, { useState, useEffect, useContext } from "react";
import DisplayContext from "../../partials/DisplayContext";

import PatternShow from "./PatternShow";

import { ColourQuery, LedQuery, ShowQuery } from "../../../js/request";

interface Type {
  id: number;
  type: string;
}

interface Colour {
  name: string;
  hue: number;
  saturation: number;
  lightness: number;
  id?: number;
}

interface Show {
  id?: number;
  show_id?: number;
  wait_time: number;
  name?: string;
  pattern_length: number;
  group_length: number;
}

interface Display {
  name: string;
  ipaddress: string;
  led_number: number;
  id?: number;
  default_on?: boolean;
}
interface Props {
  cancel: (event: React.MouseEvent<HTMLElement>) => void;
  save: Function;
}

const ShowForm = (props: Props) => {
  const allDisplays = useContext(DisplayContext);

  const { save, cancel } = props;

  const [showTypes, setShowTypes] = useState([]);
  const [showName, setShowName] = useState("");
  const [displays, setDisplays] = useState<Display[]>([]);
  const [selectedType, setSelectedType] = useState({ type: "pattern", id: 1 });
  const [colourList, setColourList] = useState<Colour[] | undefined>();
  const [display, setDisplay] = useState(0);
  const [testDisplay, setTestDisplay] = useState(0);
  const [testDisplaySelected, setTestDisplaySelected] = useState(false);

  const getShowTypes = async () => {
    const types = await ShowQuery.getShowTypes();
    console.log("getShowTypes -> types", types);
    setShowTypes(types);
  };
  const getColours = async () => {
    const colours = await ColourQuery.getAll();
    setColourList(colours);
  };

  const handleType = () => {
    const type = (document.querySelector("#type") as HTMLInputElement).value;
    setSelectedType(showTypes[parseInt(type)]);
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
    const show: { name: string; type_id: number; display_id?: number } = {
      name: showName,
      type_id: selectedType.id,
    };
    if (display !== 0) {
      show.display_id = display;
    }
    return show;
  };

  const handleSave = (cue: {}) => {
    const show = getShowInfo();
    save(show, cue)
  };

  const handleTest = (showInfo: Show) => {
    if (!testDisplaySelected) {
      alert("select a test display");
    } else {
      LedQuery.sendShow(testDisplay, showInfo);
    }
  };

  useEffect(() => {
    getShowTypes();
    getColours();
  }, []);

  useEffect(() => {
    const joinDisplays = allDisplays.displays.concat(
      allDisplays.missingDisplays
    );
    setDisplays(joinDisplays);
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
      <label htmlFor="display" className="column_1">
        display:
      </label>
      <select
        name="display"
        id="display"
        className="column_2_4"
        onChange={pickDisplay}
      >
        <option value="0">General</option>
        {displays?.map((display) => (
          <option key={display.id} value={display.id}>
            {display.name}
          </option>
        ))}
      </select>

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

      <label htmlFor="type" className="column_1">
        Type Of Show
      </label>
      <select
        name="type"
        id="type"
        className="column_2_4"
        onChange={handleType}
      >
        <option></option>
        {showTypes.map((type: Type, index) => (
          <option key={type.id} value={index}>
            {type.type}
          </option>
        ))}
      </select>

      <div className="column_1_5">
        {selectedType.type === "pattern" ? (
          <PatternShow
            colours={colourList}
            handleSave={handleSave}
            handleTest={handleTest}
            cancel={cancel}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ShowForm;
