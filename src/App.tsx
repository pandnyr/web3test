import React from 'react';
import logo from './logo.svg';
import './App.css';
import Connect2Phantom from './components/Connect2Phantom';
import { Wallet } from './components/Wallets';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <nav className="nav">
        <h1>Web3Test</h1>
        <a><Wallet></Wallet></a>
        </nav>
      </header>
    </div>
  );
}

export default App;
