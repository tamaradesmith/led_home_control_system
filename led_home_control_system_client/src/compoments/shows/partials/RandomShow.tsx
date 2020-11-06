import React, { useState } from "react";
interface Props {}

const RandomShow = (props: Props) => {
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const [fade, setfade] = useState(1);
  const [waitTime, setWaitTime] = useState(1);

  return (
    <div className="RandomShow card-random">
      <h4 className="header-secondary column_1_4">Random Cue</h4>
      <p className="column_7"> Random</p>
      <label htmlFor="fade" className="column_1">
        Fade Time
      </label>
      <input type="number" name="fade" id="fade" min="0"></input>


      <input type="checkbox" className="column_7" id="fadeRandom" name="fadeRandom" value="fadeRandom" />

      <label htmlFor="wait" className="column_1">
        Wait Time
      </label>
      <input type="number" name="wait" id="wait" min="0"></input>



      <input type="checkbox" className="column_7" id="waitTimeRandom" name="waitTimeRandom" value="waitTimeRandom" />

      <label htmlFor="saturation" className="column_1">
        Saturation
      </label>
      <input
        type="number"
        name="saturation"
        id="saturation"
        min="0"
        max="100"
      ></input>

      <label htmlFor="SaturationMin" className="">
        Min:
      </label>
      <input type="number" name="SaturationMin" id="SaturationMin" min="0" max="99"></input>
      <label htmlFor="saturationMax" className="">
        Max:
      </label>
      <input type="number" name="saturationMax" id="saturationMax" min="1" max="100"></input>

      <input type="checkbox" className="column_7" id="saturationRandom" name="saturationRandom" value="saturationRandom" />



      <label htmlFor="lightness" className="column_1">
        Lightness
      </label>
      <input
        type="number"
        name="lightness"
        id="lightness"
        min="0"
        max="100"
      ></input>

      <label htmlFor="lightnessMin" className="">
        Min:
      </label>
      <input type="number" name="lightnessMin" id="lightnessMin" min="0" max="99"></input>
      <label htmlFor="lightnessMax" className="">
        Max:
      </label>
      <input type="number" name="lightnessMax" id="lightnessMax" min="1" max="100"></input>

      <input type="checkbox" className="column_7" id="lightnessRandom" name="lightnessRandom" value="lightnessRandom" />
      

      <label htmlFor="hue" className="column_1">
        Hue
      </label>
      <input type="number" name="hue" id="hue" min="0" max="360"></input>

      <label htmlFor="hueMin" className="">
        Min:
      </label>
      <input type="number" name="hueMin" id="hueMin" min="0" max="359"></input>
      <label htmlFor="hueMax" className="">
        Max:
      </label>
      <input type="number" name="hueMax" id="hueMax" min="1" max="360"></input>
      
      <input type="checkbox" className="column_7" id="hueRandom" name="hueRandom" value="hueRandom" />

      

    </div>
  );
};

export default RandomShow;
