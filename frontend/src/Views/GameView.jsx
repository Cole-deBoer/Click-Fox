import React from "react";
import Navbar from "../components/Navbar";
import GameModesBar from "../components/GameModesBar";

function GameView() {
    return (
        <>
            <Navbar></Navbar>
            <GameModesBar></GameModesBar>
        </>
    );
}

export default GameView;