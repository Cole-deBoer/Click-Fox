import React, { useState, useEffect } from "react";

const Countdown = ({duration = 0, callback = () => {}, setGameDuration = () => {}}) => {
    const [timeElapsed, setTimeElapsed] = useState(0);
    useEffect(() => {
        // defines the amount of miliseconds between each reload of the browser.
        const tickRate = 40;
        let elapsed = 0;
        const countdownInterval = setInterval(() => {
            // divide by 1000 to add millisecond to the timeElapsed instead of adding seconds.
            elapsed += tickRate / 1000;
            setTimeElapsed(elapsed);

            if(elapsed >= duration) {
                clearInterval(countdownInterval);
                setGameDuration(Math.abs(duration - timeElapsed));
                callback?.();
            }
        }, tickRate);


        // this is to handle unmounting, this acts to clean up the side effects of this function.
        // this avoids duplicate calls to the callback();
        return () => {
            clearInterval(countdownInterval);
        };
    }, [duration])
    return (
        <span>{Math.abs(duration - timeElapsed).toFixed(2)}s</span>
    );
}

export default Countdown;