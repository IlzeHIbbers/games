import React, {useRef} from 'react';

type Props = {
    setDropping: (value: boolean) => void,
    droppedToken: () => void,
    color: string,
    getBottomCell: () => number
  }  

function Token(props: Props) {
  const defaultClass = 'drop-cell token'
  const tokenRef = useRef<HTMLDivElement | null>(null);

  function drop(){
    const bottomCell = props.getBottomCell();
    if(bottomCell > -1) {
        props.setDropping(true);
        tokenRef.current?.setAttribute('class',`${defaultClass} ${props.color} drop-animation_${bottomCell+1}`);
        setTimeout(() => {
            tokenRef.current?.setAttribute('class', defaultClass);
            props.setDropping(false);
            props.droppedToken();
        }, (bottomCell+1)*180);
    }
  }

  return (
    <div className={`drop-cell empty-${props.color}`}>
        <div className="token" onClick={drop} ref={tokenRef}></div>
    </div>
  );
}

export default Token;