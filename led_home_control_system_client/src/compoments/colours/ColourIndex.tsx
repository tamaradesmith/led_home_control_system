import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { ColourQuery } from "../../js/request";

interface Colour {
  name: string;
  hue: number;
  saturation: number;
  lightness: number;
  id?: number;
}

const ColourIndex = () => {
  const history = useHistory();

  const [colours, setColours] = useState([]);

  const getColours = async () => {
    const allColours = await ColourQuery.getAll();
    setColours(allColours);
  };

  const redirctToEdit = (id: number) => {
    history.push(`/colours/${id}/edit`);
  };

  useEffect(() => {
    getColours();
  }, []);

  return (
    <div className="ColourIndex">
      <h2>Colours</h2>
      <div className="colour-index">
        {colours.map((colour: Colour) => (
          <div
            key={colour.id}
            onClick={() => redirctToEdit(colour.id ? colour.id : 0)}
          >
            <div
              className="swatch"
              style={{
                background: `hsl(${colour.hue}, ${colour.saturation}%, ${colour.lightness}%)`,
              }}
            ></div>
            <p className="swatch-label">{colour.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColourIndex;
