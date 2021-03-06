import React, { useState, useEffect } from "react";
import { ShowQuery } from "../../../js/request";

import ColourCueList from "../../colours/partials/colourCueList";
import CueDisplay from './CueDisplay';

import "../../../styles/cueShowStyles.css";
import ButtonCompoment from "../../partials/ButtonCompoment";

interface Props {
  colours: Colour[] | undefined;
  handleSave: Function;
  handleTest: Function;
  handleCueTest: Function;
  handleSaveCue: Function;
  cancel: (event: React.MouseEvent<HTMLElement>) => void;
  display: Display | undefined;
  editCue?: CueShow;
  updateShow: Function;
  handleRedirect: Function;
  handleCueUpdate: Function;
}

const noLed = {
  led_number: -1,
  led_colour: -1,
  colour: { id: -1, hue: -1, saturation: -1, lightness: 100, name: "" },
  fade: 0,
};

const CueShow = (props: Props) => {
  const {
    colours,
    handleSave,
    handleTest,
    handleSaveCue,
    handleCueTest,
    // updateShow,
    cancel,
    display,
    editCue,
    handleRedirect,
    handleCueUpdate
  } = props;

  // Lists
  const [ledsList, setLedList] = useState<CueLeds[]>([noLed]);
  const [showId, setShowId] = useState(-1);

  const [colourListVisable, setColourListVisable] = useState(false);
  const [currentLed, setCurrentLed] = useState(noLed);

  const [cueList, setCuelist] = useState<CueCue[]>([{ time_code: -1, leds: [noLed] }]);

  const [timeCode, setTimeCode] = useState(0);
  const [editCueId, setEditCueId] = useState<number | undefined>(-1);

  const [linkedLeds, setLinkedLeds] = useState<CueLeds[] | []>([]);
  const [delectLed, setDelectLed] = useState<CueLeds[] | []>([]);

  const changedLedValue = (action: string) => {
    const ledColours: CueLeds[] = [];
    ledsList.forEach((led) => {
      if (led.colour.id !== -1) {
        switch (action) {
          case 'save':
            ledColours.push({
              fade: led.fade,
              led_colour: led.led_colour,
              led_number: led.led_number,
              colour: led.colour,
            });
            break;
          case 'update':
            ledColours.push({
              fade: led.fade,
              led_colour: led.led_colour,
              led_number: led.led_number,
              colour: led.colour,
              id: led.id,
              cue_show_id: editCueId,
            });
            break;
          default:
            break;
        }
      }
    });
    return ledColours;
  };

  const cueInfo = (action: string, leds: CueLeds[]) => {
    let info;
    switch (action) {
      case 'save':
        info = [{ time_code: timeCode, leds: leds }];
        break;
      case 'update':
        info = [{
          time_code: timeCode,
          leds: leds,
          show_id: showId,
          id: editCueId,
        }];
        break;
      default:
        info = [{
          time_code: timeCode,
          leds: leds,
          show_id: showId,
        }];
        break;
    }
    return info;
  };

  const save = async () => {
    const leds = changedLedValue('save');
    const show = showId === -1 ? cueInfo('save', leds) : cueInfo('cue', leds);
    if (showId === -1) {
      const newShow = await handleSave(show);
      if (!isNaN(parseInt(newShow))) {
        setShowId(newShow);
        clearLinedList();
      } else {
        console.error("saved Cue ", newShow);
      }
    } else {
      const newCue = await handleSaveCue(show[0]);
      if (!isNaN(parseInt(newCue))) {
        getCues();
        clearLinedList();
      } else {
        console.error("saved Cue ", newCue);
      }
    }
  };

  const updateCue = async () => {
    const leds = changedLedValue('update');
    const cue = cueInfo('update', leds);
    const updatedLeds = await handleCueUpdate(cue, showId, delectLed);
    if (!isNaN(parseInt(updatedLeds.id))) {
      setDelectLed([])
      getCues();
    } else {
      console.error("saved Cue ", updatedLeds);
    }
  };

  const saveAs = async () => {
    const leds = changedLedValue('save');
    if (showId !== -1) {
      const show = cueInfo('cue', leds);
      const newCue = await handleSaveCue(show[0]);
      if (!isNaN(parseInt(newCue))) {
        getCues();
        clearLinedList();
      } else {
        console.error("saved Cue ", newCue);
      }
    } else {
      console.error('no show id');
    }
  };

  const test = (type: string) => {
    const leds = changedLedValue('save');
    if (type === "show") {
      const allCues = [...cueList];
      allCues.push({ time_code: timeCode, leds: leds });
      handleCueTest(allCues);
    } else {
      handleTest([{ leds: leds }]);
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
    if (linkedLeds.length > 0) {
      linkedLeds.forEach(led => {
        ledsFade[led.led_number].fade = parseInt(event.target.value);
      });
    }
    setLedList(ledsFade);
  };

  const handleChangeTimeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setTimeCode(value);
  };

  const selectColour = (colour: Colour) => {
    colour.id = !colour.id ? -1 : colour.id;
    ledsList[currentLed.led_number].colour = colour;
    ledsList[currentLed.led_number].led_colour = colour.id;
    if (linkedLeds.length > 0) {
      linkedLeds.forEach(led => {
        ledsList[led.led_number].colour = colour;
        ledsList[led.led_number].led_colour = colour.id;
      });
    }
    setColourListVisable(colourListVisable ? false : true);
    setCurrentLed(noLed);
  };

  const handleOpenColourList = (selectedLed: CueLeds) => {
    setColourListVisable(colourListVisable ? false : true);
    setCurrentLed(selectedLed);
  };

  const getCues = async () => {
    const cues = await ShowQuery.getOne(showId);
    setCuelist(cues.cue);
    createLedList();
  };

  const createLedList = () => {
    const result = createList();
    setLedList(result);
  };

  const createList = () => {
    let i = 0;
    const result = [];
    if (display) {
      while (i < display.led_number) {
        result.push({
          led_number: i,
          led_colour: -1,
          colour: { name: "", id: -1, hue: -1, saturation: -1, lightness: 100 },
          fade: 0,
        });
        i++;
      }
    } else {
      result.push(noLed);
    }
    return result;
  };

  const addLedToDelete = (led: CueLeds) => {
    clearLedInfo(led);
    setDelectLed([...delectLed, led]);
  };

  const clearLedInfo = (led: CueLeds) => {
    const newList = [...ledsList];
    newList[led.led_number] = { ...noLed };
    newList[led.led_number].led_number = led.led_number;
    setLedList(newList);
  };

  const editCueLeds = async (index: number) => {
    const list = createList();
    const cueInfo = [...cueList[index].leds];
    cueInfo.forEach(aLed => {
      list[aLed.led_number] = Object.assign({}, aLed);
    });
    setLedList([...list]);
    setTimeCode(cueList[index].time_code);
    setEditCueId(cueList[index].id);
  };

  const delectCue = async (cueId: number) => {
    const deletedCue = await ShowQuery.deleteCue(showId, cueId);
    if (deletedCue === 200) {
      getCues();
    } else {
      console.error(delectCue);
    }
  };

  const addToLinked = (addLed: CueLeds) => {
    let add = true;
    const newList = [...linkedLeds];
    if (linkedLeds.length !== 0) {
      linkedLeds.forEach((led, index) => {
        if (addLed.led_number === led.led_number) {
          add = false;
          setLinkedLeds(newList);
        }
      });
      if (add) {
        newList.push(addLed);
        setLinkedLeds(newList);
      } else {
        const filtered = newList.filter((value, index, arr) => {
          return value.led_number !== addLed.led_number;
        });
        setLinkedLeds(filtered);
      }
    } else {
      setLinkedLeds([addLed]);
    }
  };

  const linedAll = () => {
    const allCheckBoxes = document.querySelectorAll("input[type='checkbox']") as NodeListOf<HTMLInputElement>;
    allCheckBoxes.forEach(checkBox => {
      if (checkBox && !checkBox.checked) checkBox.checked = true;
    });
    setLinkedLeds([...ledsList]);
  };
  const clearLinedList = () => {
    const allCheckBoxes = document.querySelectorAll("input[type='checkbox']") as NodeListOf<HTMLInputElement>;
    allCheckBoxes.forEach(checkBox => {
      if (checkBox && checkBox.checked) checkBox.checked = false;
    });
    setLinkedLeds([]);
  };
  // USE EFFECT

  useEffect(() => {
    if (editCue) {
      if (editCue.id) {
        setShowId(editCue.id);
      }
    }
  }, [editCue]);

  useEffect(() => {
    if (display) {
      createLedList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display]);

  useEffect(() => {
    if (showId !== -1) {
      getCues();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showId]);

  return (
    <div>
      <div className="CueShow card-pattern">
        <h4 className="header-secondary column_1_4">Cue Show</h4>

        <label htmlFor="time_code" className="column_1">
          Time Code:{" "}
        </label>
        <input
          type="number"
          id="time_code"
          min="0"
          value={timeCode}
          onChange={handleChangeTimeCode}
        />
        <ButtonCompoment text={'Links All'} styleClass={'btn_big btn_cancel'} action={linedAll} />

        <ButtonCompoment text={'clear links'} styleClass={'btn_big btn_cancel'} action={clearLinedList} />

        <div className="column_1_5 led-cue-div">
          {ledsList.map((led) => (
            <div key={led.led_number} className="led-div">
              <p className="led-header">led {led.led_number} </p>
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
              </div>
              {led.colour.name ? (
                <p className="colour-name">
                  {led.colour.name}

                </p>
              ) : <p className="colour-no-name"> none </p>}
              <label htmlFor={`fade-${led.led_number}`}>Fade: </label>
              <input
                type="number"
                id={`fade-${led.led_number}`}
                min="-99"
                max="99"
                className="led-number"
                onChange={handleChangeFade}
                value={led.fade}
              />
              <div >
                <input id={`check-${led.led_number}`} type='checkbox' onChange={() => { addToLinked(led); }} />
                {led.id ? (

                  <ButtonCompoment text={'delete'} action={() => (addLedToDelete(led))} styleClass={'btn btn_cancel'} />
                ) : (
                    <ButtonCompoment text={'clear'} action={() => (clearLedInfo(led))} styleClass={'btn btn_cancel'} />)

                }
              </div>
            </div>
          ))}
        </div>

        <div className="show-btn-div column_1_5">
          <ButtonCompoment text={'Test Show'}
            action={() => { test("show"); }}
            styleClass={'btn_big btn_save'} />

          <ButtonCompoment text={'Test Cue'}
            action={() => { test("cue"); }}
            styleClass={'btn_big btn_save'} />

          <ButtonCompoment text={'Update Cue'}
            action={() => { updateCue(); }}
            styleClass={'btn btn_x_big btn_save'} />
          {editCue ? (
            <ButtonCompoment text={'Save As'}
              action={() => { saveAs(); }}
              styleClass={'btn_big btn_save'} />
          ) : <ButtonCompoment text={'Save'}
            action={() => { save(); }}
            styleClass={'btn btn_save'} />}


          <ButtonCompoment text={'Finish'}
            action={() => { handleRedirect(showId); }}
            styleClass={'btn btn_save'} />

          <ButtonCompoment text={'Cancel'} action={cancel} styleClass={'btn btn_cancel'} />
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
          <div className='div-divide'>
            <p className='cue-list-header'> Cue List</p>
            {cueList.map((cue, index) => (
              <CueDisplay key={index} index={index} cue={cue} editCue={editCueLeds} delectCue={delectCue} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CueShow;
