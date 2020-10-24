import React from "react";

interface Props {
  key?: number;
  type: string;
  max: number;
  value: number;
  updateValue: Function;
  hslValue: { hue: number; saturation: number; lightness: number };
}

const ColourSlider = (props: Props) => {
  const { type, max, value, updateValue, hslValue } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateValue(event.target.name, parseInt(event.target.value));
  };
  const background = `slider ${type}`;
  return (
    <div className="ColourSlider slider-div">
      <p className='toCapital'> {type} </p>
      <input
        type="range"
        name={type}
        min="0"
        max={max}
        onChange={handleChange}
        value={value}
        className={background}
        style={
          type !== "hue"
            ? {
                background: `linear-gradient(to right, hsl(${hslValue.hue}, ${
                  type !== "saturation" ? hslValue.saturation : 0
                }%, ${type !== "lightness" ? hslValue.lightness : 0}%), hsl(${
                  hslValue.hue
                }, ${type !== "saturation" ? hslValue.saturation : 100}%, ${
                  type !== "lightness" ? hslValue.lightness : 90
                }%))`,
              }
            : { border: "0px solid black" }
        }
      />
      <input
        type="number"
        id={type}
        name={type}
        min="0"
        max={max}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default ColourSlider;
