const express = require('express');
const pool = require('../modules/pool');// Import the middleware
const router = express.Router();

// GET request to fetch videos for a specific user
router.get('/user/:userId/videos', async (req, res) => {
    const userId = parseInt(req.params.userId, 10);

    try {
        // Query to get videos associated with the user
        const query = `
            SELECT videos.*
            FROM videos
            JOIN "user" ON videos.user_id = "user".id
            WHERE "user".id = $1
        `;

        const result = await pool.query(query, [userId]);

        // Return the videos as a JSON response
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).json({ error: 'An error occurred while fetching videos.' });
    }
});

// POST request to add a new video for a specific user
router.post('/user/:userId/videos', async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const { video_id, title, description, search_query } = req.body;

    // Validate the request body
    if (!video_id || !title || !search_query) {
        return res.status(400).json({ error: 'video_id, title, and search_query are required.' });
    }

    try {
        // Query to insert a new video
        const query = `
            INSERT INTO videos (user_id, video_id, title, description, search_query, added_at)
            VALUES ($1, $2, $3, $4, $5, NOW())
            RETURNING *;  -- Return the newly created video record
        `;

        const values = [userId, video_id, title, description, search_query];

        const result = await pool.query(query, values);

        // Return the newly created video as a JSON response
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding video:', error);
        res.status(500).json({ error: 'An error occurred while adding the video.' });
    }
});

// PUT request to update a video for a specific user
router.put('/user/:userId/videos/:videoId', async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const videoId = parseInt(req.params.videoId, 10);
    const { title, description, search_query } = req.body;

    // Validate the request body
    if (!title || !search_query) {
        return res.status(400).json({ error: 'Title and search_query are required.' });
    }

    try {
        // Query to update the video
        const query = `
            UPDATE videos
            SET title = $1, description = $2, search_query = $3, added_at = NOW()
            WHERE id = $4 AND user_id = $5
            RETURNING *;  -- Return the updated video record
        `;

        const values = [title, description, search_query, videoId, userId];

        const result = await pool.query(query, values);

        // Check if the video was found and updated
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Video not found or does not belong to this user.' });
        }

        // Return the updated video as a JSON response
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating video:', error);
        res.status(500).json({ error: 'An error occurred while updating the video.' });
    }
});



// DELETE request to delete a video for a specific user
router.delete('/user/:userId/videos/:videoId', async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const videoId = parseInt(req.params.videoId, 10);

    try {
        // Query to delete the video
        const query = `
            DELETE FROM videos
            WHERE id = $1 AND user_id = $2
            RETURNING *;  -- Return the deleted video record
        `;

        const values = [videoId, userId];

        const result = await pool.query(query, values);

        // Check if the video was found and deleted
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Video not found or does not belong to this user.' });
        }

        // Return a success message
        res.json({ message: 'Video deleted successfully.', deletedVideo: result.rows[0] });
    } catch (error) {
        console.error('Error deleting video:', error);
        res.status(500).json({ error: 'An error occurred while deleting the video.' });
    }
});



module.exports = router;