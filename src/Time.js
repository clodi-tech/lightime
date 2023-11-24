import React, { useState, useEffect } from 'react';
import iconTime from './time.svg';

function Time() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 100); // update every 100 milliseconds

        return () => {
            clearInterval(interval);
        };
    }, []);

    const formatTime = (date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const tenths = Math.floor(date.getMilliseconds() / 100).toString();

        return (
            <p className='row big'>
                <img src={iconTime} alt='clock icon' className='icon-big' />
                {hours}:{minutes}:{seconds}{tenths}
            </p>
            );
    };

    return <p>{formatTime(time)}</p>;
}

export default Time;