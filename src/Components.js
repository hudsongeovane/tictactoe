import React from 'react';
import './App.css'

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick() }>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardstatus: Array(9).fill(null),
      xNext: true,
    };
  }
  renderSquare(i) {
    return <Square value={this.state.boardstatus[i]} onClick={() => this.handleClick(i)} />;
  }
  handleClick(i) {
    const squares = this.state.boardstatus.slice();
    if (squares[i] == null) { //For not clicking the same button twice.
      squares[i] = this.state.xNext ? 'X' : 'O';
      this.setState({boardstatus: squares, xNext: !this.state.xNext});
    }
  }
  render() {

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextPlayer: 'X',
    };
  }
  render() {
    const status = 'Next player:' + this.state.nextPlayer;

    return (
      <div>
        <div>
          <div className="status">{status}</div>
          <Board />
        </div>
        <div>
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
