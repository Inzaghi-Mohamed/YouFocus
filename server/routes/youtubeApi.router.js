const express = require('express');
const axios = require('axios');
const  router = express.Router();

router.get('/search', async (req, res) => {
  if (!req.user) {
    return res.status(401).send('User not authenticated');
  }

  const { query, pageToken } = req.query;
  const API_KEY = process.env.YOUTUBE_API_KEY;
//   console.log(' Here is the API key:', API_KEY)

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 12,
        key: API_KEY,
        pageToken: pageToken || ''
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching videos from YouTube API:', error);
    res.status(500).send('Error fetching videos');
  }
});

module.exports = router;