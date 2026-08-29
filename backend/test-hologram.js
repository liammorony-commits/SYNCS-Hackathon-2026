const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {
  createEdmundBlacket3DCharacter,
  generateQuadrangleHologramScene
} = require('./hologram');

test('Edmund Blacket reconstruction is explicit about evidence and inference', () => {
  const character = createEdmundBlacket3DCharacter();

  assert.equal(character.identity.displayName, 'Edmund Blacket');
  assert.equal(character.reconstruction.historicalConfidence.sitePresence, 'high');
  assert.equal(character.reconstruction.historicalConfidence.movement, 'inferred');
  assert.match(character.reconstruction.disclosure, /reconstruction/i);
});

test('Quadrangle scene exposes a complete, ordered animation path', () => {
  const scene = generateQuadrangleHologramScene();
  const frames = scene.animation.keyframes;

  assert.equal(scene.schemaVersion, '1.0.0');
  assert.equal(scene.location.coordinateSystem, 'scene-percent');
  assert.equal(scene.animation.durationMs, 14000);
  assert.equal(frames[0].offset, 0);
  assert.equal(frames.at(-1).offset, 1);
  assert.ok(frames.some((frame) => frame.phase === 'inspecting plans'));

  for (let index = 1; index < frames.length; index += 1) {
    assert.ok(frames[index].offset >= frames[index - 1].offset, 'frame offsets must be ordered');
  }

  for (const frame of frames) {
    assert.ok(frame.xPct >= -20 && frame.xPct <= 120, 'xPct must stay near the scene');
    assert.ok(frame.yPct >= 0 && frame.yPct <= 100, 'yPct must be a scene percentage');
    assert.ok(frame.scale > 0, 'scale must be positive');
    assert.ok(frame.opacity >= 0 && frame.opacity <= 1, 'opacity must be normalised');
  }
});

test('Every browser-rendered hologram asset exists', () => {
  const scene = generateQuadrangleHologramScene();
  const assetUrls = [
    scene.assets.poster,
    ...Object.values(scene.assets.states).flatMap((asset) =>
      [asset.src, asset.fallbackSrc].filter(Boolean)
    )
  ];

  for (const assetUrl of new Set(assetUrls)) {
    const assetPath = path.join(__dirname, 'public', assetUrl.replace(/^\//, ''));
    assert.ok(fs.existsSync(assetPath), `missing asset: ${assetUrl}`);
    assert.ok(fs.statSync(assetPath).size > 1000, `asset is unexpectedly small: ${assetUrl}`);
  }
});

test('Walk state exposes a complete, naturally paced sprite cycle', () => {
  const scene = generateQuadrangleHologramScene();
  const walk = scene.assets.states.walk;
  const firstWindowMs =
    (scene.animation.actionWindows.walking[0].end -
      scene.animation.actionWindows.walking[0].start) *
    scene.animation.durationMs;
  const secondWindowMs =
    (scene.animation.actionWindows.walking[1].end -
      scene.animation.actionWindows.walking[1].start) *
    scene.animation.durationMs;

  assert.equal(walk.type, 'sprite-sheet');
  assert.equal(walk.columns * walk.rows, walk.frameCount);
  assert.equal(walk.frameOrder.length, walk.frameCount);
  assert.equal(walk.cycleDurationMs, 980);
  assert.equal(firstWindowMs / walk.cycleDurationMs, 6);
  assert.equal(secondWindowMs / walk.cycleDurationMs, 5);
});

test('Browser entry point is a transparent, description-free AR layer', () => {
  const html = fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8');

  assert.match(html, /background:\s*transparent !important/);
  assert.match(html, /function blackKeyToAlpha/);
  assert.match(html, /function extractWalkCycle/);
  assert.match(html, /function updateWalkFrame/);
  assert.match(html, /window\.TimeLensHologram/);
  assert.doesNotMatch(html, /scene__photo|identity-card|story-section|historical-summary/);
});

test('AR overlay readiness is separate from world-tracked 3D readiness', () => {
  const scene = generateQuadrangleHologramScene();

  assert.equal(scene.assets.background, 'transparent');
  assert.equal(scene.assets.compositing, 'runtime-black-key-to-alpha');
  assert.equal(scene.ar.status, 'overlay-ready');
  assert.equal(scene.ar.currentMode, 'transparent-2.5d-dom-overlay');
  assert.equal(scene.ar.anchor, 'screen-space');
  assert.equal(scene.ar.targetAnchor, 'local-floor');
  assert.equal(scene.ar.modelUrl, null);
  assert.match(scene.ar.note, /rigged GLB/i);
});
