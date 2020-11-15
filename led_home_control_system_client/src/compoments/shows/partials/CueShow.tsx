import React, { useState, useEffect } from "react";
import { ShowQuery } from "../../../js/request";
import ColourCueList from "../../colours/partials/colourCueList";

import "../../../styles/cueShowStyles.css";

interface Props {
  colours: Colour[] | undefined;
  handleSave: Function;
  handleTest: Function;
  handleCueTest: Function;
  handleSaveCue: Function;
  cancel: (event: React.MouseEvent<HTMLElement>) => void;
  display: Display | undefined;
}

const noLed = {
  led_number: -1,
  colour: { id: -1, hue: -1, saturation: -1, lightness: -1, name: "" },
  fade: 0,
};

const CueShow = (props: Props) => {
  const {
    colours,
    handleSave,
    handleTest,
    handleSaveCue,
    handleCueTest,
    cancel,
    display,
  } = props;

  // Lists
  const [ledsList, setLedList] = useState([
    {
      led_number: 0,
      colour: { id: -1, hue: -1, saturation: -1, lightness: -1, name: "" },
      fade: 0,
    },
  ]);
  const [showId, setShowId] = useState(-1);

  const [colourListVisable, setColourListVisable] = useState(false);
  const [currentLed, setCurrentLed] = useState(noLed);

  const [cueList, setCuelist] = useState([
    {
      time_code: -1,

      leds: [
        {
          led_number: -1,
          fade: 0,
          colour: { lightness: -1, hue: -1, saturation: -1 },
        },
      ],
    },
  ]);

  const [timeCode, setTimeCode] = useState(0);
  const [totalTimeCode, setTotalTimeCode] = useState(0);

  const changedLedValue = () => {
    const colours: Led[] = [];
    ledsList.forEach((led) => {
      if (led.colour.id !== -1) {
        colours.push(led);
      }
    });

    const info =
      showId === -1
        ? [{ time_code: timeCode + totalTimeCode, leds: colours }]
        : [
            {
              time_code: timeCode + totalTimeCode,
              leds: colours,
              show_id: showId,
            },
          ];
    return info;
  };

  const save = async () => {
    const leds = changedLedValue();
    if (showId === -1) {
      const show = await handleSave(leds);
      if (show) {
        setShowId(show);
      } else {
        console.log(leds, "what?");
      }
    } else {
      const cueSaved = await handleSaveCue(showId, leds);
      setTotalTimeCode(timeCode + totalTimeCode);
      setTimeCode(0);
      getCues();
    }
  };

  const test = (type: string) => {
    const leds = changedLedValue();
    if (type === "show") {
      const allCues = cueList;
      allCues.push(leds[0]);
      handleCueTest(allCues);
    } else {
      handleTest(leds);
    }
  };

  const cancelColour = () => {
    setColourListVisable(colourListVisable ? false : true);
    setCurrentLed(noLed);
  };

  const handleChangeFade = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = parseInt(event.target.id.slice(5));
    const ledsFade = [...ledsList];
    ledsFade[id].fade = parseInt(event.target.value);
    setLedList(ledsFade);
  };

  const handleChangeTimeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setTimeCode(value);
  };

  const selectColour = (colour: Colour) => {
    colour.id = !colour.id ? -1 : colour.id;
    ledsList[currentLed.led_number].colour = colour;
    setColourListVisable(colourListVisable ? false : true);
    setCurrentLed(noLed);
  };

  const handleOpenColourList = (selectedLed: {
    led_number: number;
    colour: Colour;
    fade: number;
  }) => {
    setColourListVisable(colourListVisable ? false : true);
    setCurrentLed(selectedLed);
  };

  const getCues = async () => {
    const cues = await ShowQuery.getOne(showId);
    setCuelist(cues.cue);
    createLedList();
  };

  const createLedList = () => {
    setLedList([
      {
        led_number: 0,
        colour: { id: -1, hue: -1, saturation: -1, lightness: -1, name: "" },
        fade: 0,
      },
    ]);
    let i = 0;
    const result = [];
    if (display) {
      while (i < display.led_number) {
        result.push({
          led_number: i,
          colour: { name: "", id: -1, hue: -1, saturation: -1, lightness: -1 },
          fade: 0,
        });
        i++;
      }
    }
    setLedList(result);
  };

  useEffect(() => {
    if (display) {
      createLedList();
    }
  }, [display]);

  useEffect(() => {
    if (showId !== -1) {
      getCues();
    }
  }, [showId]);

  return (
    <div>
      <div className="CueShow card-pattern">
        <h4 className="header-secondary column_1_4">Cue Show</h4>

        <label htmlFor="time_code" className="column_1">
          Wait Time:{" "}
        </label>
        <input
          type="number"
          id="time_code"
          min="0"
          value={timeCode}
          onChange={handleChangeTimeCode}
        />

        <div className="column_1_5 led-cue-div">
          {ledsList.map((led) => (
            <div key={led.led_number} className="led-div">
              <div
                className="swatch-led"
                style={
                  led.colour.id !== undefined
                    ? {
                        background: `hsl(${led.colour.hue}, ${led.colour.saturation}%, ${led.colour.lightness}%)`,
                      }
                    : { border: "0px solid black" }
                }
                onClick={() => {
                  handleOpenColourList(led);
                }}
              >
                {" "}
              </div>
              <p>led {led.led_number} </p>
              <label htmlFor={`fade-${led.led_number}`}>Fade:</label>
              <input
                type="number"
                id={`fade-${led.led_number}`}
                min="0"
                max="99"
                className="led-number"
                onChange={handleChangeFade}
                value={led.fade}
              />
            </div>
          ))}
        </div>

        <div className="show-btn-div column_1_5">
          <button
            className="btn-big btn_save"
            onClick={() => {
              test("show");
            }}
          >
            {" "}
            Test Show
          </button>
          <button
            className="btn-big btn_save"
            onClick={() => {
              test("cue");
            }}
          >
            {" "}
            Test Cue
          </button>
          <button className="btn btn_save" onClick={save}>
            {" "}
            Save
          </button>
          <button className="btn btn_cancel" onClick={cancel}>
            {" "}
            Cancel
          </button>
        </div>
      </div>
      <div className={colourListVisable ? "" : "hidden"}>
        <ColourCueList
          colours={colours}
          cancel={cancelColour}
          selectColour={selectColour}
        />
      </div>

      <div>
        {cueList[0].time_code !== -1 ? (
          <>
            {cueList.map((cue, index) => (
              <div key={index}>
                <p className="cue-name">Cue {index + 1}</p>
                <div className="cue-list">
                  <p>Wait Time: {cue.time_code}</p>
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
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default CueShow;
