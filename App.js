import { React, useState } from 'react';
import styles from './src/ui/styles.js';
import {
  Text,
  View,
  Button,
} from 'react-native';

/*
  This app emulates a tic-tac-toe game
  It builds a board and keeps track of the state of each move
  Each turn the user can make a play or reset the board to any previous turn
  After each turn, the board is evaluated for possible winning patterns
  Message is shown to indicate the current player or winner/stalemate
*/

const App = () => {
  /// Initialise player, board and turn count
  const initialState = {
    player: 'Player X',
    scores: [Array(9).fill('.')],
    currentTurn: 0
  };
  const [state, setState] = useState(initialState);

  // Const values used for player names and max turn amount
  const playerX = 'Player X';
  const playerO = 'Player O';
  const maxTurns = 9;

  // Extract scores length to get total amount of turns
  let totalTurns = state.scores.length - 1;

  // Updates when checkBoard() has been called and a matching pattern found
  let gameOver = false;

  // Board layout
  const BuildBoard = () => {
      return (
        <View>
          <Row primaryIndex = { 0 } arr = {state.scores[state.currentTurn].slice(0, 3)} />
          <Row primaryIndex = { 1 } arr = {state.scores[state.currentTurn].slice(3, 6)} />
          <Row primaryIndex = { 2 } arr = {state.scores[state.currentTurn].slice(6)} />
        </View>
      );
    }

  // Formatted layout for a row given an index and specific values from scores array
  const Row = (props) => {
    return (
      <View style={styles.row}>
        {props.arr.map((data, secondaryIndex) => {
          const key = getCellIndex(props.primaryIndex, secondaryIndex);
          return (
            <Cell key = { key }  index = { key } data = { data } />
          );
        }
        )}
      </View>
    );
  }

  // Formatted board cell containing button for setting a score
  const Cell = (props) => {
    return (
    <View style = {styles.buttonView} key = {props.index}>
      <Button
        color = 'black'
        title = { props.data }
        onPress = { props.data != '.' || gameOver || state.currentTurn != totalTurns ? () => {} : () => buttonPress(props.index) } />
    </View>);
  }

  // Handles clicking a button in a cell
  function buttonPress(data) {
    let turnNumber = state.currentTurn;
    let updatedScores = state.scores[state.currentTurn].map((item, index) => {
      return index == data ? state.player == playerX ? 'X' : 'O' : item;
    });
    // Change player turn, set updated scores, increment turn number
    setState({
      player:  state.player == playerX ? playerO : playerX,
      scores: [...state.scores, updatedScores],
      currentTurn: ++turnNumber});
  }

  // Gets true index of cell based on its position on the board,
  //  used to update the score when clicked
  /*
    [0][1][2]
    [3][4][5]
    [6][7][8]
  */
  function getCellIndex(rowIndex, columnIndex) {
    let index = 0;
    switch(rowIndex) {
      case 1:
        switch(columnIndex) {
          //[3][*][5]
          case 1:
            index = 4;
            break;
          //[3][4][*]
          case 2:
            index = 5;
            break;
          //[*][4][5]
          default:
            index = 3;
            break;
        }
        break;
      case 2:
        switch(columnIndex) {
          //[6][*][8]
          case 1:
            index = 7;
            break;
          //[6][7][*]
          case 2:
            index = 8;
            break;
          //[*][7][8]
          default:
            index = 6;
            break;
        }
        break;
      default:
        switch(columnIndex) {
          //[0][*][2]
          case 1:
            index = 1;
            break;
          //[0][1][*]
          case 2:
            index = 2;
            break;
          //[*][1][2]
          default:
            index = 0;
            break;
        }
        break;
    }
    return index;
  }

  
  // Checks the board for possible wins based on the standard tic-tac-toe patterns
  /*
    [0][1][2]
    [3][4][5]
    [6][7][8]
  */
  function checkBoard() {
    const player = state.player == playerX ? 'O' : 'X';
    if(state.scores[state.currentTurn][0] == player && state.scores[state.currentTurn][1] == player && state.scores[state.currentTurn][2] == player ||
    state.scores[state.currentTurn][3] == player && state.scores[state.currentTurn][4] == player && state.scores[state.currentTurn][5] == player ||
    state.scores[state.currentTurn][6] == player && state.scores[state.currentTurn][7] == player && state.scores[state.currentTurn][8] == player ||
    state.scores[state.currentTurn][0] == player && state.scores[state.currentTurn][3] == player && state.scores[state.currentTurn][6] == player ||
    state.scores[state.currentTurn][1] == player && state.scores[state.currentTurn][4] == player && state.scores[state.currentTurn][7] == player ||
    state.scores[state.currentTurn][2] == player && state.scores[state.currentTurn][5] == player && state.scores[state.currentTurn][8] == player ||
    state.scores[state.currentTurn][0] == player && state.scores[state.currentTurn][4] == player && state.scores[state.currentTurn][8] == player ||
    state.scores[state.currentTurn][6] == player && state.scores[state.currentTurn][4] == player && state.scores[state.currentTurn][2] == player) {
      return player;
    }
    return null;
  }

  // Check for a winner on rebuild
  const winner = checkBoard();

  // Set text displayed on bottom based on game state
  let bottomText = '';
  if(winner != null) {
    bottomText = 'Yay! Winner: ' + (state.player == playerX ? playerO : playerX);
    gameOver = true;
  }
  else if(state.currentTurn == maxTurns) {
    bottomText = 'Game over!';
    gameOver = true;
  }
  else {
    bottomText = state.player + ' it\'s your turn!'
  }

  // Build board and turn row with directional text
  return (
    <View style = {styles.container}>
      <Text style = {styles.textMain}>{bottomText}</Text>
      <BuildBoard />
      <View style = {styles.row}>
        {
          state.scores.map((_item, index) => {
            let selected = state.currentTurn == index;
            return (
              <View style = { styles.buttonView }>
                <Button
                  color = { selected ? 'blue' : 'grey'}
                  title = { index.toString() }
                  onPress = {selected ? () => {} : () => {
                    setState(previousState => {
                      return { ...previousState, currentTurn: index}});
                  }}
                />
              </View>
            )
          })
        }
      </View>
       { totalTurns != 0 &&
        <Button
          color = 'red'
          title = 'Reset'
          onPress = { () => setState(initialState) }
        />
      }
    </View>
  );
};

export default App;
