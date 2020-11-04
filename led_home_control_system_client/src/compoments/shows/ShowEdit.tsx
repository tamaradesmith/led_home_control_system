import React, { useEffect, useState } from "react";
import { useHistory, match } from "react-router-dom";
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
  colours: [];
}

interface DetailParams {
  id: string;
}

interface Props {
  match: match<DetailParams>;
}

const ShowEdit = (props: Props) => {
  const history = useHistory();
  const match = props.match;

  const [show, setShow] = useState();

  const getShow = async () => {
    const savedShow = await ShowQuery.getOne(parseInt(match.params.id));
    setShow(savedShow);
  };

  const cancel = () => {
    history.push(`/shows/${match.params.id}`);
  };

  const handleUpdate = async (show: Show, cue: Cue) => {
    const res = await ShowQuery.update(show, cue);
    if (typeof res === "number") {
      history.push(`/shows/${res}`);
    } else {
      const message = document.querySelector<HTMLElement>(
        "#errorMessage"
      ) as HTMLElement;
      message.innerText = res;
    }
  };

  useEffect(() => {
    getShow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ShowEdit">
      <div className="card-show">
        <h2 className="card-header"> Edit Show</h2>
        <p id="errorMessage"></p>
        <ShowForm cancel={cancel} save={handleUpdate} editShow={show} />
      </div>
    </div>
  );
};

export default ShowEdit;
