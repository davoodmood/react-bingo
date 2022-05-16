import React, { useState } from 'react';
import BingoTable from './components/BingoTable';
import BingoGrid from './components/BingoGrid';
import {useCell} from "./context/BingoContext"
import BingoCheer from './components/BingoCheer';
import './App.css';

function App() {
  const {celebrate, DEFAULT_KEY_SET, setCellKey} = useCell();
  const [isModernTheme, setIsModernTheme] = useState<boolean>(true);

  function toggleTheme() {
    setIsModernTheme((prevTheme: boolean) => !prevTheme)
    setCellKey(DEFAULT_KEY_SET);
  }
  return (
    <div className="App">
      { celebrate && (
        <div className='cheer'>
          <BingoCheer />
        </div>
      )}
      <section className="mainContainer">
        <div className='infoBar'>
          <div>
            
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" className='btn' onClick={toggleTheme}>Switch Theme</a>
          </div>
          <div>
            {
              celebrate ?  
                (<p className='header'>Happy Winning!</p>)
                :
                (<p className='header'>Let's rock the BINGO.</p>)
            }
          </div>          
        </div>
        {
          isModernTheme ? 
          (<BingoGrid />)
          :
          (<BingoTable />)
        }
      </section>
    </div>
  );
}

export default App;
