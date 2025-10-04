import React, {useState} from "react";

const ClickArea = ({gameMode = (<></>), clickCount = 0, isGameActive = false, setGameActive = () => {},
                   handleClick = () => {}}) => {

    return (
        <div className="w-auto max-w-6xl h-auto mx-auto my-12 py-72 flex rounded-xl bg-zinc-700 cursor-pointer" onClick={() => {
            if(!isGameActive) {
                setGameActive();
            }
            handleClick();
        }}>   

            <div className="w-full h-0 text-center text-3xl text-gray-500 select-none">
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
};

export default ClickArea;


