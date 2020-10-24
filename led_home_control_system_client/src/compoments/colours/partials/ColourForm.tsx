import React, { useState } from "react";

import ColourSlider from "./ColourSlider";

interface Colour {
  name: string;
  hue: number;
  saturation: number;
  lightness: number;
  id?: number;
}

interface Props {
  cancel: (event: React.MouseEvent<HTMLElement>) => void;
  save: Function;
  editColour?:  Colour;
}

const ColourForm = (props: Props) => {
  const { cancel, save , editColour} = props;
  const [hue, setHue] = useState((editColour) ? editColour.hue : 0);
  const [saturation, setSaturation] = useState((editColour)? editColour.saturation: 100);
  const [lightness, setLightness] = useState((editColour) ? editColour.lightness: 50);
  const [name, setName] = useState("");
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue =event.target.value;
    console.log("handleChange -> newValue", newValue);

    setName(newValue);
  };

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
    <div className="ColourForm">
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
      <div className="colour-btn-div">
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
