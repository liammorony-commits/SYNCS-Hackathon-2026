// Redesigned interactions: era toggle, timeline, moments, memory layer, scan simulation
const eraBtns = document.querySelectorAll('.era-btn');
const scanBtn = document.getElementById('scanButton');
const momentsContainer = document.getElementById('momentsContainer');
const timelineContainer = document.getElementById('timelineContainer');
const memoryLayer = document.getElementById('memoryLayer');
const modalRoot = document.getElementById('modalRoot');

const building = {
  name: 'The Quadrangle',
  meta: 'Built 1854 • Ceremonial Hall',
  history: 'The Quadrangle is the ceremonial heart of campus — construction began in 1854 and has hosted countless graduations and events.'
}

const sampleMoments = [
  {id:'m1',name:'Isabella R.',text:'I proposed here under the arch 👰💍',time:'18m',likes:24,era:'present'},
  {id:'m2',name:'James M.',text:'Graduated today! 🎓',time:'42m',likes:31,era:'present'},
  {id:'m3',name:'Wedding 1886',text:'A beautiful ceremony held in the Great Hall',time:'1886',likes:102,era:'past'},
  {id:'m4',name:'Foundation 1854',text:'Construction begins',time:'1854',likes:88,era:'past'}
];

let currentEra = 'past';

function setEra(e){
  currentEra = e;
  eraBtns.forEach(b=>b.classList.toggle('active', b.dataset.era===e));
  renderMoments();
}

eraBtns.forEach(b=>b.addEventListener('click', ()=> setEra(b.dataset.era)));

function renderMoments(){
  momentsContainer.innerHTML='';
  const items = sampleMoments.filter(m=> m.era===currentEra);
  items.forEach(m=>{
    const card = document.createElement('div'); card.className='moment-card';
    card.innerHTML = `<div><strong>${m.name}</strong></div><div style="margin-top:8px">${m.text}</div><div class="moment-footer">${m.time} · ❤️ ${m.likes}</div>`;
    card.addEventListener('click', ()=> openModal(`<h3>${m.name}</h3><p>${m.text}</p><p style="color:var(--muted)">${m.time}</p>`));
    momentsContainer.appendChild(card);
  });
}

function renderTimeline(){
  timelineContainer.innerHTML='';
  const past = sampleMoments.filter(m=> m.era==='past').sort((a,b)=> parseInt(a.time)-parseInt(b.time));
  past.forEach(p=>{
    const el = document.createElement('div'); el.className='timeline-entry';
    el.innerHTML = `<strong>${p.time}</strong><div style="color:var(--muted)">${p.text}</div>`;
    el.addEventListener('click', ()=> openModal(`<h3>${p.time} — ${p.text}</h3><p style="color:var(--muted)">Likes: ${p.likes}</p>`));
    timelineContainer.appendChild(el);
  });
}

function placeMemoryEvents(){
  memoryLayer.innerHTML='';
  // place a couple of floating events with positions
  const events = sampleMoments.slice(0,3);
  events.forEach((ev,i)=>{
    const d = document.createElement('div'); d.className='memory-event';
    d.style.left = (10 + i*18) + '%';
    d.style.top = (20 + i*14) + '%';
    d.style.pointerEvents = 'auto';
    d.innerHTML = `<strong>${ev.time}</strong><div style="font-size:13px">${ev.text}</div>`;
    d.addEventListener('click', ()=> openModal(`<h3>${ev.time}</h3><p>${ev.text}</p><p style="color:var(--muted)">By ${ev.name} · ❤️ ${ev.likes}</p>`));
    memoryLayer.appendChild(d);
  });
}

function openModal(html){
  modalRoot.innerHTML = `<div class="modal"><div class="modal-card">${html}<div style="text-align:right;margin-top:12px"><button id="closeModal">Close</button></div></div></div>`;
  document.getElementById('closeModal').addEventListener('click', ()=> modalRoot.innerHTML='');
}

// Scan simulation
scanBtn.addEventListener('click', ()=>{
  scanBtn.textContent = 'SCANNING...';
  scanBtn.disabled = true;
  setTimeout(()=>{
    scanBtn.textContent = 'LIVE';
    scanBtn.disabled = false;
    placeMemoryEvents();
    setEra('present');
  },1200);
});

// Connect-like demo
document.addEventListener('click', e=>{
  if(e.target.closest('.connect')){
    alert('Connect request sent — demo only.');
  }
});

// Initialise
document.getElementById('building-name').textContent = building.name;
document.getElementById('building-meta').textContent = building.meta;
document.getElementById('building-history').textContent = building.history;
setEra(currentEra);
renderTimeline();

