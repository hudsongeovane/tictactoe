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
      squares[i] = 'X';//this.state.xNext ? 'X' : 'O';
      this.setState({boardstatus: squares, xNext: !this.state.xNext});
      var m = findAiMove(squares);
      console.log(m);
      squares[m] = 'O';
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
var maxPlayer = 'X';
var minPlayer = 'O';


function copyBoard(board) {
  return board.slice(0);
}
function winner(board, player){
  if (
        (board[0] === player && board[1] === player && board[2] === player) ||
        (board[3] === player && board[4] === player && board[5] === player) ||
        (board[6] === player && board[7] === player && board[8] === player) ||
        (board[0] === player && board[3] === player && board[6] === player) ||
        (board[1] === player && board[4] === player && board[7] === player) ||
        (board[2] === player && board[5] === player && board[8] === player) ||
        (board[0] === player && board[4] === player && board[8] === player) ||
        (board[2] === player && board[4] === player && board[6] === player)
        ) {
        return true;
    } else {
        return false;
    }
}
function tie(board) {
  for(let i = 0; i < 9; i++) {
    if (board[i] !== 'X' && board[i] !== 'O') return false;
  }
  return true;
}
function findAiMove(board) {
  var bestMoveScore = 100;
  let move = null;
  //Test Every Possible Move if the game is not already over.
  if(winner(board, 'X') || winner(board, 'O' || tie(board))) {
    return null;
  }
  let movesMade = 0;
  for(let i = 0; i < board.length; i++) {
    if (board[i] != null) movesMade++;
  }

  for(var i = 0; i < board.length; i++){
    let newBoard = validMove(i, minPlayer, board);
    if(newBoard) {
      var moveScore = maxScore(newBoard,9 - movesMade);
      if (moveScore < bestMoveScore) {
        bestMoveScore = moveScore;
        move = i;
      }
    }
  }
  return move;
}

function minScore(board,depth) {
  if (winner(board, 'X')) {
    return 10;
  } else if (winner(board, 'O')) {
    return -10;
  } else if (tie(board)) {
    return 0;
  } else if (depth == 0) {
    console.log(depth);
    return 0;
  } else {
    var bestMoveValue = 100;
    let move = 0;
    for (var i = 0; i < board.length; i++) {
      var newBoard = validMove(i, minPlayer, board);
      if (newBoard) {
        var predictedMoveValue = maxScore(newBoard,depth-1);
        if (predictedMoveValue < bestMoveValue) {
          bestMoveValue = predictedMoveValue;
          move = i;
        }
      }
    }
    return bestMoveValue;
  }
}
function maxScore(board,depth) {
   if(winner(board, 'X')) {
    return 10;
  } else if(winner(board, 'O')) {
    return -10;
  } else if(tie(board)) {
    return 0;
  } else if (depth == 0) {
    return 0;
  } else {
    var bestMoveValue = -100;
    let move = 0;
    for (var i = 0; i < board.length; i++) {
      var newBoard = validMove(i, maxPlayer, board);
      if (newBoard) {
        var predictedMoveValue = minScore(newBoard,depth-1);
        if (predictedMoveValue > bestMoveValue) {
          bestMoveValue = predictedMoveValue;
          move = i;
        }
      }
    }
    return bestMoveValue;
  }
}

function validMove(move, player, board){
  var newBoard = copyBoard(board);
  if(newBoard[move] === null){
    newBoard[move] = player;
    return newBoard;
  } else
    return null;
}

export default Game;
