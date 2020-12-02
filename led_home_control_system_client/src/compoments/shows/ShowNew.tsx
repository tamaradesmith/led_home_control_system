import React from "react";
import { useHistory } from "react-router-dom";
import { ShowQuery } from "../../js/request";

import ShowForm from "./partials/ShowForm";

const ShowNew = () => {
  const history = useHistory();

  const cancel = () => {
    history.push("/shows");
  };



  const redircetToShowPage = (id : number) => {
    history.push(`/shows/${id}`);
  };

  const handleSave = async (show: Show, cue: CueCue | PatternCue | RandomCue, type: string) => {
    const res = await ShowQuery.create(show, cue);
    if (!isNaN(parseInt(res.id))) {
      if (type !== "cue") {
        history.push(`/shows/${res.id}`);
      } else {
        return res.id;
      }
    } else {
      const message = document.querySelector<HTMLElement>(
        "#errorMessage"
      ) as HTMLElement;
      message.innerText = res.message;
    }
  };

  return (
    <div className="ShowNew">
      <div className="card-show">
        <h2 className="card-header">New Show Form</h2>
        <p id="errorMessage"></p>
        <ShowForm cancel={cancel} save={handleSave} handleRedirect={redircetToShowPage} />
      </div>
    </div>
  );
};

export default ShowNew;
