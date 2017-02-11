import React from 'react';
import ReactDOM from 'react-dom';
import GameOfLife from './GameOfLife';
import './index.css';

ReactDOM.render(
  <GameOfLife id="grid" rowGridCount="6" colGridCount="6" />,
  document.getElementById('root')
);
