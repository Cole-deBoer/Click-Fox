import React from "react";
import Navbar from "../components/Navbar";
import GameModesBar from "../components/GameModesBar";
import ClickArea from "../components/ClickArea";

function GameView() {
    return (
        <>
            <Navbar></Navbar>
            <GameModesBar></GameModesBar>
            <ClickArea></ClickArea>
        </>
    );
}

export default GameView;