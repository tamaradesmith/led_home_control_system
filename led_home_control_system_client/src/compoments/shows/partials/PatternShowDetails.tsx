import React from "react";

interface Cue {
  id?: number;
  show_id?: number;
  wait_time: number;
  pattern_length?: number;
  group_length: number;
  fade: number;
  type?: string;
  colours: Colour[];
}

interface Colour {
  name: string;
  hue: number;
  saturation: number;
  lightness: number;
  id?: number;
}

interface Props {
  cue: Cue;
}

const PatternShowDetails = (props: Props) => {
  const { cue } = props;
  return (
    <div className="PatternShowDetails">
      <div className="show-cue-div">
        <div className="colours-selected-div column_1_5">
          <p> colour: </p>
          {cue ? (
            <>
              {cue.colours.map((colour: Colour, index) => (
                <div
                  key={index}
                  className="swatch-square"
                  style={{
                    background: `hsl(${colour.hue}, ${colour.saturation}%, ${colour.lightness}%)`,
                  }}
                ></div>
              ))}
            </>
          ) : null}
        </div>
        <p> fade time: {cue.fade} seconds</p>
        <p>wait time: {cue.wait_time} seconds</p>
        <p>group size: {cue.group_length} </p>
      </div>
    </div>
  );
};

export default PatternShowDetails;
