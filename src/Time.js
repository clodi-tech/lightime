import React from 'react';

function Time({ lastEvent }) {
  const timePassed = lastEvent ? Math.floor((new Date() - lastEvent.time) / 1000 / 60) : null;

  return (
    <div>
      {timePassed !== null ? `Time passed since last event: ${timePassed} minutes` : 'Calculating time...'}
    </div>
  );
}

export default Time;