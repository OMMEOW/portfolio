const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true
    },
    score: {
        type: Number,
        default: 0
    },
    coins: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1
    },
    skillPoints: {
        type: Number,
        default: 0
    },
    projectsUnlocked: {
        type: [Number], // Storing indices of unlocked projects
        default: [0, 1] // First two usually unlocked
    },
    projectsCompleted: {
        type: [Number], // Storing indices of completed projects
        default: []
    },
    achievements: {
        type: [String], // IDs of achievements
        default: []
    },
    skills: {
        type: [{
            name: String,
            level: Number
        }],
        default: []
    },
    lastActive: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Player', PlayerSchema);
