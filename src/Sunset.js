import React, { useState, useEffect } from 'react';
import { getSunset } from 'sunrise-sunset-js';
import iconSunset from './sunset.svg';
import './index.css';

function Sunset() {
    const [Sunset, setSunset] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const sunriseTime = getSunset(latitude, longitude);

        setSunset(sunriseTime.toLocaleTimeString());
    });
}, []);

    return (
        <p>
            <img src={iconSunset} alt='sunset icon' className='icon'/>
            {Sunset ? Sunset : 'calculating sunset time...'}
        </p>
    );
}

export default Sunset;