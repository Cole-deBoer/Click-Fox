import React from "react";
import { GameMode } from "../GameModes";
import Button from "./Button";

const Results = ({clickCount = 0, testDuration = 0, testType = GameMode, showGameScreen = () => {}, clearClickCount = () => {}}) => {
    return (
        <div className="w-full h-full m-0 p-0 content-center">
            {/* Top Section */}
            <div className="w-full h-full flex justify-center">
                <div className="flex flex-col min-h-max w-1/6 text-start">
                    <div className="h-1/2 mb-12 content-around">
                        <div className="h-1/2">
                            <p className="text-3xl 2xl:text-4xl">cps</p>
                            <b className="text-5xl 2xl:text-6xl">{clickCount / testDuration}</b>
                        </div>

                        <div className="h-1/2">
                            <p className="text-3xl 2xl:text-4xl">total clicks</p>
                            <b className="text-5xl 2xl:text-6xl">{clickCount}</b>
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

                    <div className="w-full h-1/2 mt-12 text-xl text-end">
                        <p>test duration</p>
                        <b>{testDuration}s</b>
                    </div>             
                </div>
            </div>

            {/* Actions */}
            <div className="w-full flex justify-center">
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