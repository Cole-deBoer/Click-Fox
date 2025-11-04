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
        <div className="w-full md:w-9/12 max-w-5xl h-auto mx-auto p-2 flex rounded-lg bg-zinc-700 transition-all duration-300 text-lg">

            {/* Game Modes */}
            <div className="w-full flex justify-evenly">
                {GameModes.map((mode, key) => (
                    <div key={key} onClick={() => {
                        // sets the game mode to the key of the clicked element
                        setGameMode(GameModes[key])
                        resetGameActive();
                    }}>
                        <Button highlighted={GameModes[key] == gameMode} content={
                            <div className="flex gap-1 scale-75 md:scale-90">
                                {mode.Logo}
                                <b>{mode.Title}</b>
                            </div>
                        }/>
                    </div>
                ))}
            </div>

            {/* Border */}
            <div className={`${HasSettings() > 0 ? 'w-px rounded-sm bg-gray-500' : 'hidden'}`}/>
            
            {/* Game Settings */}
            <div className={`${ HasSettings() > 0 ? 'w-1/3 flex justify-evenly md:scale-90' : 'hidden'}`}>
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