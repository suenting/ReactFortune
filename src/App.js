import React, { Component } from 'react';
import './App.css';
import Animal from './components/Animal';
import Cookie from './components/Cookie';
import Paper from '@material-ui/core/Paper';

import { Typography } from '@material-ui/core';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Paper>
          <Typography align="center">
            Animal Components
          </Typography>
          <br />
          <Animal type="cat"></Animal>
          <Animal type="dog"></Animal>
          <Animal type="dog2"></Animal>
          <hr />
        </Paper>
        <Paper>
        <Typography align="center">
            Advice
          </Typography>
          <br />
          Advice: <br /><Cookie type="advice"></Cookie>
          <br />
          Chuck Noris Jokes:<br /><Cookie type="chuck"></Cookie>
        </Paper>
      </div>
    );
  }
}

export default App;
