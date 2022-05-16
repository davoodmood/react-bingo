import React, {memo, useState} from 'react'
import "./styles.css";
import {useCell} from "../../../context/BingoContext"

export interface Column {
    key: number;
    content : string;
    isSelected: boolean;
    number: number | null;
}

interface TableColumnProps {
    column: Column;
}

function TableColumn({column}: TableColumnProps) {
    const {
        key,
        content,
        isSelected,
        number
    } = column;

    const {cellKey, toggleCell} = useCell();
    const [isActivated, setIsActivated] = useState(isSelected);
    
    function toggleSelection(key:number, isSelected: boolean) {
        if(key !== 12) {
            setIsActivated((currentState) => !currentState);
            toggleCell(key, !isSelected);
        }
        // isWinner(cellKey);
        return cellKey[key];
    }

    
  return (
    <td className={`cell ${isActivated && 'active'}`} onClick={() => toggleSelection(key, isActivated)}>
        <div className='front'>
            {/* <div className='front' style={{
                
            }} src={require("../../../assets/images/01-bingo.png")} alt={`${key}`}/> */}
            <div className="cellNumber">{number && Math.floor(number)}</div>
            {content.length > 0 ? content: key}
        </div>
    </td>
  )
}

export default memo(TableColumn);