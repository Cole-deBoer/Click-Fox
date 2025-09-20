import React, { useState, useCallback } from "react";
import Countdown from "./countdown";


const ClickArea = () => {
    // sets the game state to inactive, upon click it gets set to active and 
    // the webpage will update according to the start of this variable.
    const [isGameActive, setGameState] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    // Sets a callback to be used once the Countdown has finished.
    const onCountdownFinished = () => {
        setGameState(false);
        // handle modal pop up
        setClickCount(0);
    };

    return (
        <div className="w-auto max-w-6xl h-auto mx-auto my-12 py-72 flex rounded-xl bg-gray-200 cursor-pointer" onClick={() => {
            setGameState(true);
            if(isGameActive == true) {
                setClickCount(clickCount+1);
            } 
        }}>   
            <div className="w-full h-0 text-center text-3xl text-gray-400 select-none">
                    <h1>
                        {isGameActive ? 
                        <>
                            <Countdown duration={2} callback={() => onCountdownFinished()}/>
                            <p>{clickCount}</p>
                        </> :
                        <>
                            Click Here                            
                        </>}
                    </h1>
            </div>
        </div>
    )
}
export default ClickArea;