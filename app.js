const MOCK_BUILDINGS = [
  {
    id: "quadrangle",
    name: "The Quadrangle",
    meta: "1859 · neo-gothic / sandstone",
    lat: -33.8860547,
    lng: 151.1888052,
    history: "The University of Sydney Quadrangle began in 1855 with Edmund Blacket's East Range and Great Hall; later additions extended the sandstone ensemble into the twentieth century, with the West Tower completed in 1966. Built as Gothic and Tudor Revival ranges around a court, it remains the University's symbolic heart and forms part of an exceptionally significant group of Gothic Revival buildings.",
    comments: [
      {text:"Took my graduation photos right here by the jacaranda tree.", activity:"watch", likes:142, era:"past", author:"sarah_m"},
      {text:"Still getting lost trying to find my tutorial room in these corridors.", activity:"wander", likes:56, era:"present", author:"j.chen"},
      {text:"Sitting on the grass between lectures when the sun is out.", activity:"sit", likes:89, era:"present", author:"anon"},
      {text:"Met my sailing crew here before heading out to the harbor for the weekend.", activity:"meet", likes:45, era:"past", author:"ellie"},
      {text:"Reading for my history seminar in the cloisters.", activity:"work", likes:21, era:"present", author:"anon"},
      {text:"Anyone free around here?", activity:"meet", likes:12, era:"present", author:"henry.m"}
    ]
  },
  {
    id: "sit_j12",
    name: "School of IT (J12)",
    meta: "2006 · contemporary / steel & glass",
    lat: -33.888221,
    lng: 151.194049,
    history: "Completed in 2007 through the Campus 2010 program, J12 was built as the School of Information Technologies Building. The University now identifies it as the Computer Science Building, which houses computer science teaching and research as well as the Faculty of Engineering Dean's office.",
    comments: [
      {text:"Been staring at the same AutoHotkey script error for three hours.", activity:"work", likes:128, era:"present", author:"dev_danny"},
      {text:"Surviving the SYNCS hackathon purely on energy drinks and spite.", activity:"rush", likes:84, era:"present", author:"hack_0x"},
      {text:"Wandering the halls trying to find a free monitor on level 1.", activity:"wander", likes:45, era:"present", author:"anon"},
      {text:"Watching the sun come up through the glass louvres after an all-nighter.", activity:"watch", likes:62, era:"past", author:"c_plus_plus"},
      {text:"Meeting my group project team here because nobody else wanted to host.", activity:"meet", likes:31, era:"present", author:"j.smith"}
    ]
  },
  {
    id: "newlaw",
    name: "New Law Building (F10)",
    meta: "2009 · contemporary / glass louvres",
    lat: -33.8887,
    lng: 151.1895,
    history: "Sydney Law School relocated to the Francis-Jones Morehen Thorp-designed New Law Building on Eastern Avenue in 2009. The award-winning purpose-built complex brings together a moot court, law library, teaching spaces and a public forecourt for legal education and research.",
    comments: [
      {text:"The coffee line at Taste is always way too long, but I wait anyway.", activity:"wander", likes:67, era:"present", author:"priya.s"},
      {text:"Cramming for the LAWS1026 exam on level 2. Should have done my readings.", activity:"work", likes:112, era:"present", author:"anon"},
      {text:"Staring blankly at my notes on the Doctrine of Reception and the Mabo decision.", activity:"work", likes:88, era:"present", author:"l.student"},
      {text:"Meeting my mooting partner here before the internal comp.", activity:"meet", likes:34, era:"past", author:"d.williams"},
      {text:"Rushing to the basement lecture theatre, always out of breath.", activity:"rush", likes:55, era:"past", author:"alex_b"}
    ]
  },
  {
    id: "fisher",
    name: "Fisher Library (F03)",
    meta: "1962 · modern / academic",
    lat: -33.8864494,
    lng: 151.1905904,
    history: "The current Fisher Library was designed by Ken Woolley and Tom O'Mahoney as a mid-century modern replacement for the original 1909 library in what is now MacLaurin Hall, with its undergraduate wing opening in 1963. It is the University's only building to have received both a Sulman Award and a RIBA Bronze Medal and remains a major centre for study, collections and student life.",
    comments: [
      {text:"Fell asleep on level 5 trying to finish a research essay.", activity:"work", likes:156, era:"past", author:"matt_t"},
      {text:"Wandering the stacks looking for a book that's allegedly 'available'.", activity:"wander", likes:72, era:"present", author:"lucy_w"},
      {text:"Sitting by the window looking out over Victoria Park.", activity:"sit", likes:63, era:"present", author:"sam.k"},
      {text:"Rushing to return a reserve book before I get fined.", activity:"rush", likes:28, era:"present", author:"anon"}
    ]
  },
  {
    id: "cpc",
    name: "Charles Perkins Centre (D17)",
    meta: "2014 · contemporary / biomedical",
    lat: -33.8874395,
    lng: 151.1835069,
    history: "Established in 2012, the Charles Perkins Centre's D17 research and education hub opened in June 2014 beside Royal Prince Alfred Hospital with laboratories, teaching spaces, core facilities, a pathology museum and a clinic. Named for alumnus and Aboriginal rights activist Charles Perkins, the Centre brings multiple disciplines together to address obesity, diabetes, cardiovascular disease and related conditions.",
    comments: [
      {text:"Changed my major from Med to Law, but I still walk over here just for the good coffee.", activity:"wander", likes:118, era:"present", author:"former_premed"},
      {text:"Watching everyone stress about their anatomy practicals from the upper balconies.", activity:"watch", likes:75, era:"past", author:"bio_major"},
      {text:"Sitting in the sun outside recovering from a brutal cross country training run.", activity:"sit", likes:54, era:"present", author:"runner_01"},
      {text:"Working on my biology lab report in the ground floor cafe.", activity:"work", likes:33, era:"present", author:"anon"}
    ]
  },
  {
    id: "carslaw",
    name: "Carslaw Building (F07)",
    meta: "1960s · brutalist / academic",
    lat: -33.8882312,
    lng: 151.1907681,
    history: "Carslaw Building was begun in 1960 and completed in 1965 at the southern end of Eastern Avenue as a building for first-year science and mathematics. It remains an academic building with teaching spaces and University units including the School of History and Philosophy of Science.",
    comments: [
      {text:"Been wandering around level 3 for ten minutes trying to find room 373.", activity:"wander", likes:210, era:"present", author:"lost_first_year"},
      {text:"Rushing to the rooftop to catch the environmental cleanup team meeting.", activity:"rush", likes:45, era:"past", author:"green_team"},
      {text:"Sitting on the floor outside the lab waiting for the tutor to show up.", activity:"sit", likes:88, era:"present", author:"anon"},
      {text:"Working through a calculus problem set that makes no sense.", activity:"work", likes:67, era:"past", author:"math_major"}
    ]
  },
  {
    id: "pnr_hub",
    name: "PNR Learning Hub",
    meta: "2019 · modern / engineering",
    lat: -33.8904532,
    lng: 151.1930938,
    history: "PNR Learning Hub occupies Level 2 of the Peter Nicol Russell Building at J02 on the Darlington campus. Operated by the University Library, it provides computers, study pods, printing, lockers and other collaborative study facilities with public and University access.",
    comments: [
      {text:"Spent twelve hours straight working on the capstone project in these pods.", activity:"work", likes:114, era:"present", author:"eng_student"},
      {text:"Rushing from Carslaw to PNR in 5 minutes should be classified as an extreme sport.", activity:"rush", likes:89, era:"present", author:"runner_02"},
      {text:"Meeting my design team on level 4 before the project milestone deadline.", activity:"meet", likes:42, era:"present", author:"alex_z"},
      {text:"Sitting by the massive glass windows watching the campus walk by.", activity:"sit", likes:61, era:"present", author:"anon"},
      {text:"Used to be an old workshop back when I studied here in the 90s. Totally unrecognizable now.", activity:"watch", likes:78, era:"past", author:"old_grad"}
    ]
  },
  {
    id: "seymour_centre",
    name: "Seymour Centre",
    meta: "1975 · brutalist / performing arts",
    lat: -33.8885683,
    lng: 151.1935486,
    history: "The Seymour Centre opened on the Darlington campus in 1975 after businessman Everest York Seymour left a bequest for a centre devoted to musical and dramatic arts. Designed by Allen Jack and Cottier in a bold Brutalist style, it remains a major University performing-arts venue and supporter of independent artists and arts education.",
    comments: [
      {text:"Performing in the annual law revue on the York Theatre stage.", activity:"work", likes:95, era:"present", author:"revue_star"},
      {text:"Rushing to make curtain call after an evening lecture at New Law.", activity:"rush", likes:44, era:"present", author:"theatre_kid"},
      {text:"Sitting in the courtyard cafe having a coffee before the show starts.", activity:"sit", likes:60, era:"present", author:"drama_buff"},
      {text:"Meeting up with the cast after opening night to celebrate.", activity:"meet", likes:82, era:"past", author:"stage_mgr"},
      {text:"Wandering through the lobby looking at old show posters from decades past.", activity:"wander", likes:37, era:"past", author:"alum_05"}
    ]
  }
];

