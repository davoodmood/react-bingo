import React, {memo, useState, useEffect } from 'react';
import "./styles.css";
import bingoData from "../../assets/data/bingoDB.json";
import gridContent from "../../assets/data/gridContent.json"
import {Column} from "../BingoTable/components/TableColumn";
import SingleCard from './components/SingleCard';


function shuffleContent(contents : string[]): string[] {
  return contents.sort(() => Math.random() - 0.5)
}

function randomNumber(index: number) {
  const range = Math.floor((Math.random() * 15) + 1)
  const indexedRange = index === 0 ? 0 : (15 * index);
  return range + indexedRange;
}

// let duplicationNumberMemory: {[key: number]: boolean} = {};
function shuffleNumber(key: number) :number {
  const index: number = key < 5 ? key : key % 5;
  const numericValue = randomNumber(index);
  
  // if (duplicationNumberMemory[numericValue]) shuffleNumber(key);
  // else duplicationNumberMemory[numericValue] = true;
  
  return numericValue;
}

function mergeBingoData(bingoData: Array<Array<Column>>): Promise<Array<Column>> {
  return new Promise ((resolve) => {
    if (gridContent.length !== ((bingoData.length * bingoData[0].length) - 1)) throw new Error("Randomized Contents has extra entitites.")
    let flattendArray: Array<Column> = [];
    const bingoDataSheet = bingoData.concat();
    const ranomizedContents: string[] = shuffleContent(gridContent.concat());
    for (const row of bingoDataSheet) {
      const newArray = [];
      for (const column of row) {
        if (!column.isSelected) column.content = `${ranomizedContents.pop()}`;
        column.number = shuffleNumber(column.key);
        newArray.push(column);
      }
      flattendArray = [...flattendArray, ...newArray];
    }
    flattendArray.sort(function(a, b) {
        return a.key - b.key;
    });      
    resolve(flattendArray);
  })
  
}

function Cards() {
  const [bingoSheet, setBingoSheet] = useState<Array<Column> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const bingoSheetData: NonNullable<Array<Column>> = await mergeBingoData(bingoData);
      setBingoSheet(bingoSheetData);
    }
    
    fetchData();
  }, []);

  return (
    <div className="cardsContainer">
      {bingoSheet && bingoSheet.map((card: Column) => {
        return (
            <SingleCard key={card.key} card={card}/>
        )
      })}
    </div>
  )
}

export default memo(Cards);


