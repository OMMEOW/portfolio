const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// Get all players for leaderboard
router.get('/leaderboard', async (req, res) => {
    try {
        const players = await Player.find()
            .sort({ score: -1 })
            .limit(10)
            .select('username score coins level');
        res.json(players);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login or Register a player
router.post('/login', async (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ message: 'Username required' });

    try {
        let player = await Player.findOne({ username: username.toUpperCase() });

        if (!player) {
            // Create new player
            player = new Player({
                username: username.toUpperCase()
                // Defaults will apply
            });
            await player.save();
            return res.status(201).json({ player, isNew: true });
        }

        // Update last active
        player.lastActive = Date.now();
        await player.save();

        res.json({ player, isNew: false });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Save game state
router.post('/save', async (req, res) => {
    const { username, score, coins, level, skillPoints, projectsUnlocked, projectsCompleted, achievements, skills } = req.body;

    try {
        const player = await Player.findOne({ username: username.toUpperCase() });
        if (!player) return res.status(404).json({ message: 'Player not found' });

        // Update fields
        if (score !== undefined) player.score = Math.max(player.score, score); // Keep highest score? Or current? Let's assume current for now, but usually high score is separate. Actually for RPG style, current state is key.
        // Wait, if it's an arcade portfolio, usually "Score" is the high score. 
        // Let's just update perfectly to state.
        player.score = score;
        player.coins = coins;
        player.level = level;
        player.skillPoints = skillPoints;
        player.projectsUnlocked = projectsUnlocked;
        player.projectsCompleted = projectsCompleted;
        player.achievements = achievements;
        player.skills = skills;
        player.lastActive = Date.now();

        await player.save();
        res.json(player);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
