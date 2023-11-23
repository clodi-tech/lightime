import React, { useState, useEffect } from 'react';

function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1); // update every millisecond

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <p>
      {`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}.${time.getMilliseconds()}`}
    </p>
  );
}

export default App;