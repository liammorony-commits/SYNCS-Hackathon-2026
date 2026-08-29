const HOLOGRAM_ASSET_ROOT = '/assets/holograms/edmund-blacket';

function createEdmundBlacket3DCharacter() {
  return {
    identity: {
      name: 'Edmund Thomas Blacket',
      displayName: 'Edmund Blacket',
      knownFor: "Architect of the University of Sydney's original Great Hall and East Range",
      era: 'Mid-Victorian, reconstructed as c. 1857',
      nationality: 'English-born Australian architect',
      ageApproximation: 'about 39–40 in 1857'
    },
    reconstruction: {
      type: 'artist-reconstruction',
      reference: 'Later-life portrait supplied by the project team',
      disclosure:
        "Artist's reconstruction based on an archival portrait. Appearance at the younger age and movement are dramatised.",
      historicalConfidence: {
        identity: 'high',
        sitePresence: 'high',
        clothing: 'period-informed',
        movement: 'inferred'
      }
    },
    appearance: {
      posture: 'upright, formal and measured',
      face: 'serious gaze, high forehead and strong facial planes',
      hair: 'side-parted and wavy',
      facialHair: 'long mutton-chop side-whiskers with no moustache',
      attire: [
        'dark mid-Victorian frock coat',
        'waistcoat',
        'high white collar',
        'dark cravat',
        'tailored trousers',
        'leather shoes'
      ]
    },
    performance: {
      states: ['materialise', 'walk', 'inspect_plan', 'walk', 'dematerialise'],
      motionStyle: 'measured, deliberate and grounded',
      props: ['rolled architectural plan', 'unrolled elevation drawing']
    },
    future3d: {
      format: 'glTF/GLB humanoid',
      origin: 'between the feet at ground level',
      units: 'metres',
      requiredClips: ['idle', 'walk_in_place', 'inspect_plan'],
      note: 'The current release is a 2.5D preview, not a rigged 3D model.'
    }
  };
}

function generateQuadrangleHologramScene() {
  const character = createEdmundBlacket3DCharacter();

  return {
    schemaVersion: '1.0.0',
    id: 'sydney-quadrangle-edmund-blacket-1857',
    location: {
      id: 'quadrangle',
      name: 'University of Sydney Quadrangle',
      sceneDate: 'c. 1857',
      coordinateSystem: 'scene-percent',
      groundPlaneYPct: 92
    },
    person: {
      ...character.identity,
      role: 'architect and site supervisor',
      summary:
        "Appointed University architect in 1854, Edmund Blacket designed its first purpose-built range and Great Hall. This reconstruction imagines him comparing an elevation drawing with the sandstone work during construction, around 1857.",
      character: character.appearance
    },
    reconstruction: character.reconstruction,
    action: {
      title: 'A site inspection, c. 1857',
      description:
        'Blacket crosses the work site, pauses to compare an architectural elevation with the sandstone buildings, then continues on.',
      historicalBasis:
        'Blacket designed and supervised the work, and an 1857 ambrotype records him at the partially built Great Hall. The precise walk and plan-reading gesture are inferred.'
    },
    assets: {
      compositing: 'runtime-black-key-to-alpha',
      background: 'transparent',
      poster: `${HOLOGRAM_ASSET_ROOT}/inspect-plan.png`,
      states: {
        walk: {
          src: `${HOLOGRAM_ASSET_ROOT}/walk.png`,
          width: 1039,
          height: 1514
        },
        inspectPlan: {
          src: `${HOLOGRAM_ASSET_ROOT}/inspect-plan.png`,
          width: 1040,
          height: 1513
        }
      }
    },
    animation: {
      loop: true,
      durationMs: 14000,
      easing: 'linear',
      keyframes: [
        { offset: 0, xPct: -12, yPct: 92, scale: 0.78, opacity: 0, phase: 'materialising' },
        { offset: 0.08, xPct: -5, yPct: 92, scale: 0.82, opacity: 0.88, phase: 'walking' },
        { offset: 0.46, xPct: 49, yPct: 92, scale: 0.98, opacity: 0.92, phase: 'walking' },
        { offset: 0.5, xPct: 53, yPct: 92, scale: 1, opacity: 0.96, phase: 'inspecting plans' },
        { offset: 0.73, xPct: 53, yPct: 92, scale: 1, opacity: 0.96, phase: 'inspecting plans' },
        { offset: 0.79, xPct: 59, yPct: 92, scale: 0.98, opacity: 0.92, phase: 'walking' },
        { offset: 0.95, xPct: 105, yPct: 92, scale: 0.84, opacity: 0.78, phase: 'walking' },
        { offset: 1, xPct: 114, yPct: 92, scale: 0.8, opacity: 0, phase: 'dematerialising' }
      ],
      actionWindows: {
        walking: [
          { start: 0.06, end: 0.49 },
          { start: 0.77, end: 0.98 }
        ],
        inspectPlan: { start: 0.48, end: 0.77 }
      }
    },
    accessibility: {
      label:
        'Artist reconstruction of Edmund Blacket walking across the Quadrangle and pausing to inspect an architectural plan.',
      reducedMotionState: 'inspectPlan'
    },
    ar: {
      status: 'overlay-ready',
      currentMode: 'transparent-2.5d-dom-overlay',
      overlayUrl: '/',
      modelUrl: null,
      scaleMetres: 1.76,
      anchor: 'screen-space',
      targetAnchor: 'local-floor',
      headingDegrees: null,
      requiredCapabilities: ['surface placement', 'world tracking', 'depth occlusion'],
      note:
        'The transparent overlay is ready for camera compositing. Add a rigged GLB before enabling world-tracked spatial placement.'
    },
    sources: [
      {
        title: 'University of Sydney — Places of interest: Great Hall and Quadrangle',
        url: 'https://www.sydney.edu.au/engage/visit/places-of-interest.html'
      },
      {
        title: 'University of Sydney Archives — Under construction',
        url: 'https://www.sydney.edu.au/news-opinion/news/2018/02/01/under-construction.html'
      },
      {
        title: 'State Library of NSW — Architecture in nineteenth-century Sydney',
        url: 'https://www.sl.nsw.gov.au/stories/architecture-nineteenth-century-sydney'
      }
    ]
  };
}

module.exports = {
  createEdmundBlacket3DCharacter,
  generateQuadrangleHologramScene
};
