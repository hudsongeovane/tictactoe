import React from 'react';
import './App.css'

class Square extends React.Component {
  render() {
    return (
      <td className="square" onClick={() => this.props.onClick() }>
        {this.props.value}
      </td>
    );
  }
}

class ResetButton extends React.Component {
  render() {
    const reset = "Reset Game";

    return (
      <tr>
        <td className="resetButton" onClick={() => this.props.onClick() }>
        {reset}
        </td>
      </tr>
    )
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardstatus: Array(9).fill(null),
      xNext: true,
      IAFirst: false,
    };
  }
  renderSquare(i) {
    return <Square value={this.state.boardstatus[i]} onClick={() => this.handleClick(i)} />;
  }
  handleClick(i) {
    const squares = this.state.boardstatus.slice();
    if (winner(squares,'X') || winner(squares,'O')) return;
    if (squares[i] == null) { //For not clicking the same button twice.
      squares[i] = this.state.xNext ? 'X' : 'O';
      //this.setState({boardstatus: squares, xNext: !this.state.xNext});
      var m = findAiMove(squares,this.state.xNext ? 'O' : 'X');
      console.log(m);
      squares[m] = this.state.xNext ? 'O' : 'X'; //Not updated xNext yet.
      this.setState({boardstatus: squares, xNext: this.state.xNext, IAFirst: this.state.IAFirst});
    }
  }
  resetGame() {
    if (!this.state.IAFirst) {
      const squares = Array(9).fill(null);
      squares[0] = 'X';
      this.setState({boardstatus: squares, xNext: false, IAFirst: true});
    }
    else {
      this.setState({boardstatus: Array(9).fill(null), xNext: true, IAFirst: false});
    }
  }
  render() {
    let status = "";
    if (winner(this.state.boardstatus,'X')) status = "Player X won the game. Click reset to play more";
    if (winner(this.state.boardstatus,'O')) status = "Player O won the game. Click reset to play more";
    if (tie(this.state.boardstatus)) status = "It is a tie. Click reset if you want to play more";
    return (
      <div>
      <div>
        <p>{status}</p>
      </div>
      <div>
      <table align="center">
      <tbody>
        <tr>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </tr>
        <tr>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </tr>
        <tr>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </tr>
        <ResetButton class="resetButton" onClick={() => this.resetGame()}/>
      </tbody>
      </table>
      </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div>
        <div>
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
function countMoves(board) {
  let movesMade = 0;
  for(let i = 0; i < board.length; i++) {
    if (board[i] != null) movesMade++;
  }
  return movesMade;
}
function tie(board) {
  for(let i = 0; i < 9; i++) {
    if (board[i] !== 'X' && board[i] !== 'O') return false;
  }
  return true;
}
function findAiMove(board,AIPlayer) {
  console.log(AIPlayer);
  var bestMoveScore = AIPlayer === 'X' ? -100 : 100;
  let move = null;
  //Test Every Possible Move if the game is not already over.
  if(winner(board, 'X') || winner(board, 'O' || tie(board))) {
    return null;
  }
  let movesMade = countMoves(board);

  for(var i = 0; i < board.length; i++){
    let newBoard = validMove(i, AIPlayer, board);
    if(newBoard) {
      var moveScore = (AIPlayer === 'X') ? minScore(newBoard,9-movesMade) : maxScore(newBoard,10 - movesMade);
      let s = "";
      console.log(s.concat("move ",i," moveScore ",moveScore));
      if (AIPlayer === 'O')
        if (moveScore < bestMoveScore) {
          bestMoveScore = moveScore;
          move = i;
        }
      if (AIPlayer === 'X')
        if (moveScore > bestMoveScore) {
          bestMoveScore = moveScore;
          move = i;
        }
    }
  }
  return move;
}

function minScore(board,depth) {
  if (winner(board, 'X')) {
    return 10* (10 - countMoves(board)); //10 because countMoves can be 9
  } else if (winner(board, 'O')) {
    return -10 * (10 - countMoves(board));
  } else if (tie(board)) {
    return 0;
  } else if (depth === 0) {
    console.log(depth);
    return 0;
  } else {
    var bestMoveValue = 100;
    for (var i = 0; i < board.length; i++) {
      var newBoard = validMove(i, minPlayer, board);
      if (newBoard) {
        var predictedMoveValue = maxScore(newBoard,depth-1);
        if (predictedMoveValue < bestMoveValue) {
          bestMoveValue = predictedMoveValue;
        }
      }
    }
    return bestMoveValue;
  }
}
function maxScore(board,depth) {
   if(winner(board, 'X')) {
    return 10 * (10 - countMoves(board));
  } else if(winner(board, 'O')) {
    return -10 * (10 - countMoves(board));
  } else if(tie(board)) {
    return 0;
  } else if (depth === 0) {
    return 0;
  } else {
    var bestMoveValue = -100;
    for (var i = 0; i < board.length; i++) {
      var newBoard = validMove(i, maxPlayer, board);
      if (newBoard) {
        var predictedMoveValue = minScore(newBoard,depth-1);
        if (predictedMoveValue > bestMoveValue) {
          bestMoveValue = predictedMoveValue;
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
