import React, {useState} from 'react';
import Token from './token';

type column = Array<string>;
type Props = {
  droppedToken: (column: number) => void,
  getBottomCell: (column: number) => number,
  color: string,
  columns: Array<column>
}

function DropZone(props: Props) {
  const [isDropping, setIsDropping] = useState(false); 

  const tokenElements = props.columns.map((column, index) => {
    return <Token 
      key={index}
      setDropping={(value) => setIsDropping(value)} 
      color={props.color} 
      droppedToken={() => props.droppedToken(index)}
      getBottomCell={() => props.getBottomCell(index)}/>     
  })

  return (
    <div className={`drop ${isDropping ? 'disable' : 'blur'}`}>
      {tokenElements}
    </div> 
  );
}

export default DropZone;