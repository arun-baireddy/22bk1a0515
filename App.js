import React, { useState } from 'react';
import axios from 'axios';

export default function UrlShortener() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleShorten = async () => {
    setError('');
    setShortUrl('');
    if (!url) {
      setError('Please enter a URL');
      return;
    }
    try {
      const res = await axios.get(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`);
      if (res.data && res.data.ok) {
        setShortUrl(res.data.result.full_short_link);
      } else {
        setError('Failed to shorten URL');
      }
    } catch (err) {
      setError('Invalid URL or API error');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20, fontFamily: 'Arial' }}>
      <h2>URL Shortener (Frontend only)</h2>
      <input
        type="text"
        placeholder="Enter URL here"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: '100%', padding: 8, fontSize: 16 }}
      />
      <button
        onClick={handleShorten}
        style={{ marginTop: 10, padding: '10px 15px', fontSize: 16, width: '100%' }}
      >
        Shorten URL
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {shortUrl && (
        <p style={{ marginTop: 20 }}>
          Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
        </p>
      )}
    </div>
  );
}
