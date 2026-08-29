const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const path = require('path');
const { generateQuadrangleHologramScene } = require('./hologram');

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
    description:
      "The Quadrangle's first range took shape after Edmund Blacket was appointed University architect in 1854. Foundations were laid in 1855, and his Victorian Gothic Great Hall opened in 1859; later architects completed the Quadrangle over the following century.",
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

const usydBuildings = [
  {
    id: 'quadrangle',
    name: 'University of Sydney Quadrangle',
    aliases: ['quadrangle', 'the quadrangle', 'university of sydney quadrangle'],
    summary:
      'The University of Sydney Quadrangle is the historic heart of the campus, developed in the 19th century under architect Edmund Blacket in a Victorian Gothic style. It became a defining symbol of the university through the Great Hall and the surrounding campus buildings, linking academic heritage with generations of student life.',
    sources: [
      'University of Sydney campus heritage materials',
      'Australian architectural and campus history sources'
    ]
  },
  {
    id: 'great-hall',
    name: 'Great Hall',
    aliases: ['great hall', 'the great hall'],
    summary:
      'The Great Hall is one of the university’s most recognisable structures, standing at the centre of the Quadrangle and reflecting the early Victorian Gothic character of the campus. It is closely associated with formal ceremonies, graduation traditions, and the University’s long architectural identity.',
    sources: [
      'University of Sydney heritage materials',
      'Campus architecture and ceremonial history sources'
    ]
  },
  {
    id: 'new-law-building',
    name: 'New Law Building',
    aliases: ['new law building', 'f10', 'new law building usyd', 'law building'],
    summary:
      'The New Law Building is a contemporary teaching and research facility at the University of Sydney designed to support legal education, moot courts, and collaborative study. It reflects the university’s modern academic infrastructure while sitting within the older campus setting.',
    sources: [
      'University of Sydney building records',
      'Campus architecture and faculty information'
    ]
  },
  {
    id: 'fisher-library',
    name: 'Fisher Library',
    aliases: ['fisher library', 'f03', 'fisher'],
    summary:
      'Fisher Library is one of the University of Sydney’s major academic libraries and a key landmark for students and researchers across the campus. It serves as a central study space and symbol of scholarly life at the university.',
    sources: [
      'University of Sydney library records',
      'Academic campus facility information'
    ]
  },
  {
    id: 'carslaw-building',
    name: 'Carslaw Building',
    aliases: ['carslaw', 'carslaw building', 'f07'],
    summary:
      'Carslaw Building is a major teaching and learning building for mathematics and science at the University of Sydney. Known for its large lecture spaces and complex layout, it has been central to generations of student life and academic instruction.',
    sources: [
      'University of Sydney facilities records',
      'Campus teaching and building history'
    ]
  },
  {
    id: 'abercrombie-building',
    name: 'Abercrombie Building',
    aliases: ['abercrombie', 'abercrombie building', 'h70'],
    summary:
      'Abercrombie Building is a prominent campus building associated with business and economics teaching at the University of Sydney. It is recognised for its modern learning spaces and its role in student study and collaboration.',
    sources: [
      'University of Sydney business school facilities',
      'Campus architecture and education records'
    ]
  },
  {
    id: 'charles-perkins-centre',
    name: 'Charles Perkins Centre',
    aliases: ['charles perkins centre', 'cpc', 'd17'],
    summary:
      'The Charles Perkins Centre is a major interdisciplinary research and education hub focused on health and medical research at the University of Sydney. It brings together health, policy, and biomedical inquiry in a purpose-built collaborative environment.',
    sources: [
      'University of Sydney research centre information',
      'Campus health and research facility records'
    ]
  },
  {
    id: 'sydney-uni-commons',
    name: 'University of Sydney Commons',
    aliases: ['university commons', 'commons'],
    summary:
      'The University of Sydney Commons is a central student-facing campus space designed to support informal gathering, study, and community life. It reflects the university’s focus on accessible learning environments and social connection.',
    sources: [
      'University of Sydney campus development records',
      'Student and learning space planning sources'
    ]
  },
  {
    id: 'sydney-union',
    name: 'Sydney University Union',
    aliases: ['sydney university union', 'union', 'student union'],
    summary:
      'The Sydney University Union is a long-standing part of student life at the University of Sydney, helping shape campus culture, events, and belonging. It has played a central role in student engagement across the university for decades.',
    sources: [
      'University of Sydney student life records',
      'Campus community and union history sources'
    ]
  },
  {
    id: 'madsen-building',
    name: 'Madsen Building',
    aliases: ['madsen building', 'madsen'],
    summary:
      'The Madsen Building is part of the University of Sydney’s academic infrastructure and contributes to the campus environment through teaching, research, and student activity. It reflects the university’s long-standing commitment to a connected and active learning landscape.',
    sources: [
      'University of Sydney campus building records',
      'Institutional facility and academic planning references'
    ]
  },
  {
    id: 'butlin-building',
    name: 'Butlin Building',
    aliases: ['butlin building', 'butlin'],
    summary:
      'The Butlin Building is one of the university’s established academic structures and contributes to the campus’s teaching and research environment. Its presence reflects the broader academic development of the University of Sydney over time.',
    sources: [
      'University of Sydney campus records',
      'Academic and infrastructure history sources'
    ]
  },
  {
    id: 'science-road',
    name: 'Science Road',
    aliases: ['science road', 'science walkway'],
    summary:
      'Science Road is an important campus corridor linking major science and teaching facilities at the University of Sydney. It functions as both a practical route and a visible marker of the university’s scientific and academic character.',
    sources: [
      'University of Sydney campus planning records',
      'Campus circulation and learning environment references'
    ]
  },
  {
    id: 'sydney-university-main-building',
    name: 'Main Building',
    aliases: ['main building', 'sydney university main building', 'university main building'],
    summary:
      'The Main Building at the University of Sydney is one of the most recognisable landmarks on campus, symbolising the university’s long historical presence in Sydney. It anchors the central campus area and forms part of the institution’s academic and architectural identity.',
    sources: [
      'University of Sydney heritage records',
      'Campus landmark and architectural history'
    ]
  },
  {
    id: 'sydney-university-gallery',
    name: 'McMillan Building',
    aliases: ['mcmillan building', 'mcmillan', 'university gallery'],
    summary:
      'McMillan Building is part of the University of Sydney’s academic and cultural infrastructure, contributing to learning and public-facing campus life. It reflects the university’s broader role as both an educational institution and a civic landmark.',
    sources: [
      'University of Sydney campus records',
      'Academic infrastructure and campus heritage references'
    ]
  },
  {
    id: 'sydney-university-hall',
    name: 'The University Hall',
    aliases: ['university hall', 'hall'],
    summary:
      'The University Hall is part of the historic academic fabric of the University of Sydney and supports formal gatherings, ceremonies, and community life. It reflects the university’s traditions of ceremony, scholarship, and public presence.',
    sources: [
      'University of Sydney heritage materials',
      'Campus ceremonial and institutional records'
    ]
  },
  {
    id: 'sydney-university-library',
    name: 'University Library',
    aliases: ['university library', 'library'],
    summary:
      'The University Library is central to research, study, and student life at the University of Sydney. It represents the intellectual heart of the campus and provides a shared space for teaching, scholarship, and collaboration.',
    sources: [
      'University of Sydney library services',
      'Academic and campus life records'
    ]
  },
  {
    id: 'sydney-university-physics-building',
    name: 'Physics Building',
    aliases: ['physics building', 'science building'],
    summary:
      'The Physics Building is a key academic facility at the University of Sydney, supporting scientific teaching and experimentation. It reflects the university’s longstanding engagement with research, discovery, and technological advancement.',
    sources: [
      'University of Sydney science faculty records',
      'Academic infrastructure and campus history'
    ]
  },
  {
    id: 'sydney-university-chemistry-building',
    name: 'Chemistry Building',
    aliases: ['chemistry building', 'chemistry'],
    summary:
      'The Chemistry Building is a central teaching and research facility at the University of Sydney, reflecting the university’s historic strength in the sciences. It has long supported practical education, laboratory work, and scientific discovery on campus.',
    sources: [
      'University of Sydney science records',
      'Campus chemistry and teaching history'
    ]
  },
  {
    id: 'sydney-university-medicine-building',
    name: 'Medicine Building',
    aliases: ['medicine building', 'medical school building'],
    summary:
      'The Medicine Building contributes to the University of Sydney’s long tradition of medical education and research. It represents the university’s role in shaping healthcare training and scientific knowledge across the region.',
    sources: [
      'University of Sydney medical faculty records',
      'Campus healthcare and education history'
    ]
  },
  {
    id: 'sydney-university-engineering-building',
    name: 'Engineering Building',
    aliases: ['engineering building', 'school of engineering'],
    summary:
      'The Engineering Building is a major part of the University of Sydney’s commitment to technical education and innovation. It reflects the campus’s role in training engineers and supporting the development of practical expertise.',
    sources: [
      'University of Sydney engineering faculty records',
      'Campus technical education history'
    ]
  },
  {
    id: 'sydney-university-studio-building',
    name: 'The Studio',
    aliases: ['the studio', 'studio'],
    summary:
      'The Studio is part of the creative and collaborative spaces on campus that support design, media, and student experimentation. It reflects the broader university culture of innovation, art, and interdisciplinary learning.',
    sources: [
      'University of Sydney creative education records',
      'Campus spaces and student life planning'
    ]
  }
];

