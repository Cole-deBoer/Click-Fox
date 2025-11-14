import React, { useContext } from "react";
import { GameMode } from "../GameModes";
import Button from "./Button";
import ResultsGraph from "./ResultsGraph";
import continueIcon from "../Assets/chevron-right.svg";
import { useEffect } from "react";
import UpdateUserStats from "../Requests/UpdateUserStats";
import { AuthContext } from "../Context/AuthContext";


const Results = ({clickCount = 0, testDuration = 0.1, testType = GameMode.title,
                 showGameScreen = () => {}, clearClickCount = () => {}, clickArray = []}) => {

    const auth = useContext(AuthContext);

    useEffect(() => {
        const postResults = async () => {
            let statName = '';
            let statValue = (clickCount / testDuration).toFixed(2);

            
            if (testType == "Time") {
                switch (testDuration) {
                    case 1:
                        statName = "maxCPSOneSecond";
                        break;
                    case 5: 
                        statName = "maxCPSFiveSeconds";
                        break;
                    case 10:
                        statName = "maxCPSTenSeconds";
                        break;
                    default:
                        console.warn("game duration is invalid");
                }
            }
            if (testType == "Clicks") {
                switch (clickCount) {
                    case 5:
                        statName = "maxCPSFiveClicks";
                        break;
                    case 10: 
                        statName = "maxCPSTenClicks";
                        break;
                    default:
                        console.warn(`game duration is invalid game duration: ${clickCount}`)
                }
            }

            if (!statName) {
                console.warn("Could not determine statName for current game mode and duration.");
                return;
            }
            
            UpdateUserStats(auth.currentUser.email, statName, statValue, auth.currentUser.accessToken, true);
        }
        postResults();
    }, [testType, testDuration, clickCount]);

    return (
        <div className="w-full 2xl:w-5/6 mx-auto p-4 flex flex-col items-center justify-center gap-8">
            {/* Top Section */}
            <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-8">
                <div className="flex flex-col w-full md:w-1/6 lg:w-1/6 text-center md:text-start">
                    {/* cps text and value & test type and value*/}
                    <div className="h-full content-center select-none">
                        <div className="h-1/2">
                            <p className="text-4xl 2xl:text-5xl text-zinc-500">cps</p>
                            <b className="text-6xl 2xl:text-7xl">{(clickCount / testDuration).toFixed(2)}</b>
                        </div>

                        <div className="h-1/2">
                            <p className="text-4xl 2xl:text-5xl text-zinc-500">total clicks</p>
                            <b className="text-6xl 2xl:text-7xl">{clickCount}</b>
                        </div>
                    </div>
                </div>

                {/* Graph View */}
                <div className="w-full sm:w-2/3 h-64 sm:h-80 lg:h-96">
                    <ResultsGraph testDuration={testDuration} clickArray={clickArray}/>
                </div>
            </div>

            <div className="w-full flex flex-col sm:flex-row mb-6 justify-around items-center select-none gap-4">
                <div className="w-full sm:w-1/3 2xl:text-center sm:text-start text-lg sm:text-xl">
                    <p className="text-zinc-500">test type</p>
                    <b>{testType}</b>
                </div>

                <div className="w-full sm:w-1/3 2xl:text-center sm:text-end text-lg sm:text-xl">
                    <p className="text-zinc-500">test duration</p>
                    <b>{testDuration}s</b>
                </div>
            </div>

            {/* Actions */}
            <div className="w-2/5 sm:w-1/2 md:w-1/3 mx-auto flex justify-center">
                <div className="w-max">
                    <Button content={
                        <b onClick={() => {
                            showGameScreen();
                            clearClickCount();
                        }}>
                            <img src={continueIcon} alt="continue"/>
                        </b>
                    } />
                </div>
            </div>
        </div>
    )
}



export default Results;