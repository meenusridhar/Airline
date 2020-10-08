import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
 import AirlineList from "./components/Flights";
function App() {
  return (<Router>
    <div>      
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path="/Login" component={Login} />
        <Route path="/SignUp" component={SignUp} />
        <Route path="/Flights" component={AirlineList} />
      </Switch>
      
    </div>
  </Router>
  );
}

export default App;