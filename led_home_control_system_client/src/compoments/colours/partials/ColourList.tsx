import React from "react";

interface Colour {
  name: string;
  hue: number;
  saturation: number;
  lightness: number;
  id?: number;
}

interface Props {
  colours: Colour[] | undefined;
  selected: Colour[];
  addColour: Function;
  removeColour: Function;
  cancel: (event: React.MouseEvent<HTMLElement>) => void;
  saveColours: Function;
}

const ColourList = (props: Props) => {
  const {
    colours,
    selected,
    addColour,
    removeColour,
    cancel,
    saveColours,
  } = props;

  return (
    <div className="ColourList">
      <p> Select Colours</p>
      <div className="colours-selected-div">
        <p>Selected Colours: </p>
        {selected.length > 0 ? (
          <>
            {selected.map((colour: Colour, index) => (
              <div
                key={index}
                className="swatch-square"
                style={{
                  background: `hsl(${colour.hue}, ${colour.saturation}%, ${colour.lightness}%)`,
                }}
                onClick={() => {
                  removeColour(index);
                }}
              ></div>
            ))}
          </>
        ) : null}
      </div>
      {colours ? (
        <>
          {colours.map((colour: Colour) => (
            <div
              key={colour.id}
              className="swatch-rec"
              style={{
                background: `hsl(${colour.hue}, ${colour.saturation}%, ${colour.lightness}%)`,
              }}
              onClick={() => {
                addColour(colour);
              }}
            >
              {colour.name}
            </div>
          ))}
        </>
      ) : null}
      <div className="btn-div">
        <button
          className="btn btn_save"
          onClick={() => {
            saveColours();
          }}
        >
          Save
        </button>
        <button className="btn btn_cancel" onClick={cancel}>
          {" "}
          cancel
        </button>
      </div>
    </div>
  );
};

export default ColourList;
