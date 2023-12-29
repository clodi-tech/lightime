import React, { useState, useEffect } from 'react';
import { getSunrise, getSunset } from 'sunrise-sunset-js';
import iconLocation from './location.svg';
import iconSunrise from './sunrise.svg';
import iconSunset from './sunset.svg';
import iconElapsed from './elapsed.svg';
import iconRemaining from './remaining.svg';

function Clock() {
    const [coords, setCoords] = useState(null);
    const [lastEvent, setLastEvent] = useState(null);
    const [nextEvent, setNextEvent] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [remainingTime, setRemainingTime] = useState(0);
    const [elapsedFormat, setElaFormat] = useState('t');
    const [remainingFormat, setRemFormat] = useState('t');
    const [showLast, setShowLast] = useState(false);
    const [showNext, setShowNext] = useState(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => setCoords({ latitude, longitude }),
            ({ code, message }) => alert(`Error: ${code} - ${message}`)
        );
    }, []);

    const setEvent = (event, time, icon) => ({ event, time, icon });

    useEffect(() => {
        if (coords) {
            const today = new Date();
            const yesterday = new Date(today);
            const tomorrow = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            tomorrow.setDate(tomorrow.getDate() + 1);

            const sunriseToday = getSunrise(coords.latitude, coords.longitude);
            const sunsetToday = getSunset(coords.latitude, coords.longitude);
            const sunsetYesterday = getSunset(coords.latitude, coords.longitude, yesterday);
            const sunriseTomorrow = getSunrise(coords.latitude, coords.longitude, tomorrow);

            setLastEvent(
                today > sunsetToday
                    ? setEvent('sunset', sunsetToday, iconSunset)
                        : today > sunriseToday
                        ? setEvent('sunrise', sunriseToday, iconSunrise)
                            : setEvent('sunset', sunsetYesterday, iconSunset)
            );

            setNextEvent(
                today < sunriseToday
                    ? setEvent('sunrise', sunriseToday, iconSunrise)
                        : today < sunsetToday
                        ? setEvent('sunset', sunsetToday, iconSunset)
                            : setEvent('sunrise', sunriseTomorrow, iconSunrise)
            );
        }
    }, [coords]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            if (lastEvent) {
                setElapsedTime(Math.floor((now - lastEvent.time) / 100));
            }
            if (nextEvent) {
                setRemainingTime(Math.floor((nextEvent.time - now) / 100));
            }
        }, 100);
        return () => clearInterval(interval);
    }, [lastEvent, nextEvent]);

    const toggleFormat = (format, setFormat) => () => setFormat(format === 't' ? 'hms' : 't');

    const toggleElaFormat = toggleFormat(elapsedFormat, setElaFormat);
    const toggleRemFormat = toggleFormat(remainingFormat, setRemFormat);

    const formatTime = (time, format) => {
        if (format === 't') {
            return time;
        } else {
            const timeInSeconds = time / 10;
            const hours = Math.floor(timeInSeconds / 3600).toString().padStart(2, '0');
            const minutes = Math.floor((timeInSeconds % 3600) / 60).toString().padStart(2, '0');
            const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
            const tenths = time % 10; // get the remaining tenths of a second
            return `${hours}:${minutes}:${seconds}${tenths}`;
        }
    };

    const formatElapsed = (time) => formatTime(time, elapsedFormat);
    const formatRemaining = (time) => formatTime(time, remainingFormat);

    const toggle = (setter) => () => setter(state => !state);

    const toggleShowLast = toggle(setShowLast);
    const toggleShowNext = toggle(setShowNext);

    return (
        <div>
            <p className='row mid extra-small'>
                a project by&nbsp;<a href='https://sonolibero.io' target='_blank' rel='noopener noreferrer' className='light'>libero</a>
            </p>
            {coords ? (
                <>
                    <p className='row dark small'>
                        <span className='tooltip'>
                            <img src={iconLocation} alt='location icon' className='icon-small' />
                            <span className='tooltiptext'>your current location</span>
                        </span>
                        {coords.latitude.toFixed(5)} {coords.longitude.toFixed(5)}
                    </p>
                    {lastEvent ? (
                        <div>
                            <p className='row mid medium'>
                                <span className='tooltip'>
                                    <img src={lastEvent.icon} alt='last icon' className='icon-medium' />
                                    <span className='tooltiptext'>last event</span>
                                </span>
                                <span onClick={toggleShowLast}>
                                    {showLast ? lastEvent.time.toLocaleTimeString() : lastEvent.event}
                                </span>
                            </p>
                            <p className='row white big'>
                                <span className='tooltip'>
                                    <img src={iconElapsed} alt='elapsed icon' className='icon-big' />
                                    <span className='tooltiptext'>time passed from the last event</span>
                                </span>
                                <span onClick={toggleElaFormat}>{formatElapsed(elapsedTime)}</span>
                            </p>
                        </div>
                    ) : (
                        'Getting last event...'
                    )}
                    {nextEvent ? (
                        <div>
                            <p className='row white big'>
                                <span className='tooltip'>
                                    <img src={iconRemaining} alt='remaining icon' className='icon-big' />
                                    <span className='tooltiptext'>time remaining to the next event</span>
                                </span>
                                <span onClick={toggleRemFormat}>{formatRemaining(remainingTime)}</span>
                            </p>
                            <p className='row mid medium'>
                                <span className='tooltip'>
                                    <img src={nextEvent.icon} alt='next icon' className='icon-medium' />
                                    <span className='tooltiptext'>next event</span>
                                </span>
                                <span onClick={toggleShowNext}>
                                    {showNext ? nextEvent.time.toLocaleTimeString() : nextEvent.event}
                                </span>
                            </p>
                        </div>
                    ) : (
                        'Getting next event...'
                    )}
                </>
            ) : (
                'Getting location...'
            )}
        </div>
    );
}

export default Clock;