import React, { useState, useEffect } from 'react';
import { getSunrise } from 'sunrise-sunset-js';

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
            {sunrise ? `Sunrise time: ${sunrise}` : 'Calculating sunrise time...'}
        </p>
    );
}

export default Sunrise;