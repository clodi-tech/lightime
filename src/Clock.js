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

    const formatTime = (timeElement) => timeElement.toString().padStart(2, '0');

    return (
        <p>
            {`${formatTime(time.getHours())}:${formatTime(time.getMinutes())}:${formatTime(time.getSeconds())}${Math.floor(time.getMilliseconds() / 100)}`}
        </p>
    );
}

export default Clock;