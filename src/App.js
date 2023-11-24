import React from 'react';
import './App.css';
import Clock from './Clock';
import Sunrise from './Sunrise';
import Sunset from './Sunset';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Sunrise />
        <Clock />
        <Sunset />
      </header>
    </div>
  );
}

export default App;