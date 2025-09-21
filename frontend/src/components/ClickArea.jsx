import React, { useState } from "react";

const ClickArea = ({gameMode = (<></>), setGameFinished = () => {}, clickCount = 0, incrementClickCount = () => {}}) => {
    // sets the game state to inactive, upon click it gets set to active and 
    // the webpage will update according to the state of this variable.
    const [isGameActive, setGameState] = useState(false);

    // Sets a callback to be used once the Countdown has finished.
    const onCountdownFinished = () => {
        setGameState(false);
        setGameFinished(true);
    };

    return (
        <div className="w-auto max-w-6xl h-auto mx-auto my-12 py-72 flex rounded-xl bg-gray-200 cursor-pointer" onClick={() => {
                setGameState(true);
                if(isGameActive == true) {
                    incrementClickCount();
                } 
            }}>   

            <div className="w-full h-0 text-center text-3xl text-gray-400 select-none">
                <h1>
                    {isGameActive ? 
                    <>
                        {gameMode}
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