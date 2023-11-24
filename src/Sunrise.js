import React, { useState, useEffect } from 'react';
import { getSunrise } from 'sunrise-sunset-js';
import iconSunrise from './sunrise.svg';
import './index.css';

function Sunrise({ latitude, longitude }) { // use latitude and longitude props
    const [sunrise, setSunrise] = useState(null);

    useEffect(() => {
        const sunriseTime = getSunrise(latitude, longitude);
        setSunrise(sunriseTime.toLocaleTimeString());
    }, [latitude, longitude]); // recalculate sunrise time when latitude or longitude changes

    return (
        <p className='row mid medium'>
            <img src={iconSunrise} alt='sunrise icon' className='icon' />
            {sunrise ? sunrise : 'Calculating sunrise time...'}
        </p>
    );
}

export default Sunrise;