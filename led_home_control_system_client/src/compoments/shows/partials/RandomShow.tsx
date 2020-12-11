import React, { useEffect, useState } from "react";

interface Props {
  cancel: (event: React.MouseEvent<HTMLElement>) => void;
  handleSave: Function;
  handleTest: Function;
  handleUpdate: Function;
  editRandom?: RandomShow;
}

const RandomShow = (props: Props) => {
  const { cancel, handleSave, handleTest, handleUpdate, editRandom, } = props;

  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const [fade, setFade] = useState(1);
  const [waitTime, setWaitTime] = useState(1);
  const [hue, setHue] = useState({ max: 360, min: 0 });

  const [waitTimeRandom, setWaitTimeRandom] = useState(false);
  const [fadeRandom, setFadeRandom] = useState(false);
  const [hueRandom, setHueRandom] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    switch (id) {
      case "wait":
        setWaitTime(parseInt(value));
        break;
      case "saturation":
        setSaturation(parseInt(value));
        break;
      case "lightness":
        setLightness(parseInt(value));
        break;
      case "fade":
        setFade(parseInt(value));
        break;
      case "hueMin":
        checkHue(parseInt(value), "min");
        break;
      case "hueMax":
        checkHue(parseInt(value), "max");
        break;
      default:
        break;
    }
  };

  let hueDelay;
  const checkHue = (value: number, key: string) => {
    if (key === 'max') {
      setHue({ max: value, min: hue.min })
    } else {
      setHue({max: hue.max, min: value})
    }
    
    const check = () => {
    const newHue = Object.assign({}, hue);
      switch (key) {
        case "min":
          if (value >= newHue.max) {
            newHue.max = value + 1;
          }
          newHue.min = value;
          break;
        case "max":
          if (value <= newHue.min) {
            newHue.min = value - 1;
          }
          newHue.max = value;
          break;
        default:
          break;
      }
      setHue(newHue);
      return 'checked'
    };
    hueDelay = setTimeout(check, 1000);
  };

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    switch (target.id) {
      case "hueRandom":
        if (hueRandom) {
          setHue({ max: 360, min: 0 });
        }
        setHueRandom(hueRandom ? false : true);

        break;
      case "fadeRandom":
        setFadeRandom(fadeRandom ? false : true);
        break;
      case "waitTimeRandom":
        setWaitTimeRandom(waitTimeRandom ? false : true);
        break;
      default:
        break;
    }
  };

  const getCueInfo = (action: string) => {
    let cue;
    switch (action) {
      case 'save':
        cue = {
          saturation,
          lightness,
          fade,
          fade_random: fadeRandom,
          wait_time: waitTime,
          wait_random: waitTimeRandom,
          hue_max: hue.max,
          hue_min: hue.min,
        };
        break;
      case 'update':
        if (editRandom && editRandom.cue) {
          cue = {
            id: editRandom.cue.id,
            show_id: editRandom.cue.show_id,
            saturation,
            lightness,
            fade,
            fade_random: fadeRandom,
            wait_time: waitTime,
            wait_random: waitTimeRandom,
            hue_max: hue.max,
            hue_min: hue.min,
          };
        };
        break;
      default:
        break;
    }
    return cue;
  };

  const test = () => {
    const cue = getCueInfo('save');
    handleTest(cue);
  };

  const save = () => {
    const cue = getCueInfo('save');
    handleSave(cue);
  };

  const update = () => {
    const cue = getCueInfo('update');
    handleUpdate(cue);
  };

  useEffect(() => {
    if (editRandom) {
      const cue = editRandom.cue;
      if (cue) {
        setFade(cue.fade);
        setFadeRandom(cue.fade_random);
        setHue({ max: cue.hue_max, min: cue.hue_min });
        setLightness(cue.lightness);
        setSaturation(cue.saturation);
        setWaitTime(cue.wait_time);
        setWaitTimeRandom(cue.wait_random);
        if (cue.hue_max !== 360 || cue.hue_min !== 0) {
          setHueRandom(true);
        }
      }
    }
  }, [editRandom]);

  return (
    <div className="RandomShow card-random">
      <h4 className="header-secondary column_1_4">Random Cue</h4>
      <p className="column_7"> Random</p>

      <label htmlFor="fade" className="column_1">
        {!fadeRandom ? <>Fade Time: </> : <>Max Fade Time:</>}
      </label>

      <input
        type="number"
        name="fade"
        id="fade"
        value={fade}
        onChange={handleChange}
      />

      <input
        type="checkbox"
        className="column_7 random_checkbox"
        id="fadeRandom"
        name="fadeRandom"
        value="fadeRandom"
        onChange={handleCheck}
        checked={fadeRandom}
      />

      <label htmlFor="wait" className="column_1">
        {!waitTimeRandom ? <>Wait Time: </> : <>Max Wait Time:</>}
      </label>
      <input
        type="number"
        name="wait"
        id="wait"
        min="0"
        value={waitTime}
        onChange={handleChange}
      />

      <input
        type="checkbox"
        className="column_7 random_checkbox"
        id="waitTimeRandom"
        name="waitTimeRandom"
        value="waitTimeRandom"
        onChange={handleCheck}
        checked={waitTimeRandom}
      />

      <label htmlFor="saturation" className="column_1">
        Saturation
      </label>
      <input
        type="number"
        name="saturation"
        id="saturation"
        min="0"
        max="100"
        value={saturation}
        onChange={handleChange}
      />

      <label htmlFor="lightness" className="column_1">
        Lightness
      </label>
      <input
        type="number"
        name="lightness"
        id="lightness"
        min="0"
        max="100"
        value={lightness}
        onChange={handleChange}
      />
      <p className="column_1">
        {" "}
        {!hueRandom ? <>Hue Unlimited: </> : <>Hue Limits: </>}{" "}
      </p>

      {hueRandom ? (
        <>
          <label htmlFor="hueMin" className="">
            Min:
          </label>
          <input
            type="number"
            name="hueMin"
            id="hueMin"
            min="0"
            max="359"
            onChange={handleChange}
            value={hue.min}
          />

          <label htmlFor="hueMax" className="">
            Max:
          </label>
          <input
            type="number"
            name="hueMax"
            id="hueMax"
            min="1"
            max="360"
            onChange={handleChange}
            value={hue.max}
          />
        </>
      ) : null}
      <input
        type="checkbox"
        className="column_7 random_checkbox"
        id="hueRandom"
        name="hueRandom"
        value="hueRandom"
        onChange={handleCheck}
        checked={hueRandom}
      />
      <div className="show-btn-div column_1_7">
        <button className="btn btn_save" onClick={test}>
          {" "}
          Test
        </button>
        <button className="btn btn_save" onClick={editRandom ? update : save}>
          {" "}
          Save
        </button>
        <button className="btn btn_cancel" onClick={cancel}>
          {" "}
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RandomShow;
