import React, { useState } from "react";
import Button from "./Button";

const Time = {
    Title: "Time",
    Logo: "🕗",
    Settings: [
        1,
        5,
        10,
    ]
};

const Clicks = {
    Title: "Clicks",
    Logo: "🖱",
    Settings: [
        5,
        10,
        20,
    ]
};

const Reaction = {
    Title: "Reaction",
    Logo: "⏰",
    Settings: [
    ]
};

const Zen = {
    Title: "Zen",
    Logo: "🗻",
    Settings: [
    ]
};

const GameModes = [
    Time,
    Clicks,
    Reaction,
    Zen
];

function GameModesBar() {
    // set the first game mode as the selected game mode.
    const [gameMode, setGameMode] = useState(0);

    // set the selected setting to the first setting for the selected game mode.
    const [gameSetting, setGameSetting] = useState(0);

    // checks if the selected game mode has settings to display.
    const HasSettings = (() => {
        return GameModes[gameMode].Settings.length > 0;
    })

    return (
        <div className={`${HasSettings() > 0 ? 'w-5/6' : 'w-2/3'}
                        h-auto mx-auto p-2 flex rounded-lg bg-gray-200 transition-all duration-300`}>

            {/* Game Modes */}
            <div className="w-full p-0 gap-32 flex justify-center ">
                {GameModes.map((mode, key) => (
                    <div key={key} onClick={() => {
                        // sets the game mode to the key of the clicked element
                        setGameMode(key)
                    }}>
                        <Button highlighted={key == gameMode} content={
                            <b>{mode.Logo} {mode.Title}</b>
                        }/>
                    </div>
                ))}
            </div>

            {/* Border */}
            <div className={`${HasSettings() > 0 ? 'w-1 p-0 rounded-sm bg-gray-500' : 'hidden'}`}/>
            
            {/* Game Settings */}
            <div className={`${ HasSettings() > 0 ? ' w-max mx-16 gap-16 p-0 flex justify-evenly' : 'hidden'}`}>
                {GameModes[gameMode].Settings.map((setting, key) => (
                    <div key={key} onClick={() => {
                        // sets the game mode to the key of the clicked element
                        setGameSetting(key)
                    }}>
                        <Button highlighted={key == gameSetting} content={
                            <b>{setting}</b>
                        }/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GameModesBar;