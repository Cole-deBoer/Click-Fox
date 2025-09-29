import React, { useEffect, useState } from "react";

let timeElapsed = new Date().getTime();
const ClickThreshold = ({currentClicks = 0, clicksNeeded = 0, callback = () => {}, setGameDuration = () => {}}) => {

    useEffect(() => {
        timeElapsed = new Date().getTime();
    }, []);

    if(currentClicks === clicksNeeded) 
    {
        callback?.();
        setGameDuration((new Date().getTime() - timeElapsed) / 1000);
    }

    return (
        <>
        </>
    )
}

export default ClickThreshold;