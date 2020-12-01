import React from 'react';

interface Props {
  index: number;
  cue: CueCue;
  editCue: Function;
  delectCue: Function;
}


const CueDisplay = (props: Props) => {
  const { cue, editCue, delectCue, index } = props;
  return (
    <div className="CueDisplay">

      <div key={index}>
        <p className="cue-name">Cue {index + 1}</p>
        <div className="btn-div">
          <button className="btn btn_save" onClick={() => { editCue(index); }}>
            {" "}
                    edit
                  </button>{" "}
          <button className="btn btn_cancel"
            onClick={() => { delectCue(cue.id); }}
          >
            {" "}
                    delete
                  </button>
        </div>

        <div className="cue-list">
          <p>Wait Time: {cue.time_code}</p>

          <div className="cue-list">
            {cue.leds.map((led, index) => (
              <div
                key={`${index}-led`}
                className="led-swatch"
                style={{
                  background: `hsl(${led.colour.hue}, ${led.colour.saturation}%, ${led.colour.lightness}%)`,
                }}
              >
                <p>{led.led_number}</p>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
};

export default CueDisplay;