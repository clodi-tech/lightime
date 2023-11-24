import React from 'react';
import './App.css';
import Clock from './Clock';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>sunrise time</p>
        <Clock />
        <p>sunset time</p>
      </header>
    </div>
  );
}

export default App;