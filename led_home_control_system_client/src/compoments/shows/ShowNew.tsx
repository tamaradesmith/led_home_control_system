import React from "react";
import { useHistory } from "react-router-dom";

import ShowForm from "./partials/ShowForm";

const ShowNew = () => {
  const history = useHistory();

  const cancel = () => {
    history.push("/shows");
  };

  const handleSave = () => {};


  return (
    <div className="ShowNew">
      <div className="card-show">
        <h2 className="card-header">New Show Form</h2>
        <ShowForm cancel={cancel} save={handleSave}  />
      </div>
    </div>
  );
};

export default ShowNew;
