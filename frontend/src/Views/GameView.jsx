import React, {useState, useEffect} from "react";
import GameModesBar from "../components/GameModesBar";
import ClickArea from "../components/ClickArea";
import Results from "../components/Results";
import Countdown from "../components/Countdown"
import { GameModes, Time, Clicks, Zen } from "../GameModes";
import ClickThreshold from "../components/ClickThreshold";
import { AuthContext } from "../Context/AuthContext";



const GameView = () => {
    const [shouldShowResults, setShouldShowResults] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [gameMode, setGameMode] = useState(GameModes[0]);
    const [gameSetting, setGameSetting] = useState(0);
    const [gameDuration, setGameDuration] = useState(0);
    const [isGameActive, setGameActive] = useState(false);

    // for generating the dataset to chart for results graph.
    const [clickTimes, setClickTimes] = useState([]);
    const [clicksPerSecondArray, setCPSArray] = useState([]);
    const [startTime, setStartTime] = useState(0.0);
    
    useEffect(() => {
        document.title = "Click-Fox | Click Speed Test";
        document.querySelector('meta[name="description"]').setAttribute('content', 'Test and improve your mouse clicking speed with various game modes. See how fast you can click!');
        const seconds = Math.ceil(gameDuration);
        
        // Bucket into per-second counts
        let cpsArray = Array(seconds).fill(0);
        clickTimes.forEach(time => {
            const secIndex = Math.floor((time - startTime) / 1000);
            cpsArray[secIndex] += 1;
        });
        cpsArray.push((clickCount / gameDuration).toFixed(2))
        setCPSArray(cpsArray);
    }, [isGameActive]);

    
    const startTest = () => {
        setClickTimes([]);
        setCPSArray([]);
        setStartTime(performance.now());
    };
    
    const handleClick = () => {
        setClickTimes(prev => [...prev, performance.now()]);
        setClickCount(prevCount => prevCount + 1)
    };
    
    const contentToDisplay = () => {
        switch (gameMode) {
            case Time:
                return (
                    <Countdown duration={gameMode.Settings[gameSetting]} 
                    callback={() => {
                        setGameActive(false);
                        setShouldShowResults(true);
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
                    </>
                );
            };
        }
        
    return (
        <main className="h-4/6 2xl:scale-110 content-center">  
            {shouldShowResults ?
            <Results clickCount={clickCount} 
            testDuration={gameDuration} 
            testType={gameMode.Title}
            showGameScreen={() => setShouldShowResults(false)}
            clearClickCount={() => setClickCount(0)}
            clickArray={clicksPerSecondArray}
            />
            :
            <>
                <GameModesBar 
                    gameMode={gameMode} 
                    setGameMode={(value) => setGameMode(value)} 
                    gameSetting={gameSetting} 
                    setGameSetting={(value) => setGameSetting(value)}
                    resetGameActive={() => {
                        setGameActive(false)
                        setClickCount(0);
                    }}
                    />
                
                <ClickArea 
                    gameMode={contentToDisplay()}
                    clickCount={clickCount} 
                    isGameActive={isGameActive}
                    setGameActive={() => {
                        setGameActive(true)
                        startTest();
                    }}
                    handleClick={handleClick}
                />                                        
            </>}
        </main>
    );
}

export default GameView;