import React from "react";
import ButtonCompoment from "../../partials/ButtonCompoment";

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
        <ButtonCompoment text={'Save'}
          action={() => {
            saveColours();
          }}
          styleClass={'btn btn_save'} />
       
        
        <ButtonCompoment text={'Cancel'} action={cancel} styleClass={'btn btn_cancel'} />
        
      </div>
    </div>
  );
};

export default ColourList;
