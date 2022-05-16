import React, { createContext, useContext, useState, useRef } from 'react';

const WINNER_COMBINATION_CELL_COUNT = 5 as number;
const winningCombinations: {[key: string]: Array<Array<number>>} = {
    "rows": [
        [0,1,2,3,4],
        [5,6,7,8,9],
        [10,11,12,13,14],
        [15,16,17,18,19,],
        [20,21,22,23,24],
    ],
    "columns": [
        [0,5,10,15,20],
        [1,6,11,16,21],
        [2,7,12,17,22],
        [3,8,13,18,23],
        [4,9,14,19,24],
    ],
    "diagonal": [
        [0,6,12,18,24],
        [4,8,12,16,20],
    ]
};

const DEFAULT_KEY_SET = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
];

const CellContext = createContext<any>({});

export default function BingoProvider({children} : {children: React.ReactNode}) {
    const bingo = useProvideBingo();
    return (
        <CellContext.Provider value={bingo}>
            {children}
        </CellContext.Provider>
    )
}

export const useCell = () => {
    return useContext(CellContext)
}

function useProvideBingo() {
    const bingoCount = useRef<number>(0);

    const [celebrate, setCelebrate] = useState<boolean>(false);
    const [cellKey, setCellKey] = useState<boolean[]>(DEFAULT_KEY_SET);

    function toggleCelebration() {
        setCelebrate((currentIsActive) => !currentIsActive);
        setTimeout(() => {
            setCelebrate((currentIsActive) => !currentIsActive);
        }, 5000)
    }

    function cheerWinner() {
        console.log("Winner YAY!")
        toggleCelebration();
    }
    
    function isWinner(cellKey: boolean[]) {
        const currentWinnersCount = bingoCount.current;
        let evaluationWinnersCount = 0;
        for (const dimention in winningCombinations) {
            for (const combination of winningCombinations[dimention]) {
              const competingArray = combination.map((key: number) => {
                 return cellKey[key] === true ? true : false;
              }) as boolean[];
                const evaluatingArray  = competingArray.filter(Boolean) as boolean[];
                const isWinner: boolean = evaluatingArray.length === WINNER_COMBINATION_CELL_COUNT ? true : false; 
                if (isWinner) {
                    evaluationWinnersCount++
                    if( evaluationWinnersCount > currentWinnersCount) {
                        bingoCount.current++ 
                        cheerWinner()
                    }
                }
            }
        }
        if (evaluationWinnersCount < currentWinnersCount) bingoCount.current = evaluationWinnersCount;
    }

    const toggleCell = (key : number, state: boolean) : void => {
        const tempCellKey = cellKey.concat();
        tempCellKey.splice(key, 1, state);
        isWinner(tempCellKey);
        setCellKey(tempCellKey);
    }

    

    return {
        cellKey,
        toggleCell,
        setCellKey,
        celebrate,
        DEFAULT_KEY_SET
    }
}
