import React, { useEffect, useState, useContext } from "react";
import DisplayContext from '../../partials/DisplayContext'

import ColourSlider from "./ColourSlider";

import { LedQuery } from "../../../js/request";

interface Colour {
  name: string;
  hue: number;
  saturation: number;
  lightness: number;
  id?: number;
}

interface Display {
  name: string;
  ipaddress: string;
  led_number: number;
  id?: number;
}

interface Props {
  cancel: (event: React.MouseEvent<HTMLElement>) => void;
  save: Function;
  editColour?: Colour;
}

const ColourForm = (props: Props) => {
  const { cancel, save, editColour} = props;
   const allDisplays = useContext(DisplayContext);

  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const [name, setName] = useState("");
  const [testDisplay, setTestDisplay] = useState<undefined | Display>(allDisplays.displays.length === 1 ? allDisplays.displays[0]: undefined);
  const HSL = [
    { type: "hue", max: 360, value: hue },
    { type: "saturation", max: 100, value: saturation },
    { type: "lightness", max: 100, value: lightness },
  ];

  const handleSave = () => {
    if (name) {
      const colour = {
        name: name.toLowerCase(),
        hue,
        saturation,
        lightness,
      };
      save(colour);
    } else {
      document.querySelector("#name")?.classList.add("missing_field");
      document.querySelector("#missing")?.classList.remove("hidden");
    }
  };
  const handleTestDisplay = () => {
    const testValue = (document.querySelector(
      "#testDisplay"
    ) as HTMLInputElement).value;
    setTestDisplay(allDisplays.displays[parseInt(testValue)]);
  };

  const testColour = () => {
    const testColour = {
      hue,
      saturation,
      lightness,
    };
    const displayInfo = {
      id: testDisplay ? (testDisplay.id === undefined ? 0 : testDisplay.id) : 0,
      led_number: testDisplay ? testDisplay.led_number : 0,
      ipaddress: testDisplay ? testDisplay.ipaddress : "none",
      name: testDisplay ? testDisplay.name : "none",
    };
    if (testDisplay) {
      LedQuery.sendColour(displayInfo, testColour);
    } else {
      alert("select a display!");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setName(newValue);
  };

  useEffect(() => {
    if (editColour) {
      setHue(editColour?.hue);
      setSaturation(editColour.saturation);
      setLightness(editColour.lightness);
      setName(editColour.name);
    }
  }, [editColour]);

  const updateValue = (name: string, newValue: number) => {
    switch (name) {
      case "hue":
        setHue(newValue);
        break;
      case "saturation":
        setSaturation(newValue);
        break;
      case "lightness":
        setLightness(newValue);
        break;
      default:
        break;
    }
  };

  return (
    <div className="ColourForm ">
      <label htmlFor="name" className="colour-label" defaultValue={name}>
        Name:{" "}
      </label>
      <input
        type="text"
        id="name"
        placeholder="Name of Colour"
        onChange={handleChange}
        defaultValue={editColour ? editColour.name : ""}
      ></input>
      <p id="missing" className="hidden">
        {"   "}
        *** Please add colour's name ***
      </p>
      <label htmlFor="display" className="column_4"> Select Test Display: </label>
      <select id="testDisplay" name="display" onChange={handleTestDisplay}>
        <option></option>
        {allDisplays.displays.map((display, index) => (
          <option key={display.id} value={index}>
            {display.name}
          </option>
        ))}
      </select>
      {HSL.map((type, index) => (
        <ColourSlider
          key={index}
          type={type.type}
          max={type.max}
          value={type.value}
          updateValue={updateValue}
          hslValue={{ hue, saturation, lightness }}
        />
      ))}
      <div
        className="colour-swatch"
        style={{ background: `hsl(${hue}, ${saturation}%, ${lightness}%)` }}
      ></div>
      <div className="colour-btn-div ">
        <button className="btn btn_save" onClick={testColour}>
          {" "}
          Test
        </button>
        <button className="btn btn_save" onClick={handleSave}>
          {" "}
          Save
        </button>
        <button className="btn btn_cancel" onClick={cancel}>
          {" "}
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ColourForm;