function findUsydBuilding(landmarkName) {
  const cleanName = normaliseLandmarkName(landmarkName).toLowerCase();

  if (!cleanName) {
    return null;
  }

  for (const building of usydBuildings) {
    const exactName = building.name.toLowerCase() === cleanName;
    const exactAlias = building.aliases.some((alias) => alias.toLowerCase() === cleanName);

    if (exactName || exactAlias) {
      return building;
    }

    const relevantAliases = building.aliases
      .map((alias) => alias.toLowerCase())
      .filter((alias) => alias.length > 4);

    const partialAliasMatch = relevantAliases.some((alias) => {
      return cleanName.includes(alias) || alias.includes(cleanName);
    });

    if (partialAliasMatch) {
      return building;
    }
  }

  return null;
}

function buildFallbackLandmarkSummary(landmarkName) {
  const cleanName = normaliseLandmarkName(landmarkName);
  const matchingBuilding = findUsydBuilding(cleanName);

  if (matchingBuilding) {
    return {
      summary: matchingBuilding.summary,
      sources: matchingBuilding.sources,
      sourceType: 'local-usyd-database'
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

  const matchingBuilding = findUsydBuilding(cleanName);
  if (matchingBuilding) {
    return {
      summary: matchingBuilding.summary,
      sources: matchingBuilding.sources,
      sourceType: 'local-usyd-database'
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

app.post('/api/landmark-summary', async (req, res) => {
  try {
    const { landmarkName } = req.body || {};
    const result = await generateLandmarkSummary(landmarkName);

    res.json({
      landmark: normaliseLandmarkName(landmarkName),
      summary: result.summary,
      sources: result.sources,
      sourceType: result.sourceType
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
      sourceType: result.sourceType
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
