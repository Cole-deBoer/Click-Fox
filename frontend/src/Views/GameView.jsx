import React from "react";
import Navbar from "../components/Navbar";
import GameModesBar from "../components/GameModesBar";
import ClickArea from "../components/ClickArea";

const GameView = () => {
    return (
        <>
            <div>
                <Navbar></Navbar>
                <GameModesBar></GameModesBar>
            </div>
            <div className="w-full">
                <ClickArea></ClickArea>
            </div>
        </>

    );
}

export default GameView;