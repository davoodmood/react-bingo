import React, {memo, useState, useEffect } from 'react';
import "./style.css";
import bingoData from "../../assets/data/bingoDB.json";
import cellContent from "../../assets/data/cellContent.json"
import TableRow from "./components/TableRow";
import {Column} from "./components/TableColumn";


function shuffleContent(contents : string[]): string[] {
  return contents.sort(() => Math.random() - 0.5)
}

function randomNumber(index: number) {
  const range = Math.floor((Math.random() * 15) + 1)
  const indexedRange = index === 0 ? 0 : (15 * index);
  return range + indexedRange;
}

let duplicationNumberMemory: {[key: number]: boolean} = {};
function shuffleNumber(key: number) : number | null {
  const index: number = key < 5 ? key : key % 5;
  
  const shuffledValue: number | null = (
    () => {
      const numericValue = randomNumber(index);
      if (duplicationNumberMemory[numericValue]) return null;
      else {
        duplicationNumberMemory[numericValue] = true;
        return numericValue
      }
    }
  )()

  return shuffledValue ?  shuffledValue : shuffleNumber(index)
}

function mergeBingoData(bingoData: Array<Array<Column>>): Promise<Array<Array<Column>>> {
  return new Promise ((resolve) => {
    if (cellContent.length !== ((bingoData.length * bingoData[0].length) - 1)) throw new Error("Randomized Contents has extra entitites.")
    const bingoDataSheet = bingoData.concat();
    const ranomizedContents: string[] = shuffleContent(cellContent.concat());
    for (const row of bingoDataSheet) {
      for (const column of row) {
        if (!column.isSelected) column.content = `${ranomizedContents.pop()}`;
        column.number = shuffleNumber(column.key);
      }
    }
    resolve(bingoDataSheet);
  })
  
}

function Table() {
  const [bingoSheet, setBingoSheet] = useState<Array<Array<Column>> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const bingoSheetData: NonNullable<Array<Array<Column>>> = await mergeBingoData(bingoData);
      setBingoSheet(bingoSheetData);
    }
    
    fetchData();
  }, []);

  return (
    <div className="tableContainer">
      <table className='tableLayout'>
        <tbody>
          {bingoSheet && bingoSheet.map((rowData: Column[], index:number) => {
            return (
              <TableRow columns={rowData} key={index}/>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default memo(Table);


