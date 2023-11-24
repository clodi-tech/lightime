import React, { useState, useEffect } from 'react';
import Sunrise from './Sunrise';
import Sunset from './Sunset';
import Time from './Time';
import iconLocation from './location.svg';

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
                    <Sunrise latitude={coords.latitude} longitude={coords.longitude} />
                    <p className='row dark small'>
                        <img src={iconLocation} alt='location icon' className='icon' />
                        {coords.latitude} {coords.longitude}
                    </p>
                    <Time />
                    <Sunset latitude={coords.latitude} longitude={coords.longitude} />
                </>
            ) : (
                'Getting location...'
            )}
        </div>
    );
}

export default Clock;