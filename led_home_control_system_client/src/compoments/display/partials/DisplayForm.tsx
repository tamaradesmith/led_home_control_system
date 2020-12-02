import React, { useEffect, useState } from "react";
import ButtonCompoment from "../../partials/ButtonCompoment";

interface Props {
  cancel: (event: React.MouseEvent<HTMLElement>) => void;
  save: Function;
  display?: Display;
}

const DisplayForm = (props: Props) => {
  const { save, cancel, display } = props;

  const [formData, setFormData] = useState({
    name: "",
    ipaddress1: 0,
    ipaddress2: 0,
    ipaddress3: 0,
    ipaddress4: 0,
    led_number: 0,
  });

  const saveDisplay = () => {
    const valid = fieldValid();
    if (valid) {
      const newDisplay: Display = {
        name: formData.name,
        ipaddress: `${formData.ipaddress1}.${formData.ipaddress2}.${formData.ipaddress3}.${formData.ipaddress4}`,
        led_number: formData.led_number,
      };
      if (display) {
        newDisplay.id = display.id;
      }
      save(newDisplay);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const fieldValid = () => {
    let result = true;
    if (formData.name.length <= 0) {
      document.querySelector("#name")?.classList.add("missing_field");
      result = false;
    } else {
      document.querySelector("#name")?.classList.remove("missing_field");
    }
    if (
      formData.ipaddress1 < 0 ||
      formData.ipaddress2 < 0 ||
      formData.ipaddress3 < 0 ||
      formData.ipaddress4 < 0
    ) {
      document.querySelector("#ipaddress1")?.classList.add("missing_field");
      document.querySelector("#ipaddress2")?.classList.add("missing_field");
      document.querySelector("#ipaddress3")?.classList.add("missing_field");
      document.querySelector("#ipaddress4")?.classList.add("missing_field");
      result = false;
    } else {
      document.querySelector("#ipaddress1")?.classList.remove("missing_field");
      document.querySelector("#ipaddress2")?.classList.remove("missing_field");
      document.querySelector("#ipaddress3")?.classList.remove("missing_field");
      document.querySelector("#ipaddress4")?.classList.remove("missing_field");
    }
    if (formData.led_number < 0) {
      document.querySelector("#led_number")?.classList.add("missing_field");
      result = false;
    } else {
      document.querySelector("#led_number")?.classList.remove("missing_field");
    }
    return result;
  };

  useEffect(() => {
    if (display?.ipaddress !== undefined) {
      setFormData({
        name: display.name,
        ipaddress1: parseInt(display.ipaddress.split(".")[0]),
        ipaddress2: parseInt(display.ipaddress.split(".")[1]),
        ipaddress3: parseInt(display.ipaddress.split(".")[2]),
        ipaddress4: parseInt(display.ipaddress.split(".")[3]),
        led_number: display.led_number,
      });
    }
  }, [display]);

  return (
    <div id="form" className="DisplayForm form">
      <label htmlFor="name" className="column_1">
        {" "}
        Name:
      </label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Enter display name"
        className="column_2_4"
        onChange={handleChange}
        defaultValue={display ? display.name : ""}
      />

      <label htmlFor="led_number" className="column_1">
        {" "}
        Number of LEDs:
      </label>

      <input
        type="number"
        name="led_number"
        id="led_number"
        min="0"
        className="column_2"
        onChange={handleChange}
        value={formData.led_number}
      />

      <label htmlFor="ipaddress" className="column_1">
        {" "}
        Ip Adrress:
      </label>
      <div className="column_2_4 form_ipadress">
        <input
          type="number"
          min="0"
          max="255"
          name="ipaddress1"
          id="ipaddress1"
          onChange={handleChange}
          defaultValue={
            display?.ipaddress !== undefined
              ? display.ipaddress.split(".")[0]
              : ""
          }
        />
        <p className="">.</p>
        <input
          type="number"
          min="0"
          max="255"
          name="ipaddress2"
          id="ipaddress2"
          onChange={handleChange}
          defaultValue={
            display?.ipaddress ? display.ipaddress.split(".")[1] : ""
          }
        />
        <p className="">.</p>
        <input
          type="number"
          min="0"
          max="255"
          name="ipaddress3"
          id="ipaddress3"
          onChange={handleChange}
          defaultValue={
            display?.ipaddress ? display.ipaddress.split(".")[2] : ""
          }
        />
        <p className="">.</p>
        <input
          type="number"
          min="0"
          max="255"
          name="ipaddress4"
          id="ipaddress4"
          onChange={handleChange}
          defaultValue={
            display?.ipaddress ? display.ipaddress.split(".")[3] : ""
          }
        />
      </div>

      <div className="row5 btn-div">
        <ButtonCompoment text={'Save' } styleClass=" btn btn_save" action={saveDisplay} />
        
        <ButtonCompoment text={'Cancel'} action={cancel} styleClass={'btn btn_cancel'} />

      </div>
    </div>
  );
};

export default DisplayForm;
