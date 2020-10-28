import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./compoments/partials/NavBar";

import DisplayEdit from "./compoments/display/DisplayEdit";
import DisplayIndex from "./compoments/display/DisplayIndex";
import DisplayNew from "./compoments/display/DisplayNew";
import DisplayShow from "./compoments/display/DisplayShow";

import ColourIndex from "./compoments/colours/ColourIndex";
import ColourNew from "./compoments/colours/ColourNew";
import ColourEdit from "./compoments/colours/ColourEdit";

import { DisplayQuery } from "./js/request";


interface Display {
  name: string;
  ipaddress: string;
  led_number: number;
  id?: number;
}

function App() {
  const [displays, setDisplays] = useState<Display[]>([]);
  const [missingDisplays, setMissingDisplays] = useState<Display[]>([]);

  const getAllDisplays = async () => {
    try {
      const allDisplays = await DisplayQuery.searchAll();
      setDisplays(allDisplays.found);
      setMissingDisplays(allDisplays.not_found);
    } catch (error) {
      console.error(error);
    }
  };

  const updateDisplay = async (id: number) => {
    const display: Display = await DisplayQuery.getOne(`${id}`);
    addNewDisplays(display);
    removeFromMissingDisplays(display);
    return;
  };

  const addNewDisplays = (display: Display) => {
    const newDisplayList: Display[] = displays;
    newDisplayList.push(display);
    setDisplays(newDisplayList);
  };

  const removeFromMissingDisplays = (foundDisplay: Display) => {
    const remaining: Display[] = [];
    missingDisplays.forEach((display: Display) => {
      if (display.id !== foundDisplay.id) {
        remaining.push(display);
      }
    });
    setMissingDisplays(remaining);
  };

  useEffect(() => {
    // let isCancelled = false;
    getAllDisplays();

    // return () => {
    // isCancelled = true;
    // };
  }, []);

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            {" "}
            <DisplayIndex
              displays={displays}
              missingDisplays={missingDisplays}
              updateAll={getAllDisplays}
              update={updateDisplay}
            />
          </Route>
          <Route exact path="/Displays">
            <DisplayIndex
              displays={displays}
              missingDisplays={missingDisplays}
              updateAll={getAllDisplays}
              update={updateDisplay}
            />
          </Route>
          <Route exact path="/Displays/new" component={DisplayNew} />
          <Route exact path="/Displays/:id" component={DisplayShow} />
          <Route exact path="/Displays/:id/edit" component={DisplayEdit} />
          <Route exact path="/colours" component={ColourIndex} />
          <Route exact path="/colours/new" component={ColourNew}>
            <ColourNew displays={displays} />
          </Route>
          <Route exact path="/colours/:id/edit">
            {/* <ColourEdit displays={displays} /> */}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
