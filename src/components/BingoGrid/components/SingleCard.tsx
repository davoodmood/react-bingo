import React, { useState } from 'react';
import {useCell} from "../../../context/BingoContext"
import '../styles.css';

export interface Card {
    key: number;
    content : string;
    isSelected: boolean;
    number: number | null;
}

interface SingleCardProps {
    card: Card;
}


function SingleCard({card}: SingleCardProps) {
    const {
        key,
        content,
        isSelected,
        number
    } = card;

    const {cellKey, toggleCell} = useCell();
    const [isActivated, setIsActivated] = useState(isSelected);

    function toggleSelection(key:number, isSelected: boolean) {
        if(key !== 12) {
            setIsActivated((currentState) => !currentState);
            toggleCell(key, !isSelected);
        }
        return cellKey[key];
    }
    

  return (
    <div className='card'>
        <div className={isActivated ? "flipped" : ""} onClick={() => toggleSelection(key, isActivated)}>
            {
            key === 12 ? 
            (<div className='front' style={{
                // eslint-disable-next-line no-useless-concat
                background: `url(${require("../../../assets/images/12-bingo.png")})`,
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
            }}>
                
            </div>)
            :
            (<div className='front' style={{
                background: `url(${require("../../../assets/images/01-bingo.png")})`,
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
            }}> 
                <div>{content}</div>
            </div>)
            }
            <div className='cover back' style={{
                background: `url(${require("../../../assets/images/00-bingo.png")})`,
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
            }}>
                <div>{number}</div>
            </div>
        </div>
    </div>
  )
}

export default SingleCard;