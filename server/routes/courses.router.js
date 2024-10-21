const express = require('express');
const pool = require('../modules/pool');// Import the middleware
const router = express.Router();

/**
 * GET route Course created by the user
  Route to get courses for the logged-in user
 */
router.get('/',   async (req, res) => {
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

// PUT request to update an existing course
router.put('/:id', async (req, res) => {
  if (!req.user) {
    return res.status(401).send('User not authenticated');
  }
  const userId = req.user.id;
  const courseId = req.params.id;
  const { title, description, progress, notes } = req.body;

  try {
    const result = await pool.query(
      `UPDATE courses 
       SET title = $1, description = $2, progress = $3, notes = $4, updated_at = NOW()
       WHERE id = $5 AND user_id = $6
       RETURNING *`,
      [title, description, progress, notes, courseId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Course not found or user not authorized');
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error updating course:', err);
    res.status(500).send('Server error');
  }
});


// DELETE request to remove a course
router.delete('/:id', async (req, res) => {
  if (!req.user) {
    return res.status(401).send('User not authenticated');
  }
  const userId = req.user.id;
  const courseId = req.params.id;

  try {
    const result = await pool.query(
      `DELETE FROM courses 
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [courseId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Course not found or user not authorized');
    }

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    console.error('Error deleting course:', err);
    res.status(500).send('Server error');
  }
});


module.exports = router;
