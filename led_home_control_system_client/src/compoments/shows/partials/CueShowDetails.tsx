import React from "react";
import "../../../styles/cueShowStyles.css";

interface Props {
  cues: CueCue[];
}

const CueShowDeatails = (props: Props) => {
  const { cues } = props;

  return (
    <div className="CueShowDetails">
      <p> Timeline</p>
      <div>
        <div className="timeline">
          <p>0</p>
          <p>{cues[cues.length - 1].time_code}</p>
        </div>
        <div className="timeline-cue-div">
          {cues.map((cue, index: number) => (
            <p
              key={index}
              className="timeline-cue"
              style={
                (cue.time_code / cues[cues.length - 1].time_code) * 100 < 80
                  ? {
                    left: `${(cue.time_code / cues[cues.length - 1].time_code) * 100
                      }%`,
                  }
                  : {
                    left: `${(cue.time_code / cues[cues.length - 1].time_code -
                        0.065) *
                      100
                      }%`,
                  }
              }
            >
              {" "}
              {(cue.time_code / cues[cues.length - 1].time_code) * 100 > 90 ? (
                <>cue{index + 1} |</>
              ) : (
                  <>| cue{index + 1}</>
                )}
            </p>
          ))}
        </div>
      </div>
      <div>
        <p className="cue-header">Cues List</p>
        <div className='cue-list-div'>
          {cues.map((cue: CueCue, index: number) => (
            <div key={cue.id}>
              <p className="cue-name">Cue {index + 1}</p>

              <div className="cue-list">
                <p> Wait: {cue.time_code}</p>
                {cue.leds.map((led) => (
                  <div
                    key={led.id}
                    className="led-swatch"
                    style={
                      led.colour
                        ? {
                          background: `hsl(${led.colour.hue}, ${led.colour.saturation}%, ${led.colour.lightness}%)`,
                        }
                        : { border: "1px solid black" }
                    }
                  >
                    <p className="led-label">{led.led_number}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CueShowDeatails;
