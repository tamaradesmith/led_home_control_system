import React, { useState, useEffect } from "react";
import ColourList from "../../colours/partials/ColourList";

// interface SaveCue {
//   wait_time: number;
//   pattern_length: number;
//   fade: number;
//   colours: number[];
// }

// interface UpdateCue {
//   id: number;
//   show_id: number;
//   wait_time: number;
//   pattern_length: number;
//   fade: number;
//   colours: number[];
// }

interface Props {
  colours: Colour[] | undefined;
  handleSave: Function;
  handleTest: Function;
  updateShow: Function;
  cancel: (event: React.MouseEvent<HTMLElement>) => void;
  editPattern?: PatternShow;
}

const PatternShow = (props: Props) => {
  const { colours, handleSave, handleTest, cancel, editPattern, updateShow } = props;

  const [colourListVisable, setColourListVisable] = useState(false);
  const [selectedColours, setSelectedColours] = useState<Colour[]>([]);

  const [orginalColours, setOrginalColours] = useState<Colour[] | []>([]);

  const [waitTime, setWaitTime] = useState(1);
  const [fade, setFade] = useState(1);

  const handleColourSelection = () => {
    const message = document.querySelector(
      "#colourMessage"
    ) as HTMLInputElement;
    message.innerText = "";

    setOrginalColours([...selectedColours]);
    setColourListVisable(colourListVisable ? false : true);
  };

  const addColour = (colour: Colour) => {
    setSelectedColours((selectedColours) => [...selectedColours, colour]);
  };

  const removeColour = (colourIndex: number) => {
    setSelectedColours(
      selectedColours.filter((item, index) => colourIndex !== index)
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    switch (id) {
      case "waitTime":
        setWaitTime(parseInt(value));
        break;
      case "fade":
        setFade(parseInt(value));
        break;
      default:
        break;
    }
  };

  const getCueInfo = (action: string) => {
    let coloursId;
    if (selectedColours.length > 1) {
      coloursId = selectedColours.map((colour) => {
        return colour.id;
      });
      let cue;
      switch (action) {
        case 'save':
          cue = {
            colours: coloursId,
            wait_time: waitTime,
            pattern_length: coloursId.length,
            fade: fade,
          };
          break;
        case 'update':
          cue = {
            id: editPattern && editPattern.cue ? editPattern.cue.id : -1,
            show_id: editPattern?.id,
            colours: coloursId,
            wait_time: waitTime,
            pattern_length: coloursId.length,
            fade: fade,
          };
          break;
        default:
          break;
      }

      return cue;
    } else {
      const message = document.querySelector(
        "#colourMessage"
      ) as HTMLInputElement;
      message.innerText = "please pick two or more colours";
      return false;
    }
  };

  const test = () => {
    const showInfo = getCueInfo('save');
    if (showInfo !== false) {
      handleTest(showInfo);
    }
  };

  const save = async () => {
    const cue = getCueInfo('save');
    handleSave(cue);
  };

  const update = async () => {
    const cue = getCueInfo('update');
    updateShow(cue);
  };

  const cancelColour = () => {
    setSelectedColours(orginalColours);
    setOrginalColours([]);
    setColourListVisable(false);
  };

  const saveColours = () => {
    setOrginalColours([...selectedColours]);
    setColourListVisable(false);
  };

  useEffect(() => {
    if (editPattern && editPattern.cue) {
      setWaitTime(editPattern.cue.wait_time);
      setFade(editPattern.cue.fade);
      setSelectedColours(editPattern.cue?.colours);
    }
  }, [editPattern]);

  return (
    <div className="PatternShow card-pattern">
      <h4 className="header-secondary column_1_4">Pattern Show</h4>

      <label htmlFor="colour" className="column_1">
        {" "}
        colour:
      </label>
      <p className="column_2_3" onClick={handleColourSelection}>
        Select Colour
      </p>
      <div className="colours-selected-div">
        {selectedColours.map((colour: Colour, index) => (
          <div
            key={index}
            className="swatch-square"
            style={{
              background: `hsl(${colour.hue}, ${colour.saturation}%, ${colour.lightness}%)`,
            }}
            onClick={() => {
              removeColour(index);
            }}
          ></div>
        ))}
        <p id="colourMessage"></p>{" "}
      </div>

      <label htmlFor="fade" className="column_1">
        {" "}
        fade time:
      </label>
      <input
        type="number"
        id="fade"
        className="column_2"
        onChange={handleChange}
        value={fade}
      />

      <label htmlFor="waitTime" className="column_1">
        {" "}
        wait time:
      </label>
      <input
        type="number"
        id="waitTime"
        min="1"
        className="column_2"
        onChange={handleChange}
        value={waitTime}
      />

      <div className="show-btn-div column_1_5">
        <button className="btn btn_save" onClick={test}>
          {" "}
          Test
        </button>
        <button className="btn btn_save" onClick={editPattern ? update : save}>
          {" "}
          Save
        </button>
        <button className="btn btn_cancel" onClick={cancel}>
          {" "}
          Cancel
        </button>
      </div>
      <div className={colourListVisable ? "" : "hidden"}>
        <ColourList
          colours={colours}
          selected={selectedColours}
          addColour={addColour}
          removeColour={removeColour}
          cancel={cancelColour}
          saveColours={saveColours}
        />
      </div>
    </div>
  );
};

export default PatternShow;
