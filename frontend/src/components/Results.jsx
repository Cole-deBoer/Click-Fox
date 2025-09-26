import React from "react";
import { GameMode } from "../GameModes";
import Button from "./Button";

const Results = ({clickCount = 0, testDuration = 0, testType = GameMode, showGameScreen = () => {}, clearClickCount = () => {}}) => {
    return (
        <div className="w-full h-full m-0 p-0 content-center">
            {/* Top Section */}
            <div className="w-full h-full flex justify-center">
                <div className="flex flex-col min-h-max w-1/6 text-start">
                    <div className="h-1/2 content-around">
                        <div className="h-1/2">
                            <p className="text-3xl">cps</p>
                            <b className="text-5xl">{clickCount / testDuration}</b>
                        </div>

                        <div className="h-1/2">
                            <p className="text-3xl">total clicks</p>
                            <b className="text-5xl">{clickCount}</b>
                        </div>
                    </div>
                    <div className="h-1/2 text-xl">
                        <p>test type</p>
                        <b>{testType}</b>
                    </div>
                </div>

                <div className="w-4/6">
                    {/* Graph View */}
                    <div className=" h-1/2 py-16 bg-gray-200 content-center text-center">
                        <p className="">This will be a graph</p>
                    </div>

                    <div className="w-full h-1/2 text-xl text-end">
                        <p>test duration</p>
                        <b>{testDuration}s</b>
                    </div>             
                </div>
            </div>

            {/* Actions */}
            <div className="w-full h-1/6 flex justify-center">
                <Button content={
                    <b onClick={() => {
                        showGameScreen();
                        clearClickCount();
                    }}>
                        next test
                    </b>
                } />
            </div>
        </div>
    )
}

export default Results;