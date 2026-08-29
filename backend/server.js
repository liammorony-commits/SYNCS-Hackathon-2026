const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

const TWO_HOURS_IN_MS = 2 * 60 * 60 * 1000;

const locationData = {
  quadrangle: {
    slug: 'quadrangle',
    name: 'University of Sydney Quadrangle',
    shortName: 'The Quadrangle',
    summary: 'A place with 170+ years of stories.',
    description:
      "The Quadrangle began taking shape in the 1850s, when architect Edmund Blacket designed the University's first major buildings in a Victorian Gothic style. The Great Hall began in 1854 and the wider campus grew around it as a living heart of the university.",
    history: [
      {
        year: 1854,
        title: 'Construction begins',
        description: 'The first major buildings of the University begin to take shape in a Gothic style.'
      },
      {
        year: 1859,
        title: 'The Great Hall takes form',
        description: 'The hall becomes one of the defining symbols of the University campus.'
      },
      {
        year: 1881,
        title: 'A new era',
        description: 'The University becomes one of the first in the world to admit women to study.'
      },
      {
        year: 1900,
        title: 'Student life grows',
        description: 'The Quadrangle becomes a central gathering place for generations of students.'
      },
      {
        year: 2026,
        title: 'Your stories',
        description: 'Modern students and visitors continue to leave new memories at this historic place.'
      }
    ]
  }
};

const comments = [
  {
    id: 'seed-1',
    location: 'quadrangle',
    name: 'Sam',
    text: 'I met my girlfriend here during O-Week and we still remember it every year.',
    timestamp: Date.now() - 2 * 60 * 1000
  },
  {
    id: 'seed-2',
    location: 'quadrangle',
    name: 'Alex',
    text: 'My grandfather graduated from Sydney Uni in 1968. He used to sit on these steps after class.',
    timestamp: Date.now() - 24 * 60 * 1000
  },
  {
    id: 'seed-3',
    location: 'quadrangle',
    name: 'Jordan',
    text: 'I had my graduation photos taken here today and it felt incredible.',
    timestamp: Date.now() - 60 * 60 * 1000
  }
];

const connectionRequests = [];

const isRecent = (timestamp) => Date.now() - Number(timestamp) < TWO_HOURS_IN_MS;

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'TimeLens backend is running',
    time: new Date().toISOString()
  });
});

app.get('/api/location/:location', (req, res) => {
  const locationKey = String(req.params.location || '').toLowerCase();
  const location = locationData[locationKey];

  if (!location) {
    return res.status(404).json({
      error: 'Location not found',
      supportedLocations: Object.keys(locationData)
    });
  }

  const recentStories = comments
    .filter((comment) => comment.location === locationKey && isRecent(comment.timestamp))
    .sort((a, b) => Number(b.timestamp) - Number(a.timestamp));

  return res.json({
    ...location,
    recentStories
  });
});

app.get('/api/comments', (req, res) => {
  const location = String(req.query.location || 'quadrangle').toLowerCase();
  const recentOnly = req.query.recentOnly !== 'false';

  const filtered = comments.filter((comment) => {
    if (comment.location !== location) return false;
    if (!recentOnly) return true;
    return isRecent(comment.timestamp);
  });

  filtered.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));

  res.json(filtered);
});

app.post('/api/comments', (req, res) => {
  const { name, text, location } = req.body || {};
  const cleanName = String(name || '').trim();
  const cleanText = String(text || '').trim();
  const cleanLocation = String(location || 'quadrangle').toLowerCase();

  if (!cleanName || !cleanText) {
    return res.status(400).json({
      error: 'Name and text are required.'
    });
  }

  if (!locationData[cleanLocation]) {
    return res.status(404).json({
      error: 'Location not supported yet.',
      supportedLocations: Object.keys(locationData)
    });
  }

  const newComment = {
    id: crypto.randomUUID(),
    location: cleanLocation,
    name: cleanName,
    text: cleanText,
    timestamp: Date.now()
  };

  comments.unshift(newComment);

  return res.status(201).json(newComment);
});

app.post('/api/connect', (req, res) => {
  const { fromName, toName, location, message } = req.body || {};
  const cleanFrom = String(fromName || '').trim();
  const cleanTo = String(toName || '').trim();
  const cleanLocation = String(location || 'quadrangle').toLowerCase();

  if (!cleanFrom || !cleanTo) {
    return res.status(400).json({
      error: 'Both sender and recipient names are required.'
    });
  }

  const request = {
    id: crypto.randomUUID(),
    fromName: cleanFrom,
    toName: cleanTo,
    location: cleanLocation,
    message: String(message || 'I would like to connect with you about this place.').trim(),
    timestamp: Date.now(),
    status: 'pending'
  };

  connectionRequests.unshift(request);

  return res.status(201).json({
    success: true,
    request
  });
});

app.get('/api/connections', (req, res) => {
  const location = String(req.query.location || 'quadrangle').toLowerCase();

  const filtered = connectionRequests.filter((request) => request.location === location);
  res.json(filtered);
});

app.post('/api/scan', (req, res) => {
  const { locationName, imageData } = req.body || {};
  const combinedText = `${locationName || ''} ${imageData || ''}`.toLowerCase();

  if (
    combinedText.includes('quadrangle') ||
    combinedText.includes('university of sydney') ||
    combinedText.includes('great hall')
  ) {
    return res.json({
      detected: true,
      location: 'quadrangle',
      name: 'University of Sydney Quadrangle',
      confidence: 0.94,
      message: 'Location recognised successfully.'
    });
  }

  return res.status(400).json({
    detected: false,
    message: 'This location could not be recognised. Try scanning the Quadrangle.'
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`TimeLens backend running on http://localhost:${PORT}`);
  });
}

module.exports = app;
