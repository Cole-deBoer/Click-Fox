import React from 'react';
import mouse from './Assets/mouse.svg'
import clock from './Assets/clock.svg'
import mountain from './Assets/mountain.svg'

export class GameMode {
    constructor(Title = "undefined", Logo = "no logo", Settings = [])
    {
        this.Title = Title;
        this.Logo = Logo;
        this.Settings = Settings;
    }
}

export const Time = new GameMode (
    "Time",
    <img src={clock}></img>,
    [
        1,
        5,
        10,
    ]
);

export const Clicks = new GameMode (
    "Clicks",
    <img src={mouse}></img>,
    [
        5,
        10,
        20,
    ]
);

export const Zen = new GameMode (
    "Zen",
    <img src={mountain} className='scale-75'></img>,
);

export const GameModes = [
    Time,
    Clicks,
    Zen
];