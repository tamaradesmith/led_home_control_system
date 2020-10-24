import React, { useEffect, useState } from "react";

import { useHistory, match } from "react-router-dom";
import { ColourQuery } from "../../js/request";

import ColourForm from "./partials/ColourForm";

interface DetailParams {
  id: string;
}

interface Props {
  required: string;
  match: match<DetailParams>;
}

const ColourEdit = (props: Props) => {
  const history = useHistory();
  const match = props.match;

  const [colour, setColour] = useState({
    name: "",
    hue: -1,
    saturation: -1,
    lightness: -1,
  });

  const getColour = async () => {
    const savedColour = await ColourQuery.edit(parseInt(match.params.id));
    console.log("getColour -> savedColour", savedColour);
    setColour(savedColour)
  };

  const save = () => {
    console.log("update colour");
  };
  const cancel = () => {
    history.push("/colours");
  };

  useEffect(() => {
    getColour();
  }, []);

  return (
    <div className="ColourEdit">
      <h3 className="colour-header"> Edit Colour Form</h3>
      <ColourForm save={save} cancel={cancel} editColour={colour} />
    </div>
  );
};

export default ColourEdit;
