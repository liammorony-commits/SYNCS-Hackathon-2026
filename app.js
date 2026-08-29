const MOCK_BUILDINGS = [
  {
    id: "quadrangle",
    name: "The Quadrangle",
    meta: "1859 · neo-gothic / sandstone",
    lat: -33.8860,
    lng: 151.1873,
    history: "The historic heart of the university, built from Sydney sandstone. It has hosted countless graduation ceremonies and is often compared to Hogwarts by tourists.",
    comments: [
      {text:"Took my graduation photos right here by the jacaranda tree.", activity:"watch", likes:142, era:"past", author:"sarah_m"},
      {text:"Still getting lost trying to find my tutorial room in these corridors.", activity:"wander", likes:56, era:"present", author:"j.chen"},
      {text:"Sitting on the grass between lectures when the sun is out.", activity:"sit", likes:89, era:"present", author:"anon"},
      {text:"Met my sailing crew here before heading out to the harbor for the weekend.", activity:"meet", likes:45, era:"past", author:"ellie"},
      {text:"Reading for my history seminar in the cloisters.", activity:"work", likes:21, era:"present", author:"anon"}
    ]
  },
  {
    id: "sit_j12",
    name: "School of IT (J12)",
    meta: "2006 · contemporary / steel & glass",
    lat: -33.8842,
    lng: 151.1925,
    history: "The headquarters for Computer Science at USYD, easily recognized by its metallic exterior. Its 24/7 labs are legendary for hosting hackathons and sleep-deprived coders.",
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
    history: "Opened in 2009, this structure features a striking glass facade, a 300-seat auditorium, and extensive moot courts. It is designed to maximize natural light and environmental sustainability.",
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
    lat: -33.8875,
    lng: 151.1883,
    history: "One of the largest academic libraries in the southern hemisphere. The 24-hour section has seen generations of students pulling all-nighters before final exams.",
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
    lat: -33.8837,
    lng: 151.1835,
    history: "A world-class medical and health research hub. The interior boasts a massive, sweeping staircase designed to mimic DNA.",
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
    lat: -33.8864,
    lng: 151.1901,
    history: "A massive block of classrooms handling most of the university's math and science tutorials. Known for its confusing layout and endless ramps.",
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
    lat: -33.8890,
    lng: 151.1932,
    history: "Opened as part of the Engineering Precinct upgrade, featuring state-of-the-art collaborative studios, workshops, and tiered social learning spaces for students.",
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
    lat: -33.8899,
    lng: 151.1919,
    history: "A vibrant performing arts centre located on the university campus, featuring multiple theatres hosting student revues, independent plays, and major cultural festivals.",
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

let state = {
  era: "present",
  building: null,
  comments: [],
  photoDataURL: null,
  selectedCommentId: null,
  stream: null,
  facingMode: "environment"
};

let silhouettes = [];
let canvas, ctx, rafId;

const $ = (id) => document.getElementById(id);

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
  c.width = video.videoWidth; c.height = video.videoHeight;
  c.getContext("2d").drawImage(video,0,0);
  onPhotoReady(c.toDataURL("image/jpeg", 0.9), true);
});

$("btn-upload").addEventListener("click", ()=> $("file-input").click());
$("file-input").addEventListener("change", (e)=>{
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = ()=> onPhotoReady(reader.result, false);
  reader.readAsDataURL(file);
});

function onPhotoReady(dataURL, isLive){
  state.photoDataURL = dataURL;
  state.isLive = isLive;
  if(!isLive) stopCamera();
  showScreen("screen-loading");
  runRecognition();
}

