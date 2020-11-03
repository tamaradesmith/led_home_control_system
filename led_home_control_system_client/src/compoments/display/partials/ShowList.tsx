import React, { useState } from "react";
interface Show {
  name: string;
  id: number;
  display_id: number;
}

interface Props {
  shows: Show[];
  current: Show | null;
  cancel: (event: React.MouseEvent<HTMLElement>) => void;
  save: Function;
}

const ShowList = (props: Props) => {
  const { shows, cancel, save, current } = props;
  const [currentShow, setCurrentShow] = useState(current);

  const playShow = (show: Show) => {
    setCurrentShow(show);
  };
  const saveShow = () => {
    save(currentShow);
  };

  return (
    <div className="ShowList">
      <p> Select A Show</p>
      {shows.map((show: Show) => (
        <div key={show.id} onClick={() => playShow(show)}>
          {show.name}
        </div>
      ))}
      <div className="btn-div">
        <button className="btn btn_save" onClick={saveShow}>
          Save
        </button>
        <button className="btn btn_cancel" onClick={cancel}>
          {" "}
          cancel
        </button>
      </div>
    </div>
  );
};

export default ShowList;
