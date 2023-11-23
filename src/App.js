import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 100); // frequency of update

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
      {`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}.${Math.floor(time.getMilliseconds() / 100)}`}
      </header>
    </div>
  );
}

export default App;