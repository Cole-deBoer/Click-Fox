
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
     "🕗",
    [
        1,
        5,
        10,
    ]
);

export const Clicks = new GameMode (
    "Clicks",
    "🖱",
    [
        5,
        10,
        20,
    ]
);

export const Reaction = new GameMode (
    "Reaction",
    "⏰",

);

export const Zen = new GameMode (
    "Zen",
    "🗻",
);

export const GameModes = [
    Time,
    Clicks,
    Reaction,
    Zen
];

