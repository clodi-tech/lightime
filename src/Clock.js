import React, { useState, useEffect } from 'react';
import { getSunrise, getSunset } from 'sunrise-sunset-js';
import Time from './Time';
import Next from './Next';
import iconLocation from './location.svg';
import iconSunrise from './sunrise.svg';
import iconSunset from './sunset.svg';

function Clock() {
    const [coords, setCoords] = useState(null);
    const [lastEvent, setLastEvent] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCoords({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        });
    }, []);

    useEffect(() => {
        if (coords) {
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);

            const sunriseToday = getSunrise(coords.latitude, coords.longitude);
            const sunsetToday = getSunset(coords.latitude, coords.longitude);
            const sunsetYesterday = getSunset(coords.latitude, coords.longitude, yesterday);

            if (today > sunriseToday && today > sunsetToday) {
                setLastEvent({ event: 'Sunset', time: sunsetToday, icon: iconSunset });
            } else if (today > sunriseToday) {
                setLastEvent({ event: 'Sunrise', time: sunriseToday, icon: iconSunrise });
            } else {
                setLastEvent({ event: 'Sunset', time: sunsetYesterday, icon: iconSunset });
            }
        }
    }, [coords]);

    return (
        <div>
            {coords ? (
                <>
                    <p className='row dark small'>
                        <img src={iconLocation} alt='location icon' className='icon-small' />
                        {coords.latitude} {coords.longitude}
                    </p>
                    {lastEvent ? (
                        <p className='row mid medium'>
                            <img src={lastEvent.icon} alt='last icon' className='icon-medium' />
                            last {lastEvent.event}
                        </p>
                    ) : (
                        'Getting last event...'
                    )}
                    <Time lastEvent={lastEvent} />
                    <Next latitude={coords.latitude} longitude={coords.longitude} />
                </>
            ) : (
                'Getting location...'
            )}
        </div>
    );
}

export default Clock;