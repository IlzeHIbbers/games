import React, {useEffect, useState } from 'react';
import './App.css';
import DropZone from './components/DropZone';
import Grid from './components/Grid';
import board from './image/board.png';

type column = Array<string>;
type columns = Array<column>;

function App() {
  const [color, setColor] =  useState<string>('');
  const [game, setGame] = useState<string>('');
  const [columns, setColumns] = useState<columns>([]);

  function reset(){
    setColumns([['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','','']]);
    setColor('red');
    setGame('');
  }

  function getBottomCell(column_index: number) {
    const filled = columns[column_index].filter(i => i).length;
    return columns[0].length - filled - 1;
  }

  function droppedToken(column_index: number) {
    const cell =  getBottomCell(column_index);
    setColumns(preColumns => {
      const newColumns = [...preColumns];
      newColumns[column_index][cell] = color;
      return newColumns;
    });
    if (continueMatch(column_index, cell)) {
      setColor(preColor =>  preColor === 'red' ? 'yellow' : 'red');
    }
  }

  function isMatch (direction1: number, direction2: number) {  
      return direction1 + direction2 > 2
  }
  
  function matchColor(column_index: number, cel_index: number) {
    if(column_index < columns.length && column_index >= 0) {
      if (cel_index < columns[0].length && cel_index >= 0) {
        return columns[column_index][cel_index] === color;
      }
    } 
    return false; 
  }

  function checkDirection(column_index: number, cel_index: number, column_direction: number, cell_direction: number) {
    let matched = 0; 
    for (let i: number = 1; i <= 3; i++) {  
        if(matchColor(column_index + (column_direction*i) , cel_index + (cell_direction*i))) {
          matched += 1;
        }
        else {
          i = 4;
        }
    } 
    return matched
  }

  function isTopDown(column_index: number, cell_index: number) {
    let top = checkDirection(column_index, cell_index, 0, -1);
    let down = checkDirection(column_index, cell_index, 0, 1);
    return isMatch(top, down);
  }

  function isLeftRight(column_index: number, cell_index: number) {
    let left = checkDirection(column_index, cell_index, -1, 0);
    let right = checkDirection(column_index, cell_index, 1, 0);
    return isMatch(left, right);
  }

  function isDiaginalUp(column_index: number, cell_index: number) {
    let bottom_left = checkDirection(column_index, cell_index, -1, 1);
    let top_right = checkDirection(column_index, cell_index, 1, -1);
    return isMatch(bottom_left, top_right);
  }

  function isDiaginalDown(column_index: number, cell_index: number) {
    let bottom_left = checkDirection(column_index, cell_index, -1, -1);
    let top_right = checkDirection(column_index, cell_index, 1, 1);
    return isMatch(bottom_left, top_right);
  }

  function continueMatch(column_index: number, cel_index: number) {
    if(isLeftRight(column_index, cel_index) || isTopDown(column_index, cel_index) 
    || isDiaginalDown(column_index, cel_index) || isDiaginalUp(column_index, cel_index)) {
      setGame(color + ' won!!');
      return false;
    }
    else { 
      const empty = columns.map(column => column
        .filter(cell => !cell).length)
        .filter(i => i> 0).length > 0;

      if(!empty) {
        setGame('draw');
        return false;
      }  
    }
    return true;
  }

  useEffect(()=>{reset()},[])

  return (
    <div className="App">
      <div className='header'>
        <p>{game ||  color + '\'s turn'}</p>
        <p className={`${game ? 'green' : '' }`} onClick={reset}>New Game</p>
      </div>
      <div className={`board ${game ? 'disable' : '' }`}>
        <DropZone droppedToken={droppedToken} color={color} getBottomCell={getBottomCell} columns={columns}/>
        <img className='board-img' src={board} alt="board_img"></img>
        <Grid columns={columns}/>
      </div>
    </div>
  );
}

export default App;