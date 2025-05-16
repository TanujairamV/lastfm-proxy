import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS to allow requests from your frontend
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to fetch recent tracks from Last.fm
app.get('/api/lastfm', async (req, res) => {
  try {
    const apiKey = process.env.LASTFM_API_KEY;
    const username = process.env.LASTFM_USERNAME;

    if (!apiKey || !username) {
      return res.status(500).json({ error: 'Missing Last.fm API key or username in environment variables' });
    }

    const url = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;
    const response = await axios.get(url);
    const data = response.data;

    if (!data.recenttracks || !data.recenttracks.track) {
      return res.status(404).json({ error: 'No recent tracks found' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching Last.fm data:', error);
    res.status(500).json({ error: 'Failed to fetch Last.fm data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Last.fm proxy server running on port ${PORT}`);
});
