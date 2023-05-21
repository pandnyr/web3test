import React from 'react';
import logo from './logo.svg';
import './App.css';
import Connect2Phantom from './components/Connect2Phantom';
import { Wallet } from './components/Wallets';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Web3Test</h1>
        <hr className="fullWidth" />
        <Connect2Phantom></Connect2Phantom>

      </header>
    </div>
  );
}

export default App;