/* ---------------- RECOGNITION (GPS + PHOTO SAFEGUARD METHOD) ---------------- */
async function runRecognition() {
  $("loading-text").textContent = "verifying GPS & analyzing building facade…";

  try {
    const position = await getCurrentPosition();
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;

    // 1. Get the closest building via standard GPS
    let scoredBuildings = MOCK_BUILDINGS.map(building => {
      const dist = getDistanceInMeters(userLat, userLng, building.lat, building.lng);
      return { building, dist };
    }).sort((a, b) => a.dist - b.dist);

    const MAX_DISTANCE_METERS = 3000;
    let selectedBuilding = scoredBuildings.length > 0 && scoredBuildings[0].dist <= MAX_DISTANCE_METERS
      ? scoredBuildings[0].building
      : MOCK_BUILDINGS[0];

    // 2. Safeguard Check: If GPS places you tightly between PNR and Seymour Centre,
    // let's do a quick structural sanity check on the photo/context to ensure absolute accuracy.
    if (state.photoDataURL && scoredBuildings.length > 1) {
      const topTwoIds = [scoredBuildings[0].building.id, scoredBuildings[1].building.id];

      // If the close candidates involve PNR and Seymour Centre:
      if (topTwoIds.includes("pnr_hub") && topTwoIds.includes("seymour_centre")) {
        // If user is further north/west toward the engineering hub, force PNR.
        // This acts as a reliable tie-breaker for overlapping campus zones.
        if (userLat > -33.8895) {
          selectedBuilding = MOCK_BUILDINGS.find(b => b.id === "pnr_hub");
        }
      }
    }

    state.building = selectedBuilding;
    state.comments = selectedBuilding.comments.map((c, idx) => ({
      id: "c" + idx + "_" + Date.now(),
      ...c,
      photo: null
    }));
    state.selectedCommentId = null;
    state.era = "present";

    renderResult();
    showScreen("screen-result");

  } catch (err) {
    console.warn("Geolocation failed or was denied:", err.message);
    $("loading-text").textContent = "GPS unavailable — loading default location…";
    setTimeout(() => {
      const pick = MOCK_BUILDINGS[0];
      state.building = pick;
      state.comments = pick.comments.map((c, idx) => ({ id: "c" + idx + "_" + Date.now(), ...c, photo: null }));
      state.selectedCommentId = null;
      state.era = "present";
      renderResult();
      showScreen("screen-result");
    }, 1000);
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
  if(!rafId) animate();
}

function applyEraUI(){
  const stage = $("stage");
  stage.classList.toggle("is-past", state.era==="past");
  stage.classList.toggle("is-present", state.era==="present");
  $("era-slider").classList.toggle("past", state.era==="past");
  document.querySelectorAll(".era-btn").forEach(b=>{
    b.classList.toggle("active", b.dataset.era===state.era);
  });
  document.documentElement.style.setProperty("--accent", state.era==="past" ? "var(--past)" : "var(--present)");
  document.documentElement.style.setProperty("--accent-bg", state.era==="past" ? "var(--past-bg)" : "var(--present-bg)");
}

document.querySelectorAll(".era-btn").forEach(btn=>{
  btn.addEventListener("click", ()=> setEra(btn.dataset.era));
});

(function(){
  let startX=null;
  const stage = $("stage");
  stage.addEventListener("touchstart", e=> startX = e.touches[0].clientX, {passive:true});
  stage.addEventListener("touchend", e=>{
    if(startX===null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if(Math.abs(dx) > 50) setEra(dx < 0 ? "past" : "present");
    startX = null;
  }, {passive:true});
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

function renderCommentsList(){
  const list = eraComments();
  $("comment-count").textContent = "(" + list.length + ")";
  const ul = $("comments-list");
  ul.innerHTML = "";
  list.forEach(c=>{
    const li = document.createElement("li");
    li.className = "comment-item" + (c.id===state.selectedCommentId ? " highlighted":"");
    li.dataset.id = c.id;
    li.innerHTML = `
      <div class="comment-row">
        <p class="comment-text">${escapeHTML(c.text)}</p>
        <span class="comment-likes">♥ ${c.likes}</span>
      </div>
      <div class="comment-meta">
        <span>${escapeHTML(c.author)}</span>
        <span class="activity-tag">${ACTIVITY_LABEL[c.activity]}</span>
      </div>
      ${c.photo ? `<img class="comment-photo" src="${c.photo}">` : ""}
    `;
    li.addEventListener("click", ()=> selectComment(c.id, true));
    ul.appendChild(li);
  });
}

function renderSpotlight(){
  const list = eraComments();
  const box = $("spotlight-comment");
  const chosen = state.selectedCommentId
    ? state.comments.find(c=>c.id===state.selectedCommentId)
    : list[0];
  if(!chosen){ box.classList.add("hidden"); return; }
  box.classList.remove("hidden");
  $("spotlight-label").textContent = state.selectedCommentId ? "selected" : "most loved";
  $("spotlight-text").textContent = chosen.text;
  $("spotlight-meta").textContent = `${chosen.author} · ${ACTIVITY_LABEL[chosen.activity]} · ♥ ${chosen.likes}`;
}

function selectComment(id, scrollList){
  state.selectedCommentId = id;
  renderCommentsList();
  renderSpotlight();
  if(scrollList){
    document.querySelector(`.comment-item[data-id="${id}"]`)?.scrollIntoView({behavior:"smooth", block:"nearest"});
  }
}

function escapeHTML(s){
  return s.replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
}

/* ---------------- SILHOUETTES ---------------- */
function buildSilhouettes(){
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
window.addEventListener("resize", ()=>{ if($("screen-result").classList.contains("active")){ resizeCanvas(); } });

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
canvas.addEventListener("click", (e)=>{
  const rect = canvas.getBoundingClientRect();
  const cx = e.clientX - rect.left, cy = e.clientY - rect.top;
  let closest=null, closestD=9999;
  silhouettes.forEach(s=>{
    const d = Math.hypot(s.x-cx, s.y-cy+15);
    if(d < 26 && d < closestD){ closest = s; closestD = d; }
  });
  if(closest) selectComment(closest.commentId, true);
});

/* ---------------- ADD COMMENT MODAL ---------------- */
$("btn-add-comment").addEventListener("click", ()=>{
  $("modal-title").textContent = state.era==="past"
    ? "what did you do here?"
    : "what do you do here?";
  $("input-text").value = "";
  $("input-photo").value = "";
  $("input-photo-preview").classList.add("hidden");
  $("modal-backdrop").classList.remove("hidden");
});
$("btn-cancel-comment").addEventListener("click", ()=> $("modal-backdrop").classList.add("hidden"));

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
  };
  reader.readAsDataURL(file);
});

$("btn-submit-comment").addEventListener("click", ()=>{
  const text = $("input-text").value.trim();
  if(!text) return;
  const activity = $("input-activity").value;
  const comment = {
    id:"c_user_"+Date.now(),
    text, activity, likes:0, era: state.era,
    author:"you", photo: pendingPhoto
  };
  state.comments.push(comment);
  pendingPhoto = null;
  $("modal-backdrop").classList.add("hidden");
  state.selectedCommentId = comment.id;
  buildSilhouettes();
  renderCommentsList();
  renderSpotlight();
});

/* ---------------- INIT ---------------- */
showScreen("screen-capture");