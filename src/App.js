import React, { Component } from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';

import Login from './Login/Login.js';
import NewEntry from './NewEntry/NewEntry.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path = "/" component = {Login} />
          <Route exact path = "/NewEntry" component = {NewEntry} />
        </Switch>
      </Router>
    );
  }
}

export default App;
