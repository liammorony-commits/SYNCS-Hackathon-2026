const assert = require('node:assert/strict');
const { test } = require('node:test');

const app = require('./server');
const {
  SUMMARY_VERSION,
  VERIFIED_AT,
  findUsydLandmark,
  normaliseLandmarkLookup,
  usydLandmarks
} = require('./usyd-landmarks');

function findRouteHandler(method, path) {
  const routeLayer = app._router.stack
    .filter((candidate) => candidate.route?.path === path)
    .flatMap((candidate) => candidate.route.stack)
    .find((candidate) => candidate.method === method);
  assert.ok(routeLayer, `Missing ${method.toUpperCase()} ${path} route`);
  return routeLayer.handle;
}

function invokeRoute(method, path, request = {}) {
  return new Promise((resolve, reject) => {
    const response = {
      statusCode: 200,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(body) {
        resolve({ body, statusCode: this.statusCode });
      }
    };

    try {
      Promise.resolve(findRouteHandler(method, path)(request, response)).catch(reject);
    } catch (error) {
      reject(error);
    }
  });
}

test('USYD catalogue contains 24 versioned and independently sourced summaries', () => {
  assert.equal(usydLandmarks.length, 24);
  assert.equal(SUMMARY_VERSION, 2);
  assert.match(VERIFIED_AT, /^\d{4}-\d{2}-\d{2}$/);

  const ids = new Set();

  for (const landmark of usydLandmarks) {
    assert.ok(!ids.has(landmark.id), `Duplicate landmark id: ${landmark.id}`);
    ids.add(landmark.id);

    assert.ok(landmark.name.length > 2, `Missing name for ${landmark.id}`);
    assert.ok(landmark.kind, `Missing kind for ${landmark.id}`);
    assert.equal(landmark.summaryVersion, SUMMARY_VERSION);
    assert.equal(landmark.verifiedAt, VERIFIED_AT);
    assert.ok(landmark.aliases.length > 0, `Missing aliases for ${landmark.id}`);
    assert.ok(landmark.sources.length >= 2, `Missing sources for ${landmark.id}`);

    const sentences = [...new Intl.Segmenter('en', { granularity: 'sentence' }).segment(landmark.summary)]
      .map(({ segment }) => segment.trim())
      .filter(Boolean);
    assert.equal(sentences.length, 2, `${landmark.id} must have exactly two sentences`);

    for (const source of landmark.sources) {
      const url = new URL(source);
      assert.equal(url.protocol, 'https:', `Non-HTTPS source for ${landmark.id}`);
    }
  }
});

test('Every building exposed by the app resolves to a curated catalogue entry', () => {
  const appBuildingNames = new Map([
    ['The Quadrangle', 'quadrangle'],
    ['School of IT (J12)', 'school-information-technologies'],
    ['New Law Building (F10)', 'new-law-building'],
    ['Fisher Library (F03)', 'fisher-library'],
    ['Abercrombie Building (H70)', 'abercrombie-building'],
    ['Charles Perkins Centre (D17)', 'charles-perkins-centre'],
    ['Carslaw Building (F07)', 'carslaw-building'],
    ['PNR Learning Hub', 'pnr-learning-hub'],
    ['Seymour Centre', 'seymour-centre']
  ]);

  for (const [name, expectedId] of appBuildingNames) {
    assert.equal(findUsydLandmark(name)?.id, expectedId, `No curated match for ${name}`);
  }
});

test('Every catalogue name and alias resolves uniquely to its own record', () => {
  const lookupOwners = new Map();

  for (const landmark of usydLandmarks) {
    for (const lookupValue of [landmark.name, ...landmark.aliases]) {
      const normalisedValue = normaliseLandmarkLookup(lookupValue);
      const previousOwner = lookupOwners.get(normalisedValue);

      assert.ok(
        !previousOwner || previousOwner === landmark.id,
        `Duplicate lookup value ${lookupValue}: ${previousOwner} and ${landmark.id}`
      );
      lookupOwners.set(normalisedValue, landmark.id);
      assert.equal(findUsydLandmark(lookupValue)?.id, landmark.id);
    }
  }
});

test('Former, renamed and ambiguous catalogue labels are disclosed honestly', () => {
  assert.equal(findUsydLandmark('Abercrombie Building (H70)').name, 'Belinda Hutchinson Building');
  assert.equal(findUsydLandmark('Butlin Building').kind, 'street');
  assert.equal(findUsydLandmark('University Commons').kind, 'unresolved-place');
  assert.equal(findUsydLandmark('The Studio').kind, 'unresolved-place');
  assert.equal(findUsydLandmark('McMillan Building').kind, 'former-building');
  assert.equal(findUsydLandmark('University Hall').kind, 'nearby-heritage-building');
});

test('Catalogue and summary endpoints expose the regenerated metadata', async () => {
  const catalogueResponse = await invokeRoute('get', '/api/usyd-landmarks');
  assert.equal(catalogueResponse.statusCode, 200);
  assert.equal(catalogueResponse.body.count, usydLandmarks.length);
  assert.equal(catalogueResponse.body.summaryVersion, SUMMARY_VERSION);
  assert.equal(catalogueResponse.body.verifiedAt, VERIFIED_AT);

  const summaryResponse = await invokeRoute('get', '/api/landmark-summary', {
    query: { name: 'Abercrombie Building (H70)' }
  });
  assert.equal(summaryResponse.statusCode, 200);

  const summary = summaryResponse.body;
  assert.equal(summary.sourceType, 'curated-usyd-catalogue');
  assert.equal(summary.canonicalName, 'Belinda Hutchinson Building');
  assert.equal(summary.summaryVersion, SUMMARY_VERSION);
  assert.equal(summary.verifiedAt, VERIFIED_AT);
  assert.ok(summary.sources.every((source) => source.startsWith('https://')));
});

test('Quadrangle location copy uses the same canonical summary', async () => {
  const response = await invokeRoute('get', '/api/location/:location', {
    params: { location: 'quadrangle' }
  });
  assert.equal(response.statusCode, 200);
  assert.equal(response.body.description, findUsydLandmark('quadrangle').summary);
});
