import React, { useState, useEffect } from 'react';

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
    <p>
      {`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}.${Math.floor(time.getMilliseconds() / 100)}`}
    </p>
  );
}

export default App;