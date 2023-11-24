import React, { useState, useEffect } from 'react';
import Time from './Time';
import iconLocation from './location.svg';
import Last from './Last';
import Next from './Next';

function Clock() {
    const [coords, setCoords] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCoords({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        });
    }, []);

    return (
        <div>
            {coords ? (
                <>
                    <p className='row dark small'>
                        <img src={iconLocation} alt='location icon' className='icon-small' />
                        {coords.latitude} {coords.longitude}
                    </p>
                    <Last latitude={coords.latitude} longitude={coords.longitude} />
                    <Time />
                    <Next latitude={coords.latitude} longitude={coords.longitude} />
                </>
            ) : (
                'Getting location...'
            )}
        </div>
    );
}

export default Clock;