/* ============================================================
   UNDERTOW — prototype (Hybrid Geolocation + Radius Filtering)
   ============================================================ */

const ACTIVITY_LABEL = {
  wander:"wanders through", sit:"sits and stays", meet:"meets someone",
  work:"works here", rush:"rushes past", watch:"watches the building"
};

const SEEDED_AUTHOR_NAMES = {
  quadrangle:["Sarah M.", "Jason C.", "Amelia R.", "Ellie T.", "Noah B.", "Henry M."],
  sit_j12:["Danny K.", "Xavier H.", "Maya L.", "Chloe P.", "James S."],
  newlaw:["Priya S.", "Olivia T.", "Liam R.", "Daniel W.", "Alex B."],
  fisher:["Matthew T.", "Lucy W.", "Samuel K.", "Emma J."],
  cpc:["Sophie P.", "Bianca M.", "Riley C.", "Grace L."],
  carslaw:["Ethan L.", "Georgia T.", "Ava N.", "Mason M."],
  pnr_hub:["Emily S.", "Ryan D.", "Alex Z.", "Hannah P.", "Oliver G."],
  seymour_centre:["Ruby S.", "Theo K.", "Diana B.", "Stella M.", "Alice F."]
};

// Fixed "story time" the whole app's comment timestamps are anchored to,
// rather than the real current time — keeps past/present feeling consistent
// no matter when this is actually opened.
const COMMENT_TIME_REFERENCE = new Date(2026, 7, 30, 9, 0, 0).getTime();

// Past comments get an actual computed date (~10 years back); present
// comments just get a random "N minutes ago" label, no real date.
function seededCommentTiming(era, buildingId, index){
  const seed = [...buildingId].reduce((total, char) => total + char.charCodeAt(0), 0) + index * 17;
  if(era === "past"){
    const tenYearsMs = 10 * 365.25 * 24 * 60 * 60 * 1000;
    const wiggleMs = ((seed % 121) - 60) * 24 * 60 * 60 * 1000;
    return { timestamp: COMMENT_TIME_REFERENCE - tenYearsMs + wiggleMs, timeLabel: null };
  }
  const minutesAgo = (seed % 60) + 1;
  return { timestamp: null, timeLabel: minutesAgo === 1 ? "1 minute ago" : `${minutesAgo} minutes ago` };
}

function formatRelativeTime(timestamp){
  const diffMs = COMMENT_TIME_REFERENCE - timestamp;
  const diffDays = Math.round(diffMs / 86400000);
  const diffYears = Math.round(diffMs / (365.25 * 86400000));
  if(diffYears >= 1) return `${diffYears}y ago`;
  return `${diffDays}d ago`;
}

function formatCommentTime(c){
  if(c.isSeeded) return c.era === "past" ? formatRelativeTime(c.timestamp) : c.timeLabel;
  const timestamp = Date.parse(c.timestamp);
  if(!Number.isFinite(timestamp)) return "just now";
  const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
  if(seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if(minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if(hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

// Comments added by the user are only kept in memory otherwise, and vanish
// on reload or re-scanning the same building — persist them per-building
// in localStorage so they stick around on this device.
function getStoredComments(buildingId){
  try{
    const raw = localStorage.getItem(`undertow_comments_${buildingId}`);
    return raw ? JSON.parse(raw) : [];
  }catch(e){ return []; }
}

function addStoredComment(buildingId, comment){
  try{
    const list = getStoredComments(buildingId);
    list.push(comment);
    localStorage.setItem(`undertow_comments_${buildingId}`, JSON.stringify(list));
  }catch(e){ /* storage unavailable or full — comment still shows for this session */ }
}

let state = {
  era: "present",
  building: null,
  comments: [],
  photoDataURL: null,
  scanPhotoDataURL: null,
  selectedCommentId: null,
  stream: null,
  facingMode: "environment"
};

const SHOW_COMMENTS = true;
const SHOW_SILHOUETTES = false; // temporarily disabled

let silhouettes = [];
let canvas, ctx, rafId;

const $ = (id) => document.getElementById(id);

/* ---------------- PAST PANORAMA (Quadrangle only) ---------------- */
const PANORAMA_BUILDING_ID = "quadrangle";
const PANORAMA_ORIENTATION_HALF_RANGE_DEG = 60; // turning 60° either way pans to the edge
const PANORAMA_TILT_HALF_RANGE_DEG = 30;

let panoramaOffsetX = 0;
let panoramaOffsetY = 0;
let panoramaMaxX = 0;
let panoramaMaxY = 0;
let panoramaBaseAlpha = null;
let panoramaBaseBeta = null;
let panoramaOrientationAttached = false;
const canvasDrag = { active: false, moved: false, startX: 0, startY: 0, lastX: 0, lastY: 0 };

function isQuadranglePast(){
  return state.era === "past" && !!state.building && state.building.id === PANORAMA_BUILDING_ID;
}

function updatePanoramaTransform(){
  const world = $("past-panorama-world");
  if(world) world.style.transform = `translate(${-panoramaOffsetX}px, ${-panoramaOffsetY}px)`;
}

function getStoredLikes(buildingId){
  try{
    const raw = localStorage.getItem(`undertow_likes_${buildingId}`);
    return raw ? JSON.parse(raw) : {};
  }catch(e){ return {}; }
}

function storeCommentLike(buildingId, comment){
  try{
    const likes = getStoredLikes(buildingId);
    likes[comment.id] = { likes:comment.likes, liked:!!comment.liked };
    localStorage.setItem(`undertow_likes_${buildingId}`, JSON.stringify(likes));
  }catch(e){ /* Like still updates for this session when storage is unavailable. */ }
}

function recalcPanoramaBounds(){
  const container = $("past-panorama");
  const world = $("past-panorama-world");
  if(!container || !world) return;
  panoramaMaxX = Math.max(0, world.offsetWidth - container.clientWidth);
  panoramaMaxY = Math.max(0, world.offsetHeight - container.clientHeight);
  panoramaOffsetX = Math.min(Math.max(panoramaOffsetX, 0), panoramaMaxX);
  panoramaOffsetY = Math.min(Math.max(panoramaOffsetY, 0), panoramaMaxY);
  updatePanoramaTransform();
}

function setPanoramaOffset(x, y = panoramaOffsetY){
  panoramaOffsetX = Math.min(Math.max(x, 0), panoramaMaxX);
  panoramaOffsetY = Math.min(Math.max(y, 0), panoramaMaxY);
  updatePanoramaTransform();
}

function onDeviceOrientation(e){
  if(e.alpha == null) return;
  if(panoramaBaseAlpha === null) panoramaBaseAlpha = e.alpha;
  if(panoramaBaseBeta === null && e.beta != null) panoramaBaseBeta = e.beta;
  let delta = e.alpha - panoramaBaseAlpha;
  if(delta > 180) delta -= 360;
  if(delta < -180) delta += 360;
  // DeviceOrientationEvent.alpha increases turning counter-clockwise (i.e.
  // turning left), but turning left should reveal the image's own left
  // side (lower offset) — so invert delta to match that expectation.
  const span = PANORAMA_ORIENTATION_HALF_RANGE_DEG * 2;
  const xRatio = Math.min(Math.max((-delta + PANORAMA_ORIENTATION_HALF_RANGE_DEG) / span, 0), 1);
  let yRatio = 0.5;
  if(e.beta != null && panoramaBaseBeta !== null){
    const tilt = e.beta - panoramaBaseBeta;
    yRatio = Math.min(Math.max((tilt + PANORAMA_TILT_HALF_RANGE_DEG) / (PANORAMA_TILT_HALF_RANGE_DEG * 2), 0), 1);
  }
  setPanoramaOffset(xRatio * panoramaMaxX, yRatio * panoramaMaxY);
}

async function enablePanoramaOrientation(){
  if(panoramaOrientationAttached || typeof DeviceOrientationEvent === "undefined") return;
  if(typeof DeviceOrientationEvent.requestPermission === "function"){
    try{
      const result = await DeviceOrientationEvent.requestPermission();
      if(result !== "granted") return;
    }catch(e){ return; }
  }
  panoramaBaseAlpha = null;
  panoramaBaseBeta = null;
  window.addEventListener("deviceorientation", onDeviceOrientation);
  panoramaOrientationAttached = true;
}

function disablePanoramaOrientation(){
  if(panoramaOrientationAttached){
    window.removeEventListener("deviceorientation", onDeviceOrientation);
    panoramaOrientationAttached = false;
  }
}

function activatePanorama(){
  const container = $("past-panorama");
  if(!container) return;
  container.classList.remove("hidden");
  recalcPanoramaBounds();
  panoramaOffsetX = panoramaMaxX / 2;
  panoramaOffsetY = panoramaMaxY / 2;
  updatePanoramaTransform();
  enablePanoramaOrientation();
  const hint = $("stage-hint");
  if(hint) hint.textContent = "drag in any direction or turn your phone to look around the Past";
}

function deactivatePanorama(){
  const container = $("past-panorama");
  if(container) container.classList.add("hidden");
  disablePanoramaOrientation();
  const hint = $("stage-hint");
  if(hint) hint.textContent = "swipe for Past/Present";
}

function syncPastPanorama(){
  if(isQuadranglePast()) activatePanorama();
  else deactivatePanorama();
}

/* ---------------- HOLOGRAM (Edmund Blacket, Quadrangle only) ---------------- */
const HOLOGRAM_ASSET_LOCAL_ROOT = "holograms/edmund-blacket";
const HOLOGRAM_FRAME_POSITIONS = ["0% 0%", "50% 0%", "100% 0%", "0% 100%", "50% 100%", "100% 100%"];

let hologramScene = null;
let hologramSummary = null;
let hologramFetchStarted = false;
let hologramRafId = null;
let hologramStartTime = null;
let hologramSpoken = false;
let hologramPausedAt = null;

const keyedHologramAssets = new Map();

function smoothstep(edge0, edge1, value){
  const t = Math.min(Math.max((value - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
}

function blackKeyHologramAsset(src){
  if(keyedHologramAssets.has(src)) return keyedHologramAssets.get(src);

  const keyedAsset = new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      context.drawImage(image, 0, 0);

      const frame = context.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = frame.data;
      for(let i = 0; i < pixels.length; i += 4){
        const strongestChannel = Math.max(pixels[i], pixels[i + 1], pixels[i + 2]);
        // Remove the noisy near-black matte without clipping the cyan edge glow.
        const matteAlpha = smoothstep(6, 30, strongestChannel);
        pixels[i + 3] = Math.round(pixels[i + 3] * matteAlpha);
      }

      context.putImageData(frame, 0, 0);
      canvas.toBlob(blob => {
        if(!blob){ reject(new Error(`Could not key hologram asset: ${src}`)); return; }
        resolve(URL.createObjectURL(blob));
      }, "image/png");
    };
    image.onerror = () => reject(new Error(`Could not load hologram asset: ${src}`));
    image.src = src;
  });

  keyedHologramAssets.set(src, keyedAsset);
  return keyedAsset;
}

function localHologramAssetPath(remotePath){
  const filename = String(remotePath || "").split("/").pop();
  return `${HOLOGRAM_ASSET_LOCAL_ROOT}/${filename}`;
}

function truncateSummary(text, maxLen){
  if(text.length <= maxLen) return text;
  const cut = text.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(" ");
  return cut.slice(0, lastSpace > 0 ? lastSpace : maxLen).trim() + "…";
}

function pauseHologram(){
  if(hologramPausedAt !== null) return;
  hologramPausedAt = performance.now();
  if(hologramRafId){ cancelAnimationFrame(hologramRafId); hologramRafId = null; }
}

function resumeHologram(){
  if(hologramPausedAt === null) return;
  const pausedDuration = performance.now() - hologramPausedAt;
  if(hologramStartTime !== null) hologramStartTime += pausedDuration;
  hologramPausedAt = null;
  if(!hologramRafId) hologramRafId = requestAnimationFrame(stepHologram);
}

function openHologramReader(){
  if(!hologramSummary || !hologramSummary.summary) return;
  $("hologram-reader-text").textContent = hologramSummary.summary;
  $("hologram-reader").classList.remove("hidden");
  pauseHologram();
}

function closeHologramReader(){
  $("hologram-reader").classList.add("hidden");
  resumeHologram();
}

$("hologram-caption").addEventListener("pointerdown", e => e.stopPropagation());
$("hologram-caption").addEventListener("click", e => {
  e.stopPropagation();
  openHologramReader();
});
$("hologram-caption").addEventListener("keydown", e => {
  if(e.key === "Enter" || e.key === " "){
    e.preventDefault();
    openHologramReader();
  }
});
$("hologram-reader-close").addEventListener("click", closeHologramReader);

async function loadHologramData(){
  if(hologramFetchStarted) return;
  hologramFetchStarted = true;
  try{
    const [sceneRes, summaryRes] = await Promise.all([
      fetch(`${API_BASE}/api/hologram/quadrangle`),
      fetch(`${API_BASE}/api/landmark-summary?name=quadrangle`)
    ]);
    if(sceneRes.ok) hologramScene = await sceneRes.json();
    if(summaryRes.ok) hologramSummary = await summaryRes.json();
  }catch(e){
    console.warn("Hologram data unavailable:", e.message);
  }
}

function findKeyframeSpan(keyframes, progress){
  for(let i=0; i<keyframes.length-1; i++){
    if(progress >= keyframes[i].offset && progress <= keyframes[i+1].offset) return [keyframes[i], keyframes[i+1]];
  }
  return [keyframes[0], keyframes[0]];
}

function lerp(a, b, t){ return a + (b - a) * t; }

function inWindow(windows, progress){
  return windows.some(w => progress >= w.start && progress <= w.end);
}

function stepHologram(timestamp){
  if(!hologramScene){ hologramRafId = requestAnimationFrame(stepHologram); return; }
  if(hologramStartTime === null) hologramStartTime = timestamp;

  const { animation, assets } = hologramScene;
  const elapsed = (timestamp - hologramStartTime) % animation.durationMs;
  const progress = elapsed / animation.durationMs;

  const [k0, k1] = findKeyframeSpan(animation.keyframes, progress);
  const span = k1.offset - k0.offset || 1;
  const t = Math.min(Math.max((progress - k0.offset) / span, 0), 1);

  const xPct = lerp(k0.xPct, k1.xPct, t);
  const scale = lerp(k0.scale, k1.scale, t);
  const opacity = lerp(k0.opacity, k1.opacity, t);

  const stageEl = $("hologram-stage");
  // Keep Edmund in the same world coordinate system as the panorama. His
  // original viewport path is remapped onto the central courtyard floor, so
  // moving the panorama carries him with the architecture instead of sliding
  // independently over the screen.
  const pathStart = animation.keyframes[0].xPct;
  const pathEnd = animation.keyframes[animation.keyframes.length - 1].xPct;
  const pathProgress = Math.min(Math.max((xPct - pathStart) / (pathEnd - pathStart || 1), 0), 1);
  stageEl.style.left = `${lerp(34, 66, pathProgress)}%`;
  stageEl.style.top = "78%";
  stageEl.style.transform = `translate(-50%, -100%) scale(${scale})`;
  stageEl.style.opacity = opacity;

  const isInspecting = inWindow([animation.actionWindows.inspectPlan], progress);
  $("hologram-sprite").classList.toggle("hidden", isInspecting);
  $("hologram-inspect").classList.toggle("hidden", !isInspecting);

  if(!isInspecting){
    const walk = assets.states.walk;
    const cycleMs = (timestamp - hologramStartTime) % walk.cycleDurationMs;
    const frameIdx = Math.floor((cycleMs / walk.cycleDurationMs) * walk.frameCount) % walk.frameCount;
    $("hologram-sprite").style.backgroundPosition = HOLOGRAM_FRAME_POSITIONS[frameIdx] || HOLOGRAM_FRAME_POSITIONS[0];
  }

  if(progress > 0.05 && !hologramSpoken && hologramSummary && hologramSummary.summary){
    hologramSpoken = true;
    speakHologramSummary(hologramSummary.summary);
  }

  hologramRafId = requestAnimationFrame(stepHologram);
}

function speakHologramSummary(text){
  if(typeof window.speechSynthesis === "undefined") return;
  try{
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  }catch(e){ /* speech synthesis is a nice-to-have, ignore failures */ }
}

async function activateHologram(){
  const stageEl = $("hologram-stage");
  if(!stageEl) return;
  await loadHologramData();
  if(!hologramScene) return; // backend unavailable — degrade silently, like the other backend features

  const walkAsset = localHologramAssetPath(hologramScene.assets.states.walk.src);
  const inspectAsset = localHologramAssetPath(hologramScene.assets.poster);
  let keyedWalkAsset = walkAsset;
  let keyedInspectAsset = inspectAsset;
  try{
    [keyedWalkAsset, keyedInspectAsset] = await Promise.all([
      blackKeyHologramAsset(walkAsset), blackKeyHologramAsset(inspectAsset)
    ]);
  }catch(e){ console.warn("Hologram transparency unavailable:", e.message); }

  const sprite = $("hologram-sprite");
  sprite.style.backgroundImage = `url('${keyedWalkAsset}')`;
  $("hologram-inspect").src = keyedInspectAsset;

  if(hologramSummary && hologramSummary.summary){
    $("hologram-caption-text").textContent = truncateSummary(hologramSummary.summary, 70);
    $("hologram-caption").classList.remove("hidden");
  }

  stageEl.classList.remove("hidden");
  hologramStartTime = null;
  hologramSpoken = false;
  if(!hologramRafId) hologramRafId = requestAnimationFrame(stepHologram);
}

function deactivateHologram(){
  const stageEl = $("hologram-stage");
  if(stageEl) stageEl.classList.add("hidden");
  $("hologram-reader").classList.add("hidden");
  hologramPausedAt = null;
  if(hologramRafId){ cancelAnimationFrame(hologramRafId); hologramRafId = null; }
  hologramStartTime = null;
  if(typeof window.speechSynthesis !== "undefined") window.speechSynthesis.cancel();
}

function syncHologram(){
  if(isQuadranglePast()) activateHologram();
  else deactivateHologram();
}

/* ---------------- GEOLOCATION HELPERS ---------------- */
function getDistanceInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3; 
  const rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad;
  const dLon = (lon2 - lon1) * rad;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser."));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 8000,
      maximumAge: 0
    });
  });
}

/* ---------------- PHOTO RECOGNITION (backend vision call) ---------------- */
// Use the current origin by default. This works for both Netlify Dev and the
// deployed site because netlify.toml redirects /api/* to the serverless API.
// A standalone backend can still be selected before app.js loads with:
// window.UNDERTOW_API_BASE = "http://localhost:4000".
const API_BASE = window.UNDERTOW_API_BASE || "";

const PROFILE_STORAGE_KEY = "undertow_user_profile";

function getUserProfile(){
  try{
    const profile = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY));
    return profile?.firstName && profile?.lastInitial && profile?.phone ? profile : null;
  }catch(error){ return null; }
}

function activityLabel(comment){
  return comment.activity === "other"
    ? (comment.customActivity || "does something else here")
    : (ACTIVITY_LABEL[comment.activity] || "visits this place");
}

function fakePhoneNumberFor(name){
  let hash = 0;
  for(let i=0; i<name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  const digits = String(hash).padStart(8, "0").slice(-8);
  return `04${digits.slice(0,2)} ${digits.slice(2,5)} ${digits.slice(5,8)}`;
}

function contactPhoneFor(comment){
  return comment.contactPhone || (comment.isSeeded ? fakePhoneNumberFor(comment.author) : null);
}

function getCommentOwnerId(){
  const storageKey = "undertow_comment_owner_id";
  let ownerId = localStorage.getItem(storageKey);
  if(!ownerId){
    ownerId = crypto.randomUUID ? crypto.randomUUID() : `owner_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(storageKey, ownerId);
  }
  return ownerId;
}

function commentOwnerHeaders(){
  return {"X-Comment-Owner":getCommentOwnerId()};
}

async function fetchBackendComments(buildingId){
  const response = await fetch(`${API_BASE}/api/comments?buildingId=${encodeURIComponent(buildingId)}`, {
    headers:commentOwnerHeaders()
  });
  if(!response.ok) throw new Error("Could not load comments");
  return response.json();
}

async function createBackendComment(buildingId, comment){
  const response = await fetch(`${API_BASE}/api/comments`, {
    method:"POST",
    headers:{"Content-Type":"application/json", ...commentOwnerHeaders()},
    body:JSON.stringify({buildingId, ...comment})
  });
  if(!response.ok) throw new Error("Could not save comment");
  return response.json();
}

async function deleteBackendComment(buildingId, commentId){
  const response = await fetch(`${API_BASE}/api/comments/${encodeURIComponent(commentId)}?buildingId=${encodeURIComponent(buildingId)}`, {
    method:"DELETE",
    headers:commentOwnerHeaders()
  });
  if(!response.ok) throw new Error("Could not delete comment");
}
const PHOTO_CONFIDENCE_THRESHOLD = 0.75;
const PHOTO_ONLY_CONFIDENCE_THRESHOLD = 0.85; // stricter bar when GPS gives us no corroboration at all
const AMBIGUITY_MARGIN_METERS = 100;

async function identifyBuildingFromPhoto(photoDataURL) {
  if (!photoDataURL) return null;
  try {
    const candidates = MOCK_BUILDINGS.map(b => ({ id: b.id, name: b.name, meta: b.meta, history: b.history }));
    const res = await fetch(`${API_BASE}/api/identify-building`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ imageDataURL: photoDataURL, candidates })
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.identified || !data.buildingId) return null;
    return { id: data.buildingId, confidence: data.confidence };
  } catch (e) {
    console.warn("Photo identification unavailable, falling back to GPS:", e.message);
    return null;
  }
}

/* ---------------- CAMERA ---------------- */
async function startCamera(){
  const errEl = $("camera-error");
  errEl.classList.add("hidden");
  try{
    if(state.stream) state.stream.getTracks().forEach(t=>t.stop());
    state.stream = await navigator.mediaDevices.getUserMedia({
      video:{ facingMode: state.facingMode }, audio:false
    });
    $("video").srcObject = state.stream;
  }catch(e){
    errEl.textContent = "camera unavailable (" + e.name + ") — use \"upload photo instead\" below.";
    errEl.classList.remove("hidden");
  }
}

function stopCamera(){
  if(state.stream){ state.stream.getTracks().forEach(t=>t.stop()); state.stream=null; }
}

$("btn-flip").addEventListener("click", ()=>{
  state.facingMode = state.facingMode === "environment" ? "user" : "environment";
  startCamera();
});

$("btn-shutter").addEventListener("click", ()=>{
  const video = $("video");
  if(!video.videoWidth){ $("camera-error").textContent="camera not ready yet — try again in a second."; $("camera-error").classList.remove("hidden"); return; }
  const c = $("capture-canvas");
  const captureScale = Math.min(1, 1280 / video.videoWidth);
  c.width = Math.round(video.videoWidth * captureScale);
  c.height = Math.round(video.videoHeight * captureScale);
  c.getContext("2d").drawImage(video, 0, 0, c.width, c.height);
  const capturedImage = c.toDataURL("image/jpeg", 0.82);
  state.scanPhotoDataURL = capturedImage;
  onPhotoReady(capturedImage, true);
});

$("btn-upload").addEventListener("click", ()=> $("file-input").click());
$("file-input").addEventListener("change", (e)=>{
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = ()=>{
    state.scanPhotoDataURL = null;
    onPhotoReady(reader.result, false);
  };
  reader.readAsDataURL(file);
});

function onPhotoReady(dataURL, isLive){
  state.photoDataURL = dataURL;
  state.isLive = isLive;
  $("camera-hint").textContent = "point at a building";
  if(!isLive) stopCamera();
  showScreen("screen-loading");
  // Give the browser a frame to paint the loading screen before recognition
  // starts, even when GPS or a local response resolves immediately.
  requestAnimationFrame(() => requestAnimationFrame(runRecognition));
}

/* ---------------- RECOGNITION (PHOTO AI + GPS SAFEGUARD METHOD) ---------------- */
async function runRecognition() {
  const scanStartedAt = performance.now();
  const minimumScanDurationMs = 1400;
  $("loading-text").textContent = "analyzing building facade & verifying GPS…";

  // Kick off photo-based identification in parallel with GPS — it's the slower call.
  const photoResultPromise = identifyBuildingFromPhoto(state.photoDataURL);

  function applyPhotoOverride(selectedBuilding, photoResult, scoredBuildings) {
    if (!photoResult || photoResult.confidence < PHOTO_CONFIDENCE_THRESHOLD) return selectedBuilding;
    const matched = MOCK_BUILDINGS.find(b => b.id === photoResult.id);
    if (!matched) return selectedBuilding;

    // Sanity check: only trust the photo over GPS if the guessed building is
    // roughly as close as the nearest GPS candidate. Otherwise a confident but
    // wrong visual guess (e.g. mixing up two similarly-styled buildings) could
    // override a GPS reading that already pinpointed the actual nearest building.
    if (scoredBuildings && scoredBuildings.length > 0) {
      const nearestDist = scoredBuildings[0].dist;
      const matchedEntry = scoredBuildings.find(s => s.building.id === matched.id);
      const matchedDist = matchedEntry ? matchedEntry.dist : Infinity;
      if (matchedDist - nearestDist > AMBIGUITY_MARGIN_METERS) return selectedBuilding;
    }

    return matched;
  }

  async function finishWith(building) {
    const backendCommentsPromise = fetchBackendComments(building.id).catch(error => {
      console.warn(error);
      return [];
    });
    const remainingScanTime = minimumScanDurationMs - (performance.now() - scanStartedAt);
    if(remainingScanTime > 0) await new Promise(resolve => setTimeout(resolve, remainingScanTime));
    state.building = building;
    state.comments = building.comments.map((c, idx) => ({
      id: `seed_${building.id}_${idx}`,
      ...c,
      author: SEEDED_AUTHOR_NAMES[building.id]?.[idx] || "Visitor U.",
      profilePhoto: building.id === "quadrangle" && idx === 5 ? "henry-m-profile.png" : null,
      isSeeded: true,
      photo: null,
      ...seededCommentTiming(c.era, building.id, idx)
    }));
    state.comments.push(...await backendCommentsPromise);
    const storedLikes = getStoredLikes(building.id);
    state.comments.forEach(comment => {
      const stored = storedLikes[comment.id];
      if(stored){ comment.likes = stored.likes; comment.liked = !!stored.liked; }
      else comment.liked = false;
    });
    state.selectedCommentId = null;
    state.era = "present";
    renderResult();
    showScreen("screen-result");
  }

  try {
    const position = await getCurrentPosition();
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;
    const accuracyM = position.coords.accuracy;

    // 1. Get the closest building via standard GPS
    let scoredBuildings = MOCK_BUILDINGS.map(building => {
      const dist = getDistanceInMeters(userLat, userLng, building.lat, building.lng);
      return { building, dist };
    }).sort((a, b) => a.dist - b.dist);

    console.log(`GPS: ${userLat.toFixed(6)}, ${userLng.toFixed(6)} (±${Math.round(accuracyM)}m accuracy)`);
    console.log("Nearest buildings:", scoredBuildings.slice(0, 3).map(s => `${s.building.name}: ${Math.round(s.dist)}m`).join(" · "));

    const MAX_DISTANCE_METERS = 3000;
    let selectedBuilding = scoredBuildings.length > 0 && scoredBuildings[0].dist <= MAX_DISTANCE_METERS
      ? scoredBuildings[0].building
      : MOCK_BUILDINGS[0];

    // 2. The photo is a strong signal, but only when GPS doesn't clearly disagree.
    // (Ambiguity between close-together buildings like PNR/Seymour is handled
    // generically here via AMBIGUITY_MARGIN_METERS, rather than a hardcoded
    // lat/lng rule for one specific pair.)
    const photoResult = await photoResultPromise;
    selectedBuilding = applyPhotoOverride(selectedBuilding, photoResult, scoredBuildings);

    finishWith(selectedBuilding);

  } catch (err) {
    console.warn("Geolocation failed or was denied:", err.message);
    $("loading-text").textContent = "GPS unavailable — analyzing photo…";
    const photoResult = await photoResultPromise;

    // With no GPS to corroborate, require a much more confident photo match
    // before trusting it — otherwise we'd silently default to some building
    // (previously always the Quadrangle) whenever the photo is ambiguous.
    if (photoResult && photoResult.confidence >= PHOTO_ONLY_CONFIDENCE_THRESHOLD) {
      const matched = MOCK_BUILDINGS.find(b => b.id === photoResult.id);
      if (matched) {
        setTimeout(() => finishWith(matched), 500);
        return;
      }
    }

    setTimeout(() => {
      showScreen("screen-capture");
      // camera-error is also set asynchronously by startCamera() and would race
      // with this message, so use camera-hint instead — it's untouched elsewhere.
      $("camera-hint").textContent = "couldn't confidently identify this building — enable location, or try a clearer, closer photo";
    }, 500);
  }
}

/* ---------------- SCREEN NAV ---------------- */
function showScreen(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  $(id).classList.add("active");
  if(id === "screen-capture") startCamera();
}

$("btn-back").addEventListener("click", ()=>{
  cancelAnimationFrame(rafId);
  rafId = null;
  stopCamera();
  deactivatePanorama();
  deactivateHologram();
  document.body.classList.remove("theme-light");
  $("stage-video").srcObject = null;
  showScreen("screen-capture");
});

$("btn-history-toggle").addEventListener("click", ()=>{
  $("history-panel").classList.toggle("hidden");
});

/* ---------------- RESULT RENDER ---------------- */
function renderResult(){
  $("building-name").textContent = state.building.name;
  $("building-meta").textContent = state.building.meta;
  $("building-history").textContent = state.building.history;

  const stageVideo = $("stage-video");
  const stagePhoto = $("stage-photo");
  const liveBadge = $("live-badge");
  
  if(state.isLive && state.stream){
    stageVideo.srcObject = state.stream;
    stageVideo.classList.remove("hidden");
    stagePhoto.classList.add("hidden");
    liveBadge.classList.remove("hidden");
  } else {
    stagePhoto.src = state.photoDataURL;
    stagePhoto.classList.remove("hidden");
    stageVideo.classList.add("hidden");
    liveBadge.classList.add("hidden");
  }
  applyEraUI();
  buildSilhouettes();
  renderCommentsList();
  renderSpotlight();
  if(!rafId && SHOW_SILHOUETTES) animate();
}

function applyEraUI(){
  const stage = $("stage");
  stage.classList.toggle("is-past", state.era==="past");
  stage.classList.toggle("is-present", state.era==="present");
  document.body.classList.toggle("theme-light", state.era==="present");
  $("era-slider").classList.toggle("past", state.era==="past");
  document.querySelectorAll(".era-btn").forEach(b=>{
    b.classList.toggle("active", b.dataset.era===state.era);
  });
  document.body.style.setProperty("--accent", state.era==="past" ? "var(--past)" : "var(--present)");
  document.body.style.setProperty("--accent-dim", state.era==="past" ? "var(--past-dim)" : "var(--present-dim)");
  document.body.style.setProperty("--accent-bg", state.era==="past" ? "var(--past-bg)" : "var(--present-bg)");
  document.body.classList.toggle("is-past", state.era === "past");
  $("btn-add-comment").classList.toggle("hidden", state.era === "past");
  syncPastPanorama();
  syncHologram();
}

document.querySelectorAll(".era-btn").forEach(btn=>{
  btn.addEventListener("click", ()=> setEra(btn.dataset.era));
});

(function(){
  let startX=null;
  const stage = $("stage");
  stage.addEventListener("pointerdown", e=> startX = e.clientX);
  stage.addEventListener("pointerup", e=>{
    if(startX===null) return;
    if(isQuadranglePast()){ startX = null; return; } // panorama drag owns the gesture here
    const dx = e.clientX - startX;
    if(Math.abs(dx) > 50) setEra(dx < 0 ? "past" : "present");
    startX = null;
  });
})();

function setEra(era){
  if(state.era === era) return;
  state.era = era;
  state.selectedCommentId = null;
  applyEraUI();
  buildSilhouettes();
  renderCommentsList();
  renderSpotlight();
}

/* ---------------- COMMENTS LIST ---------------- */
function eraComments(){
  return state.comments.filter(c=>c.era===state.era).sort((a,b)=>b.likes-a.likes);
}

let pendingDeleteCommentId = null;

function openDeleteConfirmation(commentId){
  pendingDeleteCommentId = commentId;
  $("delete-modal-backdrop").classList.remove("hidden");
  $("btn-confirm-delete").focus();
}

function closeDeleteConfirmation(){
  pendingDeleteCommentId = null;
  $("delete-modal-backdrop").classList.add("hidden");
  $("btn-confirm-delete").disabled = false;
}

function renderCommentsList(){
  const section = $("comments-section");
  if(!SHOW_COMMENTS){ if(section) section.classList.add("hidden"); return; }
  if(section) section.classList.remove("hidden");
  const list = eraComments();
  $("comment-count").textContent = "(" + list.length + ")";
  const ul = $("comments-list");
  ul.innerHTML = "";
  list.forEach(c=>{
    const li = document.createElement("li");
    li.className = "comment-item" + (c.id===state.selectedCommentId ? " highlighted":"");
    li.dataset.id = c.id;
    const initial = (c.author || "?").trim().charAt(0).toUpperCase() || "?";
    li.innerHTML = `
      <div class="comment-avatar">${c.profilePhoto ? `<img src="${escapeHTML(c.profilePhoto)}" alt="">` : escapeHTML(initial)}</div>
      <div class="comment-body">
        <p class="comment-text"><span class="comment-username">${escapeHTML(c.author)}</span>${escapeHTML(c.text)}</p>
        <div class="comment-actions">
          <span class="comment-time">${formatCommentTime(c)}</span>
          ${!c.canDelete && contactPhoneFor(c) && state.era !== "past" ? `<button class="btn-contact" data-phone="${escapeHTML(contactPhoneFor(c))}">contact</button>` : ""}
          ${c.canDelete ? `<button class="btn-delete-comment" type="button">delete</button>` : ""}
        </div>
        ${c.photo ? `<img class="comment-photo" src="${c.photo}">` : ""}
      </div>
      <button class="comment-likes${c.liked ? " liked" : ""}" type="button" aria-label="${c.liked ? "Unlike" : "Like"} comment" aria-pressed="${c.liked ? "true" : "false"}">♥ <span>${c.likes}</span></button>
      <span class="activity-tag">${escapeHTML(activityLabel(c))}</span>
    `;
    li.addEventListener("click", ()=> selectComment(c.id, true));
    const likeBtn = li.querySelector(".comment-likes");
    likeBtn.addEventListener("click", e=>{
      e.stopPropagation();
      toggleCommentLike(c.id);
    });
    const contactBtn = li.querySelector(".btn-contact");
    if(contactBtn){
      contactBtn.addEventListener("click", async (e)=>{
        e.stopPropagation();
        const number = contactBtn.dataset.phone;
        try{
          await navigator.clipboard.writeText(number);
          showToast("Copied to clipboard");
        }catch(err){
          showToast(number);
        }
      });
    }
    const deleteBtn = li.querySelector(".btn-delete-comment");
    if(deleteBtn){
      deleteBtn.addEventListener("click", e=>{
        e.stopPropagation();
        openDeleteConfirmation(c.id);
      });
    }
    ul.appendChild(li);
  });
}

function renderSpotlight(){
  const box = $("spotlight-comment");
  if(!SHOW_COMMENTS){ box.classList.add("hidden"); return; }
  const list = eraComments();
  const chosen = state.selectedCommentId
    ? state.comments.find(c=>c.id===state.selectedCommentId)
    : list[0];
  if(!chosen){ box.classList.add("hidden"); return; }
  box.classList.remove("hidden");
  $("spotlight-label").textContent = state.selectedCommentId ? "selected" : "most loved";
  $("spotlight-text").textContent = chosen.text;
  $("spotlight-meta").textContent = `${chosen.author} · ${activityLabel(chosen)} · ♥ ${chosen.likes}`;
}

function selectComment(id, scrollList){
  state.selectedCommentId = id;
  renderCommentsList();
  renderSpotlight();
  if(scrollList){
    document.querySelector(`.comment-item[data-id="${id}"]`)?.scrollIntoView({behavior:"smooth", block:"nearest"});
  }
}

function toggleCommentLike(id){
  const comment = state.comments.find(candidate => candidate.id === id);
  if(!comment || !state.building) return;
  comment.liked = !comment.liked;
  comment.likes = Math.max(0, comment.likes + (comment.liked ? 1 : -1));
  storeCommentLike(state.building.id, comment);
  renderCommentsList();
  renderSpotlight();
  if(comment.liked){
    requestAnimationFrame(()=>{
      const item = document.querySelector(`.comment-item[data-id="${CSS.escape(id)}"]`);
      item?.querySelector(".comment-likes")?.classList.add("just-liked");
    });
  }
}

function clearCommentSelection(){
  if(!state.selectedCommentId) return;
  state.selectedCommentId = null;
  renderCommentsList();
  renderSpotlight();
}

document.addEventListener("pointerdown", e=>{
  if(!e.target.closest(".comment-item")) clearCommentSelection();
});

function escapeHTML(s){
  return s.replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
}

let toastTimer = null;
function showToast(message, durationMs){
  const toast = $("toast");
  if(!toast) return;
  toast.textContent = message;
  toast.classList.remove("hidden");
  clearTimeout(toastTimer);
  requestAnimationFrame(()=> toast.classList.add("show"));
  toastTimer = setTimeout(()=>{
    toast.classList.remove("show");
    setTimeout(()=> toast.classList.add("hidden"), 300);
  }, durationMs || 1600);
}

/* ---------------- SILHOUETTES ---------------- */
function buildSilhouettes(){
  if(!SHOW_SILHOUETTES){ silhouettes = []; return; }
  const list = eraComments();
  const W = $("silhouette-canvas").clientWidth || 300;
  const H = $("silhouette-canvas").clientHeight || 375;
  silhouettes = list.map((c, i)=>{
    const groundY = H*0.62 + Math.random()*H*0.28;
    return {
      commentId: c.id,
      activity: c.activity,
      x: 20 + Math.random()*(W-40),
      y: groundY,
      baseY: groundY,
      vx: 0, vy: 0,
      phase: Math.random()*Math.PI*2,
      target: null,
      speed: 0.25 + Math.random()*0.25,
      partnerIdx: null
    };
  });
  
  const meets = silhouettes.map((s,idx)=>({s,idx})).filter(o=>o.s.activity==="meet");
  for(let i=0;i<meets.length-1;i+=2){
    meets[i].s.partnerIdx = meets[i+1].idx;
    meets[i+1].s.partnerIdx = meets[i].idx;
  }
  resizeCanvas();
}

function resizeCanvas(){
  canvas = $("silhouette-canvas");
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  ctx = canvas.getContext("2d");
}
window.addEventListener("resize", ()=>{
  if($("screen-result").classList.contains("active")){
    resizeCanvas();
    if(isQuadranglePast()) recalcPanoramaBounds();
  }
});

function stepSilhouette(s, t){
  const W = canvas.width, H = canvas.height;
  switch(s.activity){
    case "wander": {
      if(!s.target || Math.hypot(s.target.x-s.x, s.target.y-s.y) < 4){
        s.target = { x: 20+Math.random()*(W-40), y: H*0.6+Math.random()*H*0.3 };
      }
      const dx = s.target.x - s.x, dy = s.target.y - s.y, d = Math.hypot(dx,dy)||1;
      s.x += (dx/d) * s.speed*1.1;
      s.y += (dy/d) * s.speed*0.4;
      break;
    }
    case "rush": {
      s.x += s.speed*3.2;
      if(s.x > W+15){ s.x = -15; s.y = H*0.6+Math.random()*H*0.3; }
      break;
    }
    case "meet": {
      const midX = W/2, midY = H*0.72;
      if(!s._arrived){
        const dx = midX - (s.partnerIdx!=null ? (s.x<midX?-14:14) : 0) - s.x;
        const dy = midY - s.y;
        const d = Math.hypot(dx,dy);
        if(d < 6) s._arrived = true;
        else { s.x += dx*0.02; s.y += dy*0.02; }
      } else {
        s.x += Math.sin(t/700 + s.phase)*0.15;
      }
      break;
    }
    case "sit": {
      s.y = s.baseY + Math.sin(t/900 + s.phase)*1.2;
      break;
    }
    case "work": {
      s.x += Math.sin(t/180 + s.phase)*0.35;
      break;
    }
    case "watch": {
      s.x += Math.sin(t/2200 + s.phase)*0.06;
      break;
    }
  }
}

function drawSilhouette(s, t, highlighted){
  const flicker = 0.55 + 0.25*Math.sin(t/500 + s.phase);
  const color = getComputedStyle(document.documentElement).getPropertyValue(state.era==="past" ? "--past" : "--present").trim();
  ctx.save();
  ctx.globalAlpha = highlighted ? 0.95 : flicker;
  const strokeColor = highlighted ? color : "rgba(230,228,220,0.8)";
  ctx.strokeStyle = strokeColor;
  ctx.fillStyle = strokeColor;
  ctx.lineWidth = 2.4;
  ctx.lineCap = "round";
  if(highlighted){ ctx.shadowColor = color; ctx.shadowBlur = 14; }

  const isMoving = s.activity==="wander" || s.activity==="rush" || (s.activity==="meet" && !s._arrived);
  const walkHz = s.activity==="rush" ? 9 : 5;
  const phase = isMoving ? (t/1000)*walkHz + s.phase : 0;
  const legSwing = isMoving ? Math.sin(phase)*7 : 0;
  const armSwing = isMoving ? Math.sin(phase+Math.PI)*6 : 0;
  const bob = isMoving ? Math.abs(Math.sin(phase))*2 : 0;

  const footY = s.y;
  const hipY  = footY - 16 - bob;
  const shY   = hipY - 15;
  const headY = shY - 8;
  const x = s.x;

  ctx.beginPath();
  ctx.arc(x, headY, 5.5, 0, Math.PI*2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(x, headY+5);
  ctx.lineTo(x, hipY);
  ctx.stroke();

  if(s.activity === "sit"){
    ctx.beginPath();
    ctx.moveTo(x, hipY); ctx.lineTo(x-9, hipY+3); ctx.lineTo(x-9, footY);
    ctx.moveTo(x, hipY); ctx.lineTo(x+9, hipY+3); ctx.lineTo(x+9, footY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, shY); ctx.lineTo(x-7, hipY+2);
    ctx.moveTo(x, shY); ctx.lineTo(x+7, hipY+2);
    ctx.stroke();
  } else if(s.activity === "work"){
    ctx.beginPath();
    ctx.moveTo(x, footY-16); ctx.lineTo(x-3, footY);
    ctx.moveTo(x, footY-16); ctx.lineTo(x+3, footY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, shY); ctx.lineTo(x-6, shY+9);
    ctx.moveTo(x, shY); ctx.lineTo(x+6, shY+9);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(x, hipY); ctx.lineTo(x-4-legSwing, footY);
    ctx.moveTo(x, hipY); ctx.lineTo(x+4+legSwing, footY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, shY); ctx.lineTo(x-6-armSwing*0.6, shY+11);
    ctx.moveTo(x, shY); ctx.lineTo(x+6+armSwing*0.6, shY+11);
    ctx.stroke();
  }

  ctx.restore();
}

function animate(){
  const t = performance.now();
  if(ctx){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    silhouettes.forEach(s=>{
      stepSilhouette(s, t);
      drawSilhouette(s, t, s.commentId === state.selectedCommentId || (!state.selectedCommentId && s.commentId === eraComments()[0]?.id));
    });
  }
  rafId = requestAnimationFrame(animate);
}

canvas = $("silhouette-canvas");

function handleCanvasTap(e){
  const rect = canvas.getBoundingClientRect();
  const cx = e.clientX - rect.left, cy = e.clientY - rect.top;
  let closest=null, closestD=9999;
  silhouettes.forEach(s=>{
    const d = Math.hypot(s.x-cx, s.y-cy+15);
    if(d < 26 && d < closestD){ closest = s; closestD = d; }
  });
  if(closest) selectComment(closest.commentId, true);
}

canvas.addEventListener("pointerdown", (e)=>{
  canvasDrag.active = true;
  canvasDrag.moved = false;
  canvasDrag.startX = e.clientX;
  canvasDrag.startY = e.clientY;
  canvasDrag.lastX = e.clientX;
  canvasDrag.lastY = e.clientY;
});
canvas.addEventListener("pointermove", (e)=>{
  if(!canvasDrag.active) return;
  const dx = e.clientX - canvasDrag.lastX;
  const dy = e.clientY - canvasDrag.lastY;
  if(Math.hypot(e.clientX - canvasDrag.startX, e.clientY - canvasDrag.startY) > 6) canvasDrag.moved = true;
  if(isQuadranglePast()) setPanoramaOffset(panoramaOffsetX - dx, panoramaOffsetY - dy);
  canvasDrag.lastX = e.clientX;
  canvasDrag.lastY = e.clientY;
});
canvas.addEventListener("pointerup", (e)=>{
  if(canvasDrag.active && !canvasDrag.moved) handleCanvasTap(e);
  canvasDrag.active = false;
});
canvas.addEventListener("pointercancel", ()=>{ canvasDrag.active = false; });

const panoramaSurface = $("past-panorama");
panoramaSurface.addEventListener("pointerdown", (e)=>{
  if(!isQuadranglePast()) return;
  canvasDrag.active = true;
  canvasDrag.moved = false;
  canvasDrag.startX = canvasDrag.lastX = e.clientX;
  canvasDrag.startY = canvasDrag.lastY = e.clientY;
  panoramaSurface.setPointerCapture(e.pointerId);
});
panoramaSurface.addEventListener("pointermove", (e)=>{
  if(!canvasDrag.active || !isQuadranglePast()) return;
  const dx = e.clientX - canvasDrag.lastX;
  const dy = e.clientY - canvasDrag.lastY;
  if(Math.hypot(e.clientX - canvasDrag.startX, e.clientY - canvasDrag.startY) > 6) canvasDrag.moved = true;
  setPanoramaOffset(panoramaOffsetX - dx, panoramaOffsetY - dy);
  canvasDrag.lastX = e.clientX;
  canvasDrag.lastY = e.clientY;
});
panoramaSurface.addEventListener("pointerup", ()=>{ canvasDrag.active = false; });
panoramaSurface.addEventListener("pointercancel", ()=>{ canvasDrag.active = false; });

/* ---------------- ADD COMMENT MODAL ---------------- */
$("btn-add-comment").addEventListener("click", ()=>{
  $("modal-title").textContent = state.era==="past"
    ? "What did you do here?"
    : "What do you do here?";
  $("input-text").value = "";
  $("input-photo").value = "";
  $("input-activity-other").value = "";
  $("input-activity-other").classList.toggle("hidden", $("input-activity").value !== "other");
  pendingPhoto = state.scanPhotoDataURL || null;
  const preview = $("input-photo-preview");
  if(pendingPhoto){
    preview.src = pendingPhoto;
    preview.classList.remove("hidden");
    $("input-photo-label").textContent = "scan photo attached — choose another to replace it";
  }else{
    preview.removeAttribute("src");
    preview.classList.add("hidden");
    $("input-photo-label").textContent = "add a photo (optional)";
  }
  $("modal-backdrop").classList.remove("hidden");
});
$("btn-cancel-comment").addEventListener("click", ()=> $("modal-backdrop").classList.add("hidden"));

$("input-activity").addEventListener("change", ()=>{
  const isOther = $("input-activity").value === "other";
  $("input-activity-other").classList.toggle("hidden", !isOther);
  if(isOther) $("input-activity-other").focus();
});

$("btn-cancel-delete").addEventListener("click", closeDeleteConfirmation);
$("delete-modal-backdrop").addEventListener("click", e=>{
  if(e.target === $("delete-modal-backdrop")) closeDeleteConfirmation();
});
$("btn-confirm-delete").addEventListener("click", async ()=>{
  const commentId = pendingDeleteCommentId;
  if(!commentId || !state.building) return;
  const confirmButton = $("btn-confirm-delete");
  confirmButton.disabled = true;
  try{
    await deleteBackendComment(state.building.id, commentId);
    state.comments = state.comments.filter(comment => comment.id !== commentId);
    if(state.selectedCommentId === commentId) state.selectedCommentId = null;
    closeDeleteConfirmation();
    renderCommentsList();
    renderSpotlight();
    buildSilhouettes();
    showToast("Comment deleted");
  }catch(error){
    confirmButton.disabled = false;
    showToast("Could not delete comment");
  }
});

let pendingPhoto = null;
$("input-photo").addEventListener("change", (e)=>{
  const file = e.target.files[0];
  if(!file){ pendingPhoto=null; return; }
  const reader = new FileReader();
  reader.onload = ()=>{
    pendingPhoto = reader.result;
    const img = $("input-photo-preview");
    img.src = pendingPhoto;
    img.classList.remove("hidden");
    $("input-photo-label").textContent = "separate photo attached";
  };
  reader.readAsDataURL(file);
});

$("btn-submit-comment").addEventListener("click", async ()=>{
  const text = $("input-text").value.trim();
  if(!text || !state.building) return;
  const activity = $("input-activity").value;
  const customActivity = $("input-activity-other").value.trim();
  if(activity === "other" && !customActivity){
    showToast("Please describe what you did here");
    return;
  }
  const profile = getUserProfile();
  if(!profile){
    $("profile-modal-backdrop").classList.remove("hidden");
    return;
  }
  const submitButton = $("btn-submit-comment");
  submitButton.disabled = true;
  let comment;
  try{
    comment = await createBackendComment(state.building.id, {
      text, activity, customActivity, era:state.era, photo:pendingPhoto, ...profile
    });
  }catch(error){
    showToast("Could not save comment");
    submitButton.disabled = false;
    return;
  }
  state.comments.push(comment);
  pendingPhoto = null;
  submitButton.disabled = false;
  $("modal-backdrop").classList.add("hidden");
  state.selectedCommentId = comment.id;
  buildSilhouettes();
  renderCommentsList();
  renderSpotlight();
});

/* ---------------- INIT ---------------- */
let pendingProfilePhoto = getUserProfile()?.profilePhoto || null;

function openProfileEditor(){
  const profile = getUserProfile();
  $("profile-first-name").value = profile?.firstName || "";
  $("profile-last-initial").value = profile?.lastInitial || "";
  $("profile-phone").value = profile?.phone || "";
  pendingProfilePhoto = profile?.profilePhoto || null;
  const preview = $("profile-photo-preview");
  if(pendingProfilePhoto){
    preview.src = pendingProfilePhoto;
    preview.classList.remove("hidden");
  }else{
    preview.removeAttribute("src");
    preview.classList.add("hidden");
  }
  $("profile-modal-backdrop").classList.remove("hidden");
}

function resizeProfilePhoto(file){
  return new Promise((resolve, reject)=>{
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = ()=>{
      const image = new Image();
      image.onerror = reject;
      image.onload = ()=>{
        const size = 256;
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = size;
        const context = canvas.getContext("2d");
        const sourceSize = Math.min(image.naturalWidth, image.naturalHeight);
        const sourceX = (image.naturalWidth - sourceSize) / 2;
        const sourceY = (image.naturalHeight - sourceSize) / 2;
        context.drawImage(image, sourceX, sourceY, sourceSize, sourceSize, 0, 0, size, size);
        resolve(canvas.toDataURL("image/jpeg", .82));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

$("btn-edit-profile").addEventListener("click", openProfileEditor);
$("profile-photo").addEventListener("change", async e=>{
  const file = e.target.files[0];
  if(!file) return;
  try{
    pendingProfilePhoto = await resizeProfilePhoto(file);
    $("profile-photo-preview").src = pendingProfilePhoto;
    $("profile-photo-preview").classList.remove("hidden");
  }catch(error){
    showToast("Could not read profile picture");
  }
});

$("profile-form").addEventListener("submit", e=>{
  e.preventDefault();
  const firstName = $("profile-first-name").value.trim();
  const lastInitial = $("profile-last-initial").value.trim().charAt(0).toUpperCase();
  const phone = $("profile-phone").value.trim();
  const error = $("profile-error");
  if(!/^[A-Za-z' -]{1,40}$/.test(firstName) || !/^[A-Za-z]$/.test(lastInitial)){
    error.textContent = "Enter your real first name and one last initial.";
    error.classList.remove("hidden");
    return;
  }
  if(!/^\+?[0-9 ()-]{8,24}$/.test(phone)){
    error.textContent = "Enter a valid phone number.";
    error.classList.remove("hidden");
    return;
  }
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify({firstName, lastInitial, phone, profilePhoto:pendingProfilePhoto}));
  error.classList.add("hidden");
  $("profile-modal-backdrop").classList.add("hidden");
});

if(getUserProfile()) $("profile-modal-backdrop").classList.add("hidden");
showScreen("screen-capture");
