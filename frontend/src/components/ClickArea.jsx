import React  from "react";
import ClickSpark from "./ClickSpark";

const ClickArea = ({gameMode = (<></>), clickCount = 0, isGameActive = false, setGameActive = () => {}, handleClick = () => {}}) => {
    return (
        <ClickSpark>
            <button type="button" className="w-full max-w-6xl h-auto mx-auto my-12 py-72 flex rounded-xl bg-zinc-700 cursor-pointer"
                onClick={() => {
                    if(!isGameActive) {
                        setGameActive();
                    }
                    handleClick();
                }}
                aria-label={isGameActive ? `Current clicks: ${clickCount}, Game mode: ${gameMode.props.children}` : "Click here to start the game"}>

                <div className="w-full h-0 text-center text-3xl text-gray-500 select-none">
                    <p>
                        {isGameActive ? 
                        <>
                            {gameMode}
                            <p>{clickCount}</p>
                        </> :
                        <>
                            Click Here                            
                        </>}
                    </p>
                </div>
            </button>
        </ClickSpark>
    )
};

export default ClickArea;