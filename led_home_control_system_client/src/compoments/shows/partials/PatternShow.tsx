import React, { useState } from "react";
import ColourList from "../../colours/partials/ColourList";

interface Colour {
  name: string;
  hue: number;
  saturation: number;
  lightness: number;
  id?: number;
}

interface Props {
  colours: Colour[] | undefined;
  handleSave: Function;
  handleTest: Function;
  cancel: (event: React.MouseEvent<HTMLElement>) => void;
}

const PatternShow = (props: Props) => {
  const { colours, handleSave, handleTest, cancel } = props;

  const [colourListVisable, setColourListVisable] = useState(false);
  const [selectedColours, setSelectedColours] = useState<Colour[]>([]);

  const [orginalColours, setOrginalColours] = useState<Colour[] | []>([]);

  const [waitTime, setWaitTime] = useState(1);
  const [groupSize, setGroupSize] = useState(1);
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
      case "groupSize":
        setGroupSize(parseInt(value));
        break;
      case "fade":
        setFade(parseInt(value));
        break;
      default:
        break;
    }
  };

  const getCueInfo = () => {
    let coloursId;

    if (selectedColours.length > 1) {
      coloursId = selectedColours.map((colour) => {
        return colour.id;
      });
      return {
        colours: coloursId,
        wait_time: waitTime,
        group_length: groupSize,
        pattern_length: coloursId.length * groupSize,
        fade: fade,
      };
    } else {
      const message = document.querySelector(
        "#colourMessage"
      ) as HTMLInputElement;
      message.innerText = "please pick two or more colours";
    }
  };

  const test = () => {
    const showInfo = getCueInfo();
    handleTest(showInfo);
  };

  const save = () => {
    const cue = getCueInfo();
    handleSave(cue);
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

  return (
    <div className="PatternShow card-pattern">
      <h4 className="header-secondary column_1_4">PatternShow</h4>

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

      <label htmlFor="groupSize" className="column_1">
        {" "}
        group number:
      </label>
      <input
        type="number"
        id="groupSize"
        min="1"
        className="column_2"
        onChange={handleChange}
        value={groupSize}
      />

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
        <button className="btn btn_save" onClick={save}>
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
