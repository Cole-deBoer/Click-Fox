import React from "react";
import { GameMode } from "../GameModes";
import Button from "./Button";
import ResultsGraph from "./ResultsGraph";
import continueIcon from "../Assets/continue-icon.png"


const Results = ({clickCount = 0, testDuration = 0.1, testType = GameMode,
                 showGameScreen = () => {}, clearClickCount = () => {}, clickArray = []}) => {
    return (
        <div className="w-full 2xl:w-5/6 h-full min-h-96 mx-auto p-0 content-around">
            {/* Top Section */}
            <div className="grow w-full h-2/3 flex justify-center">
                <div className="flex flex-col w-1/6 text-start">
                    {/* cps text and value & test type and value*/}
                    <div className="h-full content-center">
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
                <div className="w-2/3 h-5/6">    
                    <ResultsGraph testDuration={testDuration} clickCount={clickCount} clickArray={clickArray}/>
                </div>
            </div>

            <div className="flex mb-6 justify-around">
                <div className="w-1/3 h-1/2 text-xl 2xl:text-2xl">
                    <p className="text-zinc-500">test type</p>
                    <b>{testType}</b>
                </div>

                <div className="w-1/3 h-1/2 text-xl 2xl:text-2xl text-end">
                    <p className="text-zinc-500">test duration</p>
                    <b>{testDuration}s</b>
                </div>             
            </div>

            {/* Actions */}
            <div className="w-2/5 mx-auto flex justify-center">
                <Button content={
                    <b onClick={() => {
                        showGameScreen();
                        clearClickCount();
                    }}>
                        <img width="25" src={continueIcon} alt="continue"/>
                    </b>
                } />
            </div>
        </div>
    )
}



export default Results;