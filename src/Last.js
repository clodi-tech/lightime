import React, { useState, useEffect } from 'react';
import { getSunrise, getSunset } from 'sunrise-sunset-js';
import iconSunrise from './sunrise.svg';
import iconSunset from './sunset.svg';

function Last({ latitude, longitude }) {
    const [lastEvent, setLastEvent] = useState(null);

    useEffect(() => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const sunriseToday = getSunrise(latitude, longitude);
        const sunsetToday = getSunset(latitude, longitude);
        const sunsetYesterday = getSunset(latitude, longitude, yesterday);

        if (today > sunsetToday) {
            setLastEvent({ event: 'sunset', time: sunsetToday, icon: iconSunset });
        } else if (today > sunriseToday) {
            setLastEvent({ event: 'sunrise', time: sunriseToday, icon: iconSunrise });
        } else {
            setLastEvent({ event: 'sunset', time: sunsetYesterday, icon: iconSunset });
        }
    }, [latitude, longitude]);

    return (
        <div>
            {lastEvent ? (<p className='row mid medium'>
                <img src={lastEvent.icon} alt='last icon' className='icon-medium' />
                last {lastEvent.event}
            </p>) : 'Getting last event...'}
        </div>
    );
}

export default Last;