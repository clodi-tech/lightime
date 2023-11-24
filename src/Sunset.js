import React, { useState, useEffect } from 'react';
import { getSunset } from 'sunrise-sunset-js';
import iconSunset from './sunset.svg';
import './index.css';

function Sunset({ latitude, longitude }) { // use latitude and longitude props
    const [sunset, setSunset] = useState(null);

    useEffect(() => {
        const sunsetTime = getSunset(latitude, longitude);
        setSunset(sunsetTime.toLocaleTimeString());
    }, [latitude, longitude]); // recalculate sunset time when latitude or longitude changes

    return (
        <p>
            <img src={iconSunset} alt='sunset icon' className='icon'/>
            {sunset ? sunset : 'Calculating sunset time...'}
        </p>
    );
}

export default Sunset;