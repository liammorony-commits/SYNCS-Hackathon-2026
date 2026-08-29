const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const path = require('path');
const { generateQuadrangleHologramScene } = require('./hologram');
const {
  SUMMARY_VERSION,
  VERIFIED_AT,
  findUsydLandmark,
  usydLandmarks
} = require('./usyd-landmarks');

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

const TWO_HOURS_IN_MS = 2 * 60 * 60 * 1000;

const locationData = {
  quadrangle: {
    slug: 'quadrangle',
    name: 'University of Sydney Quadrangle',
    shortName: 'The Quadrangle',
    summary: 'A place with 170+ years of stories.',
    description: findUsydLandmark('quadrangle').summary,
    history: [
      {
        year: 1854,
        title: 'Blacket appointed architect',
        description: "The University selects Blacket's plans for its first purpose-built range and Great Hall."
      },
      {
        year: 1855,
        title: 'Foundations laid',
        description: 'Work begins on the sandstone buildings that form the Quadrangle’s founding phase.'
      },
      {
        year: 1859,
        title: 'The Great Hall opens',
        description: 'The Great Hall opens on 18 July and becomes a defining symbol of the campus.'
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

function normaliseLandmarkName(landmarkName) {
  return String(landmarkName || '').trim();
}

function buildFallbackLandmarkSummary(landmarkName) {
  const cleanName = normaliseLandmarkName(landmarkName);
  const matchingBuilding = findUsydLandmark(cleanName);

  if (matchingBuilding) {
    return {
      summary: matchingBuilding.summary,
      sources: matchingBuilding.sources,
      sourceType: 'curated-usyd-catalogue',
      canonicalName: matchingBuilding.name,
      kind: matchingBuilding.kind,
      summaryVersion: matchingBuilding.summaryVersion,
      verifiedAt: matchingBuilding.verifiedAt
    };
  }

  const fallbackSummary = `${cleanName} is a landmark with deep cultural, historical, and architectural importance to its surrounding community. It reflects local identity, public memory, and a continuing story of people, place, and design.`;

  return {
    summary: fallbackSummary,
    sources: ['General landmark history references', 'Local heritage and cultural context'],
    sourceType: 'generic-fallback'
  };
}

async function generateLandmarkSummary(landmarkName) {
  const cleanName = normaliseLandmarkName(landmarkName);

  if (!cleanName) {
    throw new Error('Landmark name is required.');
  }

  const matchingBuilding = findUsydLandmark(cleanName);
  if (matchingBuilding) {
    return {
      summary: matchingBuilding.summary,
      sources: matchingBuilding.sources,
      sourceType: 'curated-usyd-catalogue',
      canonicalName: matchingBuilding.name,
      kind: matchingBuilding.kind,
      summaryVersion: matchingBuilding.summaryVersion,
      verifiedAt: matchingBuilding.verifiedAt
    };
  }

  const openAiKey = process.env.OPENAI_API_KEY;

  if (openAiKey) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openAiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a concise historical guide. Use well-established historical facts and keep the answer to two sentences.'
            },
            {
              role: 'user',
              content: `Give a brief 2-sentence summary of: ${cleanName}. Use accurate historical and architectural context.`
            }
          ],
          temperature: 0.5,
          max_tokens: 120
        })
      });

      if (!response.ok) {
        throw new Error('OpenAI request failed');
      }

      const data = await response.json();
      const summary = data.choices?.[0]?.message?.content?.trim();

      if (summary) {
        return {
          summary,
          sources: ['OpenAI model response', 'Historical and architectural context'],
          sourceType: 'llm-assisted'
        };
      }
    } catch (error) {
      console.warn('OpenAI summary failed, using local fallback summary:', error.message);
    }
  }

  return buildFallbackLandmarkSummary(cleanName);
}

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

app.get('/api/hologram/quadrangle', (req, res) => {
  res.json(generateQuadrangleHologramScene());
});

app.get('/api/usyd-landmarks', (req, res) => {
  res.json({
    count: usydLandmarks.length,
    summaryVersion: SUMMARY_VERSION,
    verifiedAt: VERIFIED_AT,
    landmarks: usydLandmarks
  });
});

app.post('/api/landmark-summary', async (req, res) => {
  try {
    const { landmarkName } = req.body || {};
    const result = await generateLandmarkSummary(landmarkName);

    res.json({
      landmark: normaliseLandmarkName(landmarkName),
      summary: result.summary,
      sources: result.sources,
      sourceType: result.sourceType,
      canonicalName: result.canonicalName || null,
      kind: result.kind || null,
      summaryVersion: result.summaryVersion || null,
      verifiedAt: result.verifiedAt || null
    });
  } catch (error) {
    res.status(400).json({
      error: error.message || 'Unable to generate landmark summary.'
    });
  }
});

app.get('/api/landmark-summary', async (req, res) => {
  try {
    const { name } = req.query;
    const result = await generateLandmarkSummary(name);

    res.json({
      landmark: normaliseLandmarkName(name),
      summary: result.summary,
      sources: result.sources,
      sourceType: result.sourceType,
      canonicalName: result.canonicalName || null,
      kind: result.kind || null,
      summaryVersion: result.summaryVersion || null,
      verifiedAt: result.verifiedAt || null
    });
  } catch (error) {
    res.status(400).json({
      error: error.message || 'Unable to generate landmark summary.'
    });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`TimeLens backend running on http://localhost:${PORT}`);
  });
}

module.exports = app;
