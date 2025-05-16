# 🎧 Last.fm Proxy

This is a lightweight Express-based proxy server for fetching your Last.fm listening data. It's built to bypass CORS issues when integrating with frontend projects like portfolio websites.

---

## 🔧 Features

- Bypasses CORS restrictions on the Last.fm API
- Secure `.env` support for your API key and username
- Minimal setup with Node.js + Express
- Ready for deployment on Render, Railway, or Fly.io

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/TanujairamV/lastfm-proxy.git
cd lastfm-proxy
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file based on the example:

```bash
cp .env.example .env
```

Then edit `.env`:

```env
LASTFM_API_KEY=your_lastfm_api_key
LASTFM_USER=your_lastfm_username
```

### 4. Start the Server

```bash
npm start
```

The proxy will run on `http://localhost:3000`.

---

## 🧠 API Endpoint

### `GET /api/lastfm`

Fetches the most recent track played by the configured user.

**Example response:**

```json
{
  "recenttracks": {
    "track": [
      {
        "name": "Blinding Lights",
        "artist": { "#text": "The Weeknd" },
        "image": [ ... ],
        "@attr": { "nowplaying": "true" }
      }
    ]
  }
}
```

---

## 🌐 Deployment

You can deploy this proxy to:

* [Render](https://render.com/)
* [Railway](https://railway.app/)
* [Fly.io](https://fly.io/)

### Example URL:

```
https://lastfm-proxy.onrender.com/api/lastfm
```

Use this in your frontend to safely pull listening data.

---

## 🛡️ Security Note

Your API key is stored securely in the `.env` file and never exposed to the frontend. Make sure `.env` is included in `.gitignore`.

---

## 📄 License

MIT — free to use and modify. Attribution appreciated!

```

---

Let me know if you want the **Render deployment steps** added at the bottom as well.
```
