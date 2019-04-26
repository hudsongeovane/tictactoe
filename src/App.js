import React from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './Components'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Game />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

      </div>
);
  }
}

export default App;
