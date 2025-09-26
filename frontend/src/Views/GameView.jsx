import React, {useState} from "react";
import GameModesBar from "../components/GameModesBar";
import ClickArea from "../components/ClickArea";
import Results from "../components/Results";
import Countdown from "../components/Countdown"
import { GameModes } from "../GameModes";


const GameView = () => {
    const [shouldShowResults, setShouldShowResults] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [gameMode, setGameMode] = useState(GameModes[0]);
    const [gameSetting, setGameSetting] = useState(0);


    return (
        <div className="h-4/6 2xl:scale-110 content-center">  
            {shouldShowResults ?
            <div className="w-full h-full">
                <Results clickCount={clickCount} 
                    testDuration={gameMode.Settings[gameSetting]} 
                    testType={gameMode.Title}
                    showGameScreen={() => setShouldShowResults(false)}
                    clearClickCount={() => setClickCount(0)}
                />
            </div> :
            <>
                <div>
                    <GameModesBar 
                        gameMode={gameMode} 
                        setGameMode={(value) => setGameMode(value)} 
                        gameSetting={gameSetting} 
                        setGameSetting={(value) => setGameSetting(value)}
                    />
                </div>

                <div className="w-full">
                    <ClickArea 
                        gameMode={<Countdown duration={gameMode.Settings[gameSetting]} 
                        callback={() => setShouldShowResults(true)}/>} 
                        setGameFinished={setShouldShowResults}  
                        clickCount={clickCount} 
                        incrementClickCount={() => {setClickCount(prevCount => prevCount + 1)}}       
                    />                                        
                </div>
            </>}
        </div>
    );
}

export default GameView;