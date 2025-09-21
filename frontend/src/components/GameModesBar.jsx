import React, { useState } from "react";
import Button from "./Button";
import { GameMode, GameModes, Time } from "../GameModes";

const GameModesBar = ({gameMode = Time, setGameMode = () => {}, gameSetting = gameMode[0], setGameSetting = () => {}}) => {
    // set the selected setting to the first setting for the selected game mode.

    // checks if the selected game mode has settings to display.
    const HasSettings = (() => {
        return gameMode.Settings.length > 0;
    })

    return (
        <div className={`${HasSettings() > 0 ? 'w-5/6' : 'w-2/3'}
                        h-auto max-w-6xl mx-auto p-2 flex rounded-lg bg-gray-200 transition-all duration-300`}>

            {/* Game Modes */}
            <div className="w-full p-0 gap-32 flex justify-center ">
                {GameModes.map((mode, key) => (
                    <div key={key} onClick={() => {
                        // sets the game mode to the key of the clicked element
                        setGameMode(GameModes[key])
                    }}>
                        <Button highlighted={GameModes[key] == gameMode} content={
                            <div className="flex">
                                <p className="scale-75">{mode.Logo}</p>
                                <b>{mode.Title}</b>
                            </div>
                        }/>
                    </div>
                ))}
            </div>

            {/* Border */}
            <div className={`${HasSettings() > 0 ? 'w-1 p-0 rounded-sm bg-gray-500' : 'hidden'}`}/>
            
            {/* Game Settings */}
            <div className={`${ HasSettings() > 0 ? 'w-max mx-16 gap-16 p-0 flex justify-evenly' : 'hidden'}`}>
                {gameMode.Settings.map((setting, key) => (
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