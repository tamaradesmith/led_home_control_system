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
  default_on?: boolean
}
interface Props {
  cancel: (event: React.MouseEvent<HTMLElement>) => void;
  save: Function;
}

const ShowForm = (props: Props) => {
  const allDisplays = useContext(DisplayContext);
  console.log("ShowForm -> allDisplays", allDisplays);

  const { save, cancel } = props;

  const [showTypes, setShowTypes] = useState([]);
  const [displays, setDisplays] = useState<undefined | Display[]>([]);
  const [selectedType, setSelectedType] = useState("pattern");
  const [colourList, setColourList] = useState<Colour[] | undefined>();
  const [testDisplay, setTestDisplay] = useState(
     allDisplays.displays[0]
  );

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
    setSelectedType(type);
  };
  const handleSave = () => {};

  const handleTest = (showInfo: Show) => {
console.log(testDisplay)
    LedQuery.sendShow(testDisplay, showInfo)

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
        placeholder="Enter Show name"
        className="column_2_4"
      />
      <label htmlFor="display" className="column_1">
        display:
      </label>
      <select name="display" className="column_2_4">
        <option value="general">General</option>
        {displays?.map((display) => (
          <option key={display.id} value={display.id}>
            {display.name}
          </option>
        ))}
      </select>
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
        {showTypes.map((type: Type) => (
          <option key={type.id} value={type.type}>
            {type.type}
          </option>
        ))}
      </select>

      <div className="column_1_5">
        {selectedType === "pattern" ? (
          <PatternShow
            colours={colourList}
            handleSave={handleSave}
            handleTest={handleTest}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ShowForm;
