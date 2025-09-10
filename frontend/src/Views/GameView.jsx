import React from "react";
import Navbar from "../components/Navbar";
import GameModesBar from "../components/GameModesBar";
import ClickArea from "../components/ClickArea";

function GameView() {
    return (
        <>
        <div className="">
            <Navbar></Navbar>
            <GameModesBar></GameModesBar>
        </div>

            <ClickArea></ClickArea>
        </>

    );
}

export default GameView;