import React, { useEffect, useState } from "react";

import { useHistory, match, RouteComponentProps } from "react-router-dom";
import { ColourQuery } from "../../js/request";

import ColourForm from "./partials/ColourForm";

interface Display {
  name: string;
  ipaddress: string;
  led_number: number;
  id?: number;
}

interface Colour {
  name: string;
  hue: number;
  saturation: number;
  lightness: number;
  id?: number;
}

interface DetailParams {
  id: string;
}

interface Props {
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
    setColour(savedColour);
  };

  const save = async (updatedColour: Colour) => {
    const result = await ColourQuery.update(
      parseInt(match.params.id),
      updatedColour
    );
    if (result.id) {
      history.push("/colours");
    }
  };

  const cancel = () => {
    history.push("/colours");
  };

  useEffect(() => {
    getColour();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ColourEdit">
      <div className="card-colour">

      <h3 className="card-header"> Edit Colour Form</h3>
      <ColourForm
        save={save}
        cancel={cancel}
        editColour={colour}
        />
        </div>
    </div>
  );
};

export default ColourEdit;
