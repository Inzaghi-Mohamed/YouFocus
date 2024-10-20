const express = require('express');
const pool = require('../modules/pool');// Import the middleware
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

/**
 * GET route Course created by the user
  Route to get courses for the logged-in user
 */
router.get('/', rejectUnauthenticated,  async (req, res) => {
  if (!req.user) {
    return res.status(401).send('User not authenticated');
  }
  const userId = req.user.id; // Assuming req.user is set by some authentication middleware

  try {
    const result = await pool.query(
      `SELECT courses.* 
       FROM courses 
       JOIN "user" ON courses.user_id = "user".id 
       WHERE "user".id = $1`,
      [userId]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error retrieving courses:', err);
    res.status(500).send('Server error');
  }
});
// POST request to create a new course for the logged-in user
router.post('/', async (req, res) => {
  const userId = req.user.id; // Assuming req.user is set by some authentication middleware
  const { title, description, progress, notes } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO courses (user_id, title, description, progress, notes, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) 
       RETURNING *`,
      [userId, title, description, progress, notes]
    );

    res.status(201).json(result.rows[0]); // Return the newly created course
  } catch (err) {
    console.error('Error creating course:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
