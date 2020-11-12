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
  cancel: (event: React.MouseEvent<HTMLElement>) => void;
  selectColour: Function;
}

const ColourCueList = (props: Props) => {
  const { colours, cancel, selectColour } = props;

  return (
    <div className="ColourCueList cue-colour-list">
      <h4 className="card-header"> colour list</h4>
      <div className="cue-swatch-list">
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
                  selectColour(colour);
                }}
              >
                {colour.name}
              </div>
            ))}
          </>
        ) : null}
      </div>
      <div className="show-btn-div column_1_5">
        <button className="btn btn_cancel" onClick={cancel}>
          {" "}
          cancel
        </button>
      </div>
    </div>
  );
};

export default ColourCueList;
