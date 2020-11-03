import React from "react";
import { useHistory } from "react-router-dom";
import { ShowQuery } from "../../js/request";

import ShowForm from "./partials/ShowForm";

interface Show {
  name: string;
  type_id: number;
  display_id?: number;
}

interface Cue {
  id?: number;
  show_id?: number;
  wait_time: number;
  pattern_length: number;
  group_length: number;
  fade: number;
  colour: [];
}

const ShowNew = () => {
  const history = useHistory();

  const cancel = () => {
    history.push("/shows");
  };

  const handleSave = async (show: Show, cue: Cue) => {
    const res = await ShowQuery.create(show, cue);
    if (typeof res === "number") {
      history.push("/shows");
    } else {
      const message = document.querySelector<HTMLElement>(
        "#errorMessage"
      ) as HTMLElement;
      message.innerText = res;
    }
  };

  return (
    <div className="ShowNew">
      <div className="card-show">
        <p id="errorMessage"></p>

        <h2 className="card-header">New Show Form</h2>
        <ShowForm cancel={cancel} save={handleSave} />
      </div>
    </div>
  );
};

export default ShowNew;
