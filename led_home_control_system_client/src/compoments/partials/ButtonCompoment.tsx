import React from 'react';

interface Props {
  text: string;
  action: Function;
  styleClass: string;
}
const ButtonCompoment = (props: Props) => {
  const { text, action, styleClass } = props;
  return (
    <button className={`ButtonCompoment ${styleClass}`} onClick={() => { action(); }} >
      {text}
    </button>
  );
};

export default ButtonCompoment