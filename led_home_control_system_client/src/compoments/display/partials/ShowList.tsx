import React, { useState, useEffect } from "react";

import ButtonCompoment from "../../partials/ButtonCompoment";

interface Props {
  shows: Show[];
  current: Show;
  cancel: (event: React.MouseEvent<HTMLElement>) => void;
  save: Function;
  play: Function;
}

const ShowList = (props: Props) => {
  const { shows, cancel, save, current, play } = props;

  const [currentShow, setCurrentShow] = useState<Show>();

  const playShow = async (show: Show) => {
    setCurrentShow(show);
    play(show);
  };

  const saveShow = () => {
    save(currentShow);
  };

  useEffect(() => {
    setCurrentShow(current ? current : shows[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
    <div className="ShowList">
      <p className="header-secondary"> Select A Show</p>
      {currentShow ? (
        <>
          {shows.map((show: Show) => (
            <div key={show.id} onClick={() => playShow(show)}>
              <p
                className={
                  currentShow ? currentShow.id === show.id ? "selected" : "non-selected" : 'non-selected'
                }
              >
                {show.name}
              </p>
            </div>
          ))}
        </>
      ) : null}
      <div className="btn-div">

        <ButtonCompoment text={'Save'} styleClass={"btn btn_save"} action={saveShow} />

        <ButtonCompoment text={'Cancel'} action={cancel} styleClass={'btn btn_cancel'} />

      </div>
    </div>
  );
};

export default ShowList;
