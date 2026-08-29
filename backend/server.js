const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 4000;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5';

app.use(cors());
app.use(express.json({ limit: '10mb' }));

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

function parseDataURL(dataURL) {
  const match = /^data:([^;]+);base64,(.+)$/.exec(String(dataURL || ''));
  if (!match) return null;
  return { mediaType: match[1], base64: match[2] };
}

app.post('/api/identify-building', async (req, res) => {
  const { imageDataURL, candidates } = req.body || {};

  if (!ANTHROPIC_API_KEY) {
    return res.status(501).json({
      identified: false,
      message: 'Photo identification is not configured (missing ANTHROPIC_API_KEY on the server).'
    });
  }

  const image = parseDataURL(imageDataURL);
  if (!image) {
    return res.status(400).json({ identified: false, message: 'imageDataURL must be a base64 data URL.' });
  }

  const candidateList = Array.isArray(candidates) ? candidates : [];
  if (candidateList.length === 0) {
    return res.status(400).json({ identified: false, message: 'candidates must be a non-empty array.' });
  }

  const candidateDescriptions = candidateList
    .map((c) => {
      const parts = [`- id: "${c.id}", name: "${c.name}"`];
      if (c.meta) parts.push(`era/style: "${c.meta}"`);
      if (c.history) parts.push(`description: "${c.history}"`);
      return parts.join(', ');
    })
    .join('\n');

  const prompt = `You are identifying a building on a university campus from a photo. Several of these buildings are architecturally similar (modern glass/steel or brutalist concrete), so do not guess based on generic style alone — only pick one if you can point to a specific, distinguishing visual detail (unique roofline, signage, entrance shape, window pattern, materials) that sets it apart from the OTHER candidates below.

Here are the only valid candidate buildings:
${candidateDescriptions}

Rules:
1. If the photo clearly and distinctively matches one candidate, return it with high confidence (0.75-1.0).
2. If the photo could plausibly be more than one candidate, or only loosely matches generic "modern building" traits shared by several candidates, you MUST return a LOW confidence (below 0.4) even if you have to pick your best guess for buildingId — do not inflate confidence just because you produced an answer.
3. Never let familiarity or fame of a building's name bias your answer — an unfamiliar or newer building is just as valid an answer as a famous one, and must not be favored by default.
4. If the photo isn't of a building at all, or matches none of the candidates, return buildingId: null.

Respond with ONLY a JSON object, no other text, in this exact shape:
{"buildingId": "<one of the candidate ids, or null>", "confidence": <number between 0 and 1>, "reason": "<the specific visual detail that drove your answer, or why you're unsure>"}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 300,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image', source: { type: 'base64', media_type: image.mediaType, data: image.base64 } }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', response.status, errText);
      return res.status(502).json({ identified: false, message: 'Photo identification service failed.' });
    }

    const data = await response.json();
    const text = (data.content || []).map((block) => block.text || '').join('').trim();

    let parsed;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      parsed = JSON.parse(jsonMatch ? jsonMatch[0] : text);
    } catch (parseErr) {
      console.error('Could not parse model response as JSON:', text);
      return res.status(502).json({ identified: false, message: 'Photo identification returned an unreadable response.' });
    }

    const validIds = new Set(candidateList.map((c) => c.id));
    const buildingId = validIds.has(parsed.buildingId) ? parsed.buildingId : null;
    const confidence = typeof parsed.confidence === 'number' ? parsed.confidence : 0;

    return res.json({
      identified: Boolean(buildingId),
      buildingId,
      confidence,
      reason: parsed.reason || null
    });
  } catch (err) {
    console.error('Photo identification request failed:', err);
    return res.status(502).json({ identified: false, message: 'Photo identification service unreachable.' });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`TimeLens backend running on http://localhost:${PORT}`);
    if (!ANTHROPIC_API_KEY) {
      console.warn('ANTHROPIC_API_KEY is not set — /api/identify-building will return 501 until it is configured.');
    }
  });
}

module.exports = app;
