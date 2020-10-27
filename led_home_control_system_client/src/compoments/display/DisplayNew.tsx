import React from "react";
import { useHistory } from "react-router-dom";

import { DisplayQuery } from "../../js/request";

import DisplayForm from "./partials/DisplayForm";


interface Display {
  name: string;
  ipaddress: string;
  led_number: number;
  id?: number;
}

const DisplayNew = () => {
  const history = useHistory();

  const save = async (
    newDisplay: Display
  ) => {
    const saveDisplays = await DisplayQuery.create(newDisplay);
    if (saveDisplays.name) {
      history.push(`/displays/${saveDisplays.id}`);
    } else {
      const message = document.querySelector<HTMLElement>(
        "#errorMessage"
      ) as HTMLElement;
      message.innerText = saveDisplays;
    }
  };

  const cancel: (event: React.MouseEvent<HTMLElement>) => void = () => {
    history.push("/displays");
  };
  
  return (
    <div className="DisplayNew">
      <p id="errorMessage"></p>
      <h2> Configure New Display</h2>
      <DisplayForm save={save} cancel={cancel} />
    </div>
  );
};

export default DisplayNew;
