import React from 'react';

type column = Array<string>;
type columns = Array<column>;

type Props = {
    columns: columns
}

function Grid(props: Props) {
    const gridElements = props.columns
    .map((column: column, column_index: number) => {
        const cellElements = column.map((cell: string, cell_index: number) => {
          const key = column_index + '_' + cell_index;   
          return <div key={key} className={`${cell} cell`}></div>
        });
        return <div className='col' key={column_index}>
          {cellElements}
        </div>
      });
  
    return (
      <div className="board-grid">
        {gridElements}
      </div>
  );
}

export default Grid;