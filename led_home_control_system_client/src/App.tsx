import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DisplayIndex from "./compoments/DisplayIndex";
import DisplayNew from "./compoments/DisplayNew";
import DisplayShow from "./compoments/DisplayShow";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={DisplayIndex} />
          <Route exact path="/Displays" component={DisplayIndex} />
          <Route exact path="/Displays/new" component={DisplayNew} />
          <Route exact path="/Displays/:id" component={DisplayShow} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
