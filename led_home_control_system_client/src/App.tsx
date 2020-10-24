import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./compoments/partials/NavBar";

import DisplayEdit from "./compoments/display/DisplayEdit";
import DisplayIndex from "./compoments/display/DisplayIndex";
import DisplayNew from "./compoments/display/DisplayNew";
import DisplayShow from "./compoments/display/DisplayShow";

import ColourIndex from "./compoments/colours/ColourIndex";
import ColourNew from "./compoments/colours/ColourNew";
import ColourEdit from "./compoments/colours/ColourEdit";

function App() {

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={DisplayIndex} />
          <Route exact path="/Displays" component={DisplayIndex} />
          <Route exact path="/Displays/new" component={DisplayNew} />
          <Route exact path="/Displays/:id" component={DisplayShow} />
          <Route exact path="/Displays/:id/edit" component={DisplayEdit} />
          <Route exact path="/colours" component={ColourIndex} />
          <Route exact path="/colours/new" component={ColourNew} />
          <Route exact path="/colours/:id/edit" component={ColourEdit} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
