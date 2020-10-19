import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DisplayEdit from "./compoments/display/DisplayEdit";
import DisplayIndex from "./compoments/display/DisplayIndex";
import DisplayNew from "./compoments/display/DisplayNew";
import DisplayShow from "./compoments/display/DisplayShow";
import NavBar from "./compoments/partials/NavBar";

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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
