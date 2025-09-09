import React from "react";
import Button from "./Button";

function GameModesBar() {
    return (
        <div className="w-5/6 h-auto mx-auto p-2 flex rounded-lg bg-gray-200">

            {/* Game Modes */}
            <div className="w-full p-0 m-0 flex justify-evenly ">
                <b>
                    🕘 Time
                </b>
                <b>
                    🖱 Clicks
                </b>
                <b>
                    🚥 Reaction
                </b>
            </div>

            {/* Border */}
            <div className="w-1 mx-8 p-0 rounded-sm bg-gray-500"/>
            
            {/* Game Settings */}
            <div className="w-2/5 p-0 m-0 flex  justify-evenly ">
                <b>
                    1
                </b>
                <b>
                    5
                </b>
                <b>
                    10
                </b>
            </div>
        </div>
    );
}

export default GameModesBar;