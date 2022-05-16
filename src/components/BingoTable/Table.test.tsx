import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react';
import Table from "./Table"
import {
    getByRowgroupType,
    getAllCells,
    getAllRows
  } from 'testing-library-table-queries';



describe("Bingo Table Body", () => {
    const setup = () => render(<Table />);
    
    const getBody = (container:  HTMLElement) => getByRowgroupType(container, 'tbody');
    test("is loading properly.", async () => {
        const { container } = setup();
        const tableBody = getBody(container);
        setTimeout( async() => {
            await waitFor(() => {
                expect(getAllCells(tableBody)).toHaveLength(25);
            })
        }, 100)
        
    });

    test("has a Free block in the center", async () => {
        const { container } = setup();
        setTimeout(async () => {
            await waitFor( () => {
                expect(getAllCells(container)[17]).toHaveTextContent("FREE");
            })
        }, 100)
        
    });

    test("has 5 rows & 5 columns", async () => {
        const { container } = setup();
        const tableBody = getBody(container);
        setTimeout(async () => {
            const tableColumns = getAllCells(getAllRows(tableBody)[0]);
            await waitFor( () => {
                expect(getAllRows(tableBody)).toHaveLength(5);
            })
            await waitFor( () => {
                expect(tableColumns).toHaveLength(5);
            })
            
        }, 100)
    });
})


