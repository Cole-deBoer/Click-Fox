import React from "react";
import { GameMode } from "../GameModes";
import Button from "./Button";

const Results = ({clickCount = 0, testDuration = 0, testType = GameMode, showGameScreen = () => {}, clearClickCount = () => {}}) => {
    return (
        <div className="w-full h-5/6 m-0 mt-28 p-0">
            <div className="w-full h-5/6 flex justify-center">
                {/* Left Column */}
                <div className="flex-col w-1/6 h-1/2 text-start">
                    <div className="h-1/2 mb-12 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                        <p className="text-3xl">cps</p>
                        <b className="text-4xl">{clickCount / testDuration}</b>
                        <p className="text-3xl">total clicks</p>
                        <b className="text-4xl">{clickCount}</b>
                    </div>
                    <div className="h-1/2 text-xl">
                        <p>test type</p>
                        <b>{testType}</b>
                    </div>
                </div>

                <div className="w-4/6 h-1/2">
                    {/* Graph View */}
                    <div className=" h-1/2 py-16 bg-gray-200 justify-center text-center">
                        <p className="">This will be a graph</p>
                    </div>

                    <div className="w-full h-1/2 mt-12 text-xl text-end">
                        <p>test duration</p>
                        <b>{testDuration}s</b>
                    </div>             
                </div>
            </div>

            {/* Actions */}
            <div className="w-full h-1/6 mt-16 flex justify-center">
                <div className="flex">
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
        </div>
    )
}

export default Results;