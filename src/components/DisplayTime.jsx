import React from 'react';

const validate = (time) => (time >= 10) ? time : '0' + time;

const DisplayTime = ({time}) => {
  return (
    <div>
      <p className='displayed'>
        {validate(Math.floor(time / 3600))} : {validate(Math.floor(time / 60))} : {validate(time % 60)}
      </p>
    </div>
  );
}

export default DisplayTime;
