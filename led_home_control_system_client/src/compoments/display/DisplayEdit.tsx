import React, { useEffect, useState } from "react";
import { match, useHistory } from "react-router-dom";

import { DisplayQuery } from "../../js/request";

import DisplayForm from "./partials/DisplayForm";

interface Display {
  name: string;
  ipaddress: string;
  led_number: number;
  id?: number;
}

interface DetailParams {
  id: string;
}

interface DetailProps {
  required: string;
  match: match<DetailParams>;
}

const DisplayEdit = (props: DetailProps) => {
  const history = useHistory();
  const match = props.match;

  const [display, setDisplay] = useState({
    name: "",
    ipaddress: "",
    id: -1,
    led_number: -1,
  });

  const getDisplay = async () => {
    const displayInfo = await DisplayQuery.edit(parseInt(match.params.id));
    console.log("getDisplay -> displayInfo", displayInfo);
    setDisplay(displayInfo);
  };

  const save = async (displayInfo: Display) => {
    const result = await DisplayQuery.update(displayInfo);
    if (result.name) {
      history.push(`/displays/${result.id}`);
    } else {
      const message = document.querySelector<HTMLElement>(
        "#errorMessage"
      ) as HTMLElement;
      message.innerText = result;
    }
  };

  const cancel: (event: React.MouseEvent<HTMLElement>) => void = () => {
    history.push(`/displays/${match.params.id}`);
  };

  useEffect(() => {
    getDisplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="DisplayEdit">
      <p> DisplayEdit </p>
      <DisplayForm display={display} cancel={cancel} save={save} />
    </div>
  );
};

export default DisplayEdit;
