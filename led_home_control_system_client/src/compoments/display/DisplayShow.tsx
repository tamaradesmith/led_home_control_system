import React, { useEffect, useState } from "react";
import { DisplayQuery } from "../../js/request";

import { match } from "react-router-dom";

interface DetailParams {
  id: string;
}

interface DetailsProps {
  required: string;
  match: match<DetailParams>;
}

const DisplayShow = (props: DetailsProps) => {
  const [display, setDisplay] = useState({ name: "" });
  const match = props.match;

  const getDisplay = async () => {
    const displayInfo = await DisplayQuery.getOne(match.params.id);
    setDisplay(displayInfo);
  };

  useEffect(() => {
    getDisplay();
  }, []);

  return (
    <div>
      <h4> {display.name}</h4>
      <p>Show: Move show Red</p>
      <p>Status: on</p>
      <p> change show: "drop down of avablie shows"</p>
      <p> change default show: "dropdown of avaible shows"</p>
      <button>Edit</button> <button> Delete</button>
    </div>
  );
};

export default DisplayShow;
