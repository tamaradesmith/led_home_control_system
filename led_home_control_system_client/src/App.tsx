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

import ShowIndex from "./compoments/shows/ShowIndex";
import ShowShow from "./compoments/shows/ShowShow";
import ShowNew from "./compoments/shows/ShowNew";
import ShowEdit from "./compoments/shows/ShowEdit";

import { DisplayQuery } from "./js/request";
import { DisplayProvider } from "./compoments/partials/DisplayContext";

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

  const displaysValue = { displays, missingDisplays };

  return (
    <div className="App">
      <DisplayProvider value={displaysValue}>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/">
              {" "}
              <DisplayIndex updateAll={getAllDisplays} update={updateDisplay} />
            </Route>
            <Route exact path="/Displays">
              <DisplayIndex updateAll={getAllDisplays} update={updateDisplay} />
            </Route>
            <Route exact path="/Displays/new" component={DisplayNew} />
            <Route exact path="/Displays/:id" component={DisplayShow} />
            <Route exact path="/Displays/:id/edit" component={DisplayEdit} />
            <Route exact path="/colours" component={ColourIndex} />
            <Route exact path="/colours/new" component={ColourNew} />
            <Route exact path="/colours/:id/edit" component={ColourEdit} />
            <Route exact path="/shows" component={ShowIndex} />
            <Route exact path="/shows/new" component={ShowNew} />
            <Route exact path="/shows/:id" component={ShowShow} />
            <Route exact path="/shows/:id/edit" component={ShowEdit} />
          </Switch>
        </Router>
      </DisplayProvider>
    </div>
  );
}

export default App;
