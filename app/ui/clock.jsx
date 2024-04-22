'use client';

import { useState, useEffect } from 'react';
import { getSunrise, getSunset } from 'sunrise-sunset-js';
import Image from 'next/image';
import { JetBrains_Mono } from 'next/font/google';
import Cobe from './cobe';

const mono = JetBrains_Mono({ 
    subsets: ["latin"],
    weight: ['300']
});

const icon = 25;
const small = 200;
const large = 400;

export default function Clock() {
    const [coords, setCoords] = useState(null);
    const [last, setLast] = useState(null);
    const [next, setNext] = useState(null);
    const [now, setNow] = useState(0);
    const [then, setThen] = useState(0);
    const [elapsed, setElapsed] = useState(0);
    const [remaining, setRemaining] = useState(0);

    useEffect(() => {
        // navigator.geolocation.getCurrentPosition(
        //     ({ coords: { latitude, longitude } }) => setCoords({ latitude, longitude }),
        //     ({ code, message }) => alert(`Error: ${code} - ${message}`)
        // );
        setCoords({ latitude: 51.5074, longitude: 0.1278 });
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
            const sunsetTomorrow = getSunset(coords.latitude, coords.longitude, tomorrow);

            setLast(
                today > sunsetToday
                    ? setEvent('sunset', sunsetToday, "sunset.svg")
                        : today > sunriseToday
                        ? setEvent('sunrise', sunriseToday, "sunrise.svg")
                            : setEvent('sunset', sunsetYesterday, "sunset.svg")
            );

            setNext(
                today < sunriseToday
                    ? setEvent('sunrise', sunriseToday, "sunrise.svg")
                        : today < sunsetToday
                        ? setEvent('sunset', sunsetToday, "sunset.svg")
                            : setEvent('sunrise', sunriseTomorrow, "sunrise.svg")
            );

            setNow(today > sunsetToday
                ? Math.floor((sunriseTomorrow - sunsetToday) / 1000)
                    : today > sunriseToday
                    ? Math.floor((sunsetToday - sunriseToday) / 1000)
                        : Math.floor((sunriseToday - sunsetYesterday) / 1000));
            
            setThen(today < sunriseToday
                ? Math.floor((sunsetToday - sunriseToday) / 1000)
                    : today < sunsetToday
                    ? Math.floor((sunriseTomorrow - sunsetToday) / 1000)
                        : Math.floor((sunsetTomorrow - sunriseTomorrow) / 1000));
        }
    }, [coords]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            if (last) {
                setElapsed(Math.floor((now - last.time) / 1000));
            }
            if (next) {
                setRemaining(Math.floor((next.time - now) / 1000));
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [last, next]);

    // toogle size of the globe
    const [size, setSize] = useState(small);

    const changeSize = () => {
        setSize(size === large ? small : large);
    };

    return (
        <div className='flex flex-col justify-center items-center'>

            {/* render content with user coordinates */}
            {coords ? (
                <>
                    {/* render globe with changing size */}
                    <div onClick={changeSize}>
                        <Cobe coords={coords} size={size} />
                    </div>

                    {/* render last and next icons */}
                    {last && next && elapsed && remaining && (
                        <div className='flex justify-center items-center gap-2'>
                            <Image src={last.icon} alt={last.event} width={icon} height={icon}/>
                            <div className='flex flex-col justify-center items-center gap-2'>
                                <small>you are having {now} seconds of ZZ</small>
                                <span className={mono.className}>{elapsed} are gone</span>
                                <p>bar</p>
                                <span className={mono.className}>{remaining} ahead</span>
                                <small>before {then} seconds of WW</small>
                            </div>
                            <Image src={next.icon} alt={next.event} width={icon} height={icon}/>
                        </div>
                    )}

                </>
            ) : (
                'Getting location...'
            )}
        </div>
    );
}