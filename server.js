require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Allow cross-origin requests

app.get('/api/lastfm', async (req, res) => {
  try {
    const response = await axios.get(
      `http://ws.audioscrobbler.com/2.0/`, {
        params: {
          method: 'user.getrecenttracks',
          user: process.env.LASTFM_USER,
          api_key: process.env.LASTFM_API_KEY,
          format: 'json',
          limit: 1
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('[Proxy Error]', error.message);
    res.status(500).json({ error: 'Failed to fetch Last.fm data' });
  }
});

app.listen(PORT, () => {
  console.log(`🎧 Last.fm proxy running on port ${PORT}`);
});
