import React, { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 100); // update every 100 milliseconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      {`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}.${Math.floor(time.getMilliseconds() / 100)}`}
    </div>
  );
}

export default Clock;