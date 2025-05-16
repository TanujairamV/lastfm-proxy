import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const LASTFM_API_KEY = process.env.LASTFM_API_KEY || 'your-lastfm-api-key';
const LASTFM_USER = process.env.LASTFM_USER || 'your-lastfm-username';

// Middleware
app.use(cors());
app.use(express.json());

// Route to fetch recent tracks
app.get('/api/lastfm', async (req: express.Request, res: express.Response) => {
  try {
    const response = await axios.get('http://ws.audioscrobbler.com/2.0/', {
      params: {
        method: 'user.getrecenttracks',
        user: LASTFM_USER,
        api_key: LASTFM_API_KEY,
        format: 'json',
        limit: 1, // Fetch the most recent track
      },
    });

    const tracks = response.data.recenttracks?.track;
    if (!tracks || tracks.length === 0) {
      return res.status(404).json({ error: 'No recent tracks found' });
    }

    const track = tracks[0];
    // Extract image URL (use the largest size, typically index 3)
    const imageUrl = track.image && track.image.length > 0
      ? track.image[3]['#text'] // Largest image size
      : 'https://via.placeholder.com/300x300?text=No+Image'; // Fallback image

    const trackData = {
      artist: track.artist['#text'],
      name: track.name,
      album: track.album['#text'],
      image: imageUrl,
      url: track.url,
    };

    res.json(trackData);
  } catch (error) {
    console.error('Error fetching Last.fm data:', error.message);
    res.status(500).json({ error: 'Failed to fetch recent tracks' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
