const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // Basic User Information
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    firebaseUid: {type: String, required: true, unique: true},
    testsTaken: {type: Number, required: true, default: 0},

    // HighScores
    maxCPSOneSecond: {type: Number, required: true, default: 0},
    maxCPSFiveSeconds: {type: Number, required: true, default: 0},
    maxCPSTenSeconds: {type: Number, required: true, default: 0},
    maxCPSFiveClicks: {type: Number, required: true, default: 0},
    maxCPSTenClicks: {type: Number, required: true, default: 0}
});


const userModel = mongoose.model('User', userSchema);

module.exports = userModel;