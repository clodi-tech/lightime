import React, { useState, useEffect } from 'react';
import { getSunset } from 'sunrise-sunset-js';
import iconSunset from './sunset.svg';

function Sunset() {
    const [Sunset, setSunset] = useState(null);

    useEffect(() => {
        const latitude = 40.7128; // replace with your latitude
        const longitude = -74.0060; // replace with your longitude
        const SunsetTime = getSunset(latitude, longitude);

        setSunset(SunsetTime.toLocaleTimeString());
    }, []);

    return (
        <p>
            <img src={iconSunset} alt='Sunset' />
            {Sunset ? Sunset : 'Calculating Sunset time...'}
        </p>
    );
}

export default Sunset;