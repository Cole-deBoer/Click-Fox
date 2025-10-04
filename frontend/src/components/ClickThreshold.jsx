import React, { useEffect, useState } from "react";

let timeElapsed = new Date().getTime();
const ClickThreshold = ({currentClicks = 0, clicksNeeded = 0, callback = () => {}, setGameDuration = () => {}}) => {

    // used empty dependancy array so that this gets called only on mount of this component.
    useEffect(() => {
        timeElapsed = new Date().getTime();
    }, []);

    // didnt include dependancy array to that this gets triggered with every re-render
    // doing this prevents an error regarding changing the state of the parent component.
    useEffect(() => {
        if(currentClicks === clicksNeeded) 
        {
            setGameDuration(((new Date().getTime() - timeElapsed) / 1000).toFixed(2));
            callback?.();
        }
    })
    return (
        <>
        </>
    )
}

export default ClickThreshold;