import React, { useState, useEffect } from 'react';
import { getSunrise, getSunset } from 'sunrise-sunset-js';
import iconSunrise from './sunrise.svg';
import iconSunset from './sunset.svg';

function Next({ latitude, longitude }) {
    const [nextEvent, setNextEvent] = useState(null);

    useEffect(() => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const sunriseToday = getSunrise(latitude, longitude);
        const sunsetToday = getSunset(latitude, longitude);
        const sunriseTomorrow = getSunrise(latitude, longitude, tomorrow);

        if (today < sunriseToday) {
            setNextEvent({ event: 'sunrise', time: sunriseToday, icon: iconSunrise });
        } else if (today < sunsetToday) {
            setNextEvent({ event: 'sunset', time: sunsetToday, icon: iconSunset });
        } else {
            setNextEvent({ event: 'sunrise', time: sunriseTomorrow, icon: iconSunrise });
        }
    }, [latitude, longitude]);

    return (
        <div>
            {nextEvent ? (<p className='row mid medium'>
                <img src={nextEvent.icon} alt='next icon' className='icon-medium' />
                next {nextEvent.event}
            </p>) : 'Getting next event...'}
        </div>
    );
}

export default Next;