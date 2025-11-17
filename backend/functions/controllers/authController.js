const ping = (req, res) => {
    return res.status(200).json({message: "Ping was successful!"});
}

module.exports = ping;