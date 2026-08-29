/* ============================================================
   UNDERTOW — prototype (Method 2: Pure Geolocation)
   ============================================================ */

const MOCK_BUILDINGS = [
  {
    id: "kestrel",
    name: "The Kestrel Building",
    meta: "1974 · civic / brutalist",
    lat: -33.8688,
    lng: 151.2093,
    history: "Poured in 1974 as the city's records office, the raw concrete facade was controversial from day one — locals called it \"the bunker.\" It sat half-empty through the '90s before reopening as mixed-use studios in 2011.",
    comments: [
      {text:"I've cut through this courtyard every morning for six years. Never once looked up until today.", activity:"wander", likes:41, era:"present", author:"marlo_k"},
      {text:"Worked reception on the third floor in '88. The lifts never worked. We took the stairs and complained the whole way.", activity:"work", likes:63, era:"past", author:"D. Osei"},
      {text:"Meet my sister here every Friday, same bench, since we were kids.", activity:"meet", likes:29, era:"present", author:"hannahv"},
      {text:"Used to sit on that low wall and eat lunch alone. Nobody ever bothered you there.", activity:"sit", likes:18, era:"past", author:"anon"},
      {text:"Always rushing past this place to catch the 8:12. Barely register it exists.", activity:"rush", likes:12, era:"present", author:"tomasz"},
      {text:"I photographed this building for my thesis on brutalism. Still think it's beautiful, fight me.", activity:"watch", likes:35, era:"present", author:"june.arc"},
      {text:"Protested budget cuts on these steps in 1991. Cold morning, big crowd.", activity:"watch", likes:22, era:"past", author:"R. Fenwick"}
    ]
  },
  {
    id: "aldergate",
    name: "12 Aldergate Row",
    meta: "1891 · victorian terrace, corner unit",
    lat: -33.8691,
    lng: 151.2096,
    history: "Built as a draper's shop with living quarters above. The bay window survived a 1953 fire that gutted the interior. Since 2016 it's housed a small bakery on the ground floor.",
    comments: [
      {text:"The smell of bread from that corner gets me every single time. Best part of the commute.", activity:"wander", likes:54, era:"present", author:"priya.s"},
      {text:"My grandmother bought fabric here for forty years. She'd have loved the bakery.", activity:"watch", likes:47, era:"past", author:"e.hollis"},
      {text:"Sit outside with a coffee whenever the weather allows. Best light in the afternoon.", activity:"sit", likes:33, era:"present", author:"noah_b"},
      {text:"We used to meet on this corner before school, every single day, rain or not.", activity:"meet", likes:26, era:"past", author:"L. Marsh"},
      {text:"Delivered post to this row for eleven years. Knew every knocker by heart.", activity:"work", likes:19, era:"past", author:"anon"},
      {text:"Always in a rush past here on the school run, but I notice the window boxes now.", activity:"rush", likes:15, era:"present", author:"kf22"}
    ]
  },
  {
    id: "millbrook",
    name: "Millbrook Warehouse No. 3",
    meta: "1912 · converted industrial loft",
    lat: -33.8705,
    lng: 151.2110,
    history: "One of three cotton warehouses on the old millrace, decommissioned in 1968. Stood derelict for two decades before a 1994 conversion split it into artist studios and, later, apartments.",
    comments: [
      {text:"Moved into a studio here in '96. Rent was nothing and the light was everything.", activity:"work", likes:58, era:"past", author:"g.abara"},
      {text:"Watch the sunset hit the top windows most evenings from the towpath.", activity:"watch", likes:44, era:"present", author:"ivy.lane"},
      {text:"First date here, ten years ago. We still walk past it every anniversary.", activity:"meet", likes:71, era:"present", author:"sam & ren"},
      {text:"Loading dock used to run all night. You could hear the mill from three streets over.", activity:"wander", likes:20, era:"past", author:"anon"},
      {text:"Sit by the water on the old dock steps when I need to think.", activity:"sit", likes:31, era:"present", author:"charlie_p"},
      {text:"Always rushing to the studio before the light changes. Never enough time.", activity:"rush", likes:14, era:"present", author:"m.dupree"}
    ]
  }
];

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

/* ---------------- RECOGNITION (GEOLOCATION) ---------------- */
async function runRecognition() {
  $("loading-text").textContent = "checking your location…";

  try {
    const position = await getCurrentPosition();
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;

    let closestBuilding = null;
    let shortestDistance = Infinity;

    MOCK_BUILDINGS.forEach(building => {
      if (building.lat == null || building.lng == null) return;
      const dist = getDistanceInMeters(userLat, userLng, building.lat, building.lng);
      if (dist < shortestDistance) {
        shortestDistance = dist;
        closestBuilding = building;
      }
    });

    const MAX_DISTANCE_METERS = 3000;
    if (!closestBuilding || shortestDistance > MAX_DISTANCE_METERS) {
      console.warn(`No recognized building within range. Defaulting to first building.`);
      closestBuilding = MOCK_BUILDINGS[0];
    }

    state.building = closestBuilding;
    state.comments = closestBuilding.comments.map((c, idx) => ({ id: "c" + idx + "_" + Date.now(), ...c, photo: null }));
    state.selectedCommentId = null;
    state.era = "present";

    renderResult();
    showScreen("screen-result");

  } catch (err) {
    console.warn("Geolocation failed or was denied:", err.message);
    $("loading-text").textContent = "GPS disabled — picking demo location…";
    setTimeout(() => {
      const pick = MOCK_BUILDINGS[Math.floor(Math.random() * MOCK_BUILDINGS.length)];
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