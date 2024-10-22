const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET request to fetch videos for the logged-in user
router.get('/', async (req, res) => {
    if (!req.user) {
        return res.status(401).send('User not authenticated');
    }
    const userId = req.user.id;

    try {
        const query = `
            SELECT videos.*
            FROM videos
            WHERE user_id = $1
        `;
        const result = await pool.query(query, [userId]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).send('Server error');
    }
});

// POST request to add a new video for the logged-in user
router.post('/', async (req, res) => {
    if (!req.user) {
        return res.status(401).send('User not authenticated');
    }
    const userId = req.user.id;
    const { video_id, title, description, search_query } = req.body;

    if (!video_id || !title || !search_query) {
        return res.status(400).send('video_id, title, and search_query are required.');
    }

    try {
        const query = `
            INSERT INTO videos (user_id, video_id, title, description, search_query, added_at)
            VALUES ($1, $2, $3, $4, $5, NOW())
            RETURNING *;
        `;
        const values = [userId, video_id, title, description, search_query];
        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding video:', error);
        res.status(500).send('Server error');
    }
});


// DELETE request to delete a video
router.delete('/:id', async (req, res) => {
    if (!req.user) {
        return res.status(401).send('User not authenticated');
    }
    const userId = req.user.id;
    const videoId = req.params.id;

    try {
        const query = `
            DELETE FROM videos
            WHERE id = $1 AND user_id = $2
            RETURNING *;
        `;
        const result = await pool.query(query, [videoId, userId]);

        if (result.rows.length === 0) {
            return res.status(404).send('Video not found or user not authorized');
        }
        res.status(200).json({ message: 'Video deleted successfully', deletedVideo: result.rows[0] });
    } catch (error) {
        console.error('Error deleting video:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;