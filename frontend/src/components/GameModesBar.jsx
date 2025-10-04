import React, { useState } from "react";
import Button from "./Button";
import { GameModes } from "../GameModes";

const GameModesBar = ({gameMode = GameModes[0], setGameMode = () => {}, gameSetting = GameModes[0].Settings[0], 
                    setGameSetting = () => {}, resetGameActive = () => {}}) => {

    // checks if the selected game mode has settings to display.
    const HasSettings = (() => {
        return gameMode.Settings.length > 1;
    })

    return (
        <div className={`${HasSettings() > 0 ? 'w-5/6' : 'w-2/3'}
                        h-auto max-w-6xl mx-auto p-2 flex rounded-lg bg-zinc-700 transition-all duration-300`}>

            {/* Game Modes */}
            <div className="w-full p-0 flex justify-evenly">
                {GameModes.map((mode, key) => (
                    <div key={key} onClick={() => {
                        // sets the game mode to the key of the clicked element
                        setGameMode(GameModes[key])
                        resetGameActive();
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
            <div className={`${HasSettings() > 0 ? 'w-px p-0 rounded-sm bg-gray-500' : 'hidden'}`}/>
            
            {/* Game Settings */}
            <div className={`${ HasSettings() > 0 ? 'w-1/4 p-0 flex justify-evenly' : 'hidden'}`}>
                {gameMode.Settings.map((setting, key) => (
                    <div key={key} onClick={() => {
                        // sets the game mode to the key of the clicked element
                        setGameSetting(key)
                        resetGameActive();
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