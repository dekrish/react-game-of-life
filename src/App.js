import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>conway</h2>
        </div>
        <GameOfLife id="grid" rowGridCount=6 colGridCount=6 />
      </div>
    );
  }
}

export default App;
