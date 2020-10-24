import React from "react";
import { useHistory } from "react-router-dom";
import { ColourQuery } from "../../js/request";

import ColourForm from "./partials/ColourForm";

interface Colour {
  name: string;
  hue: number;
  saturation: number;
  lightness: number;
  id?: number;
}

const ColourNew = () => {
  const history = useHistory();

  const cancel = () => {
    history.push("/colours");
  };

  const save = async (newColour: Colour) => {
    const savedColour = await ColourQuery.create(newColour);
    if (savedColour.id) {
      history.push(`/colours`);
    } else {
      const message = document.querySelector<HTMLElement>(
        "#errorMessage"
      ) as HTMLElement;
      message.innerText = savedColour;
    }
  };
  return (
    <div className="ColourNew">
      <h3 className="colour-header"> Create New Colour Form</h3>
      <p id="errorMessage"></p>
      <ColourForm save={save} cancel={cancel} />
      <div></div>
    </div>
  );
};

export default ColourNew;