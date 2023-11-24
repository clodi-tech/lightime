import React, { useState, useEffect } from 'react';
import { getSunrise } from 'sunrise-sunset-js';
import iconSunrise from './sunrise.svg';
import './index.css';

function Sunrise() {
    const [sunrise, setSunrise] = useState(null);

    useEffect(() => {
        const latitude = 40.7128; // replace with your latitude
        const longitude = -74.0060; // replace with your longitude
        const sunriseTime = getSunrise(latitude, longitude);

        setSunrise(sunriseTime.toLocaleTimeString());
    }, []);

    return (
        <p>
            <img src={iconSunrise} alt='sunrise icon' className='icon' />
            {sunrise ? sunrise : 'calculating sunrise time...'}
        </p>
    );
}

export default Sunrise;