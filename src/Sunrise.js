import React, { useState, useEffect } from 'react';
import { getSunrise } from 'sunrise-sunset-js';
import iconSunrise from './sunrise.svg';
import './index.css';

function Sunrise() {
    const [sunrise, setSunrise] = useState(null);

    useEffect(() => {
            navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const sunriseTime = getSunrise(latitude, longitude);

            setSunrise(sunriseTime.toLocaleTimeString());
        });
    }, []);

    return (
        <p>
            <img src={iconSunrise} alt='sunrise icon' className='icon' />
            {sunrise ? sunrise : 'calculating sunrise time...'}
        </p>
    );
}

export default Sunrise;