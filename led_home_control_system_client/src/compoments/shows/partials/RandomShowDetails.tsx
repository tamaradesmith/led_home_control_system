import React from "react";

interface Props {
  cue: RandomCue;
}

const RandomShowDetails = (props: Props) => {
  const { cue } = props;

  return (
    <div className="RandomShowDetails">
      <div className="show-cue-div">
        <p> fade time: {cue.fade} seconds</p>
        <p> random: {cue.fade_random ? "true" : "false"}</p>
        <p>wait time: {cue.wait_time} seconds</p>
        <p> random: {cue.wait_random ? "true" : "false"}</p>

        <p> saturation Level: {cue.saturation}%</p>
        <p> lightness Level: {cue.lightness}%</p>

        <p>
          Hue Limited:{" "}
          {cue.hue_max !== 360 || cue.hue_min !== 0 ? "true" : "false"}{" "}
        </p>
        {cue.hue_min !== 0 ? (
          <>
            <p> Hue Min: {cue.hue_min}</p>
          </>
        ) : null}
        {cue.hue_max !== 360 ? (
          <>
            <p> Hue max: {cue.hue_max}</p>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default RandomShowDetails;
