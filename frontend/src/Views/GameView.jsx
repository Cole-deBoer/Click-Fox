import React, {useState} from "react";
import GameModesBar from "../components/GameModesBar";
import ClickArea from "../components/ClickArea";
import Results from "../components/Results";
import Countdown from "../components/Countdown"
import { GameModes, Time, Clicks, Zen } from "../GameModes";
import ClickThreshold from "../components/ClickThreshold";


const GameView = () => {
    const [shouldShowResults, setShouldShowResults] = useState(false);
    const [clickCount, setClickCount] = useState(1);
    const [gameMode, setGameMode] = useState(GameModes[0]);
    const [gameSetting, setGameSetting] = useState(0);
    const [gameDuration, setGameDuration] = useState(0);
    const [isGameActive, setGameActive] = useState(false);

    const contentToDisplay = () => {
        switch (gameMode) {
            case Time:
                return (
                    <Countdown duration={gameMode.Settings[gameSetting]} 
                    callback={() => {
                        setShouldShowResults(true);
                        setGameActive(false);
                    }}
                    setGameDuration={setGameDuration}/>
                );
            case Clicks:
                return (
                    <ClickThreshold currentClicks={clickCount} clicksNeeded={gameMode.Settings[gameSetting]}
                    callback={() => {
                        setGameActive(false);
                        setShouldShowResults(true);
                    }}
                    setGameDuration={setGameDuration}/>
                );
            case Zen:
                return (
                    <>
                        Zen
                    </>
                );
        };
    }
    
    const resultsToDisplay = () => {
        switch (gameMode) {
            case Time:
                return (
                        <Results clickCount={clickCount} 
                            testDuration={gameDuration} 
                            testType={gameMode.Title}
                            showGameScreen={() => setShouldShowResults(false)}
                            clearClickCount={() => setClickCount(1)}
                        />
                    );
                case Clicks:
                    return (
                        
                        <Results clickCount={clickCount} 
                            testDuration={gameDuration} 
                            testType={gameMode.Title}
                            showGameScreen={() => setShouldShowResults(false)}
                            clearClickCount={() => setClickCount(1)}
                        />
                    );
            case Zen:
                return (
                    <>
                        Zen
                    </>
                );
        };
    }

    return (
        <div className="h-4/6 2xl:scale-110 content-center">  
            {shouldShowResults ?
            <>
                {resultsToDisplay()}
            </> 
            :
            <>
                <GameModesBar 
                    gameMode={gameMode} 
                    setGameMode={(value) => setGameMode(value)} 
                    gameSetting={gameSetting} 
                    setGameSetting={(value) => setGameSetting(value)}
                    resetGameActive={() => setGameActive(false)}
                />
                
                <ClickArea 
                    gameMode={contentToDisplay()}
                    clickCount={clickCount} 
                    isGameActive={isGameActive}
                    setGameActive={() => setGameActive(true)}
                    incrementClickCount={() => {setClickCount(prevCount => prevCount + 1)}}       
                />                                        
            </>}
        </div>
    );
}

export default GameView;