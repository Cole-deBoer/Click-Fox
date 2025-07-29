export const ping = (req, res) => {
    return res.status(200).json({message: "Ping was successful!"});
}

export const stats = (req, res) => {
    return res.status(200).json({message: "stats: Clicks: 1000, Hours: 4, MaxCps: 15"});
}
