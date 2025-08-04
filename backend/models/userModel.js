import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    // Basic User Information
    username: {type: String, required: true, unique: true},
    totalPlayTime: {type: Number, required: true, default: 0},
    testsTaken: {type: Number, required: true, default: 0},

    // HighScores
    minReactionTime: {type: Number, required: true, default: 0},
    maxClicksOneSecond: {type: Number, required: true, default: 0},
    maxClicksFiveSeconds: {type: Number, required: true, default: 0},
    maxClicksTenSeconds: {type: Number, required: true, default: 0},
});


export default mongoose.model('User', userSchema);