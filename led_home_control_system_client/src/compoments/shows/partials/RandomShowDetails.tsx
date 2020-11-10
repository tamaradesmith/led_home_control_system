import React from "react";

interface Cue {
  id?: number;
  show_id?: number;
  wait_time: number;
  wait_random: boolean;
  fade: number;
  fade_random: boolean;
  hue_max: number;
  hue_min: number;
  lightness: number;
  saturation: number;
  type?: string;
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

const RandomShowDetails = (props: Props) => {
  const { cue } = props;
  console.log("RandomShowDetails -> cue", cue);

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
