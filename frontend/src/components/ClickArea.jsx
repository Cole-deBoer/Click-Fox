import React, {useState} from "react";

const ClickArea = ({gameMode = (<></>), clickCount = 0, isGameActive = false, setGameActive = () => {}, incrementClickCount = () => {}}) => {
    return (
        <div className="w-auto max-w-6xl h-auto mx-auto my-12 py-72 flex rounded-xl bg-gray-200 cursor-pointer" onClick={() => {
                setGameActive();
                incrementClickCount();
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