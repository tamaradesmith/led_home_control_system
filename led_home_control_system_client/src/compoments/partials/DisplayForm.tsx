import React, { useState } from "react";

interface Props {
  cancel: (event: React.MouseEvent<HTMLElement>) => void;
  save: Function;
}

const DisplayForm = (props: Props) => {
  const { save, cancel } = props;

  const [formData, setFormData] = useState({
    name: "",
    ipaddress1: -1,
    ipaddress2: -1,
    ipaddress3: -1,
    ipaddress4: -1,
    led_number: -1,
  });

  const saveDisplay = () => {
    const valid = fieldValid();
    if (valid) {
      const newDisplay = {
        name: formData.name,
        ipaddress: `${formData.ipaddress1}.${formData.ipaddress2}.${formData.ipaddress3}.${formData.ipaddress4}`,
        led_number: formData.led_number,
      };
      save(newDisplay);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        className="column_2_3"
        onChange={handleChange}
      />

      <label htmlFor="ipaddress" className="column_1">
        {" "}
        Ip Adrress:
      </label>
      <div className="column_2_3 form_ipadress">
        <input
          type="number"
          min="0"
          max="255"
          name="ipaddress1"
          id="ipaddress1"
          onChange={handleChange}
        />
        <p className="">.</p>
        <input
          type="number"
          min="0"
          max="255"
          name="ipaddress2"
          id="ipaddress2"
          onChange={handleChange}
        />
        <p className="">.</p>
        <input
          type="number"
          min="0"
          max="255"
          name="ipaddress3"
          id="ipaddress3"
          onChange={handleChange}
        />
        <p className="">.</p>
        <input
          type="number"
          min="0"
          max="255"
          name="ipaddress4"
          id="ipaddress4"
          onChange={handleChange}
        />
      </div>

      <label htmlFor="led_number" className="column_1">
        {" "}
        Number of LEDs:
      </label>
      <input
        type="number"
        name="led_number"
        id="led_number"
        className="column_2"
        onChange={handleChange}
      />
      <div className="row5 column_3">
        <button className=" btn btn_save" onClick={saveDisplay}>
          Save
        </button>
        <button className="btn btn_cancel" onClick={cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DisplayForm;
