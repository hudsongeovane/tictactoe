import React from 'react';
import './App.css';
import Game from './Components'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Game />
          <p>TicTacToe IA devoloped by <a href="https://github.com/hudsongeovane/">@hudsongeovane</a></p>
          <a href="https://github.com/hudsongeovane/tictactoe">
            Github Project
          </a>

        </header>
      </div>
);
  }
}

export default App;
