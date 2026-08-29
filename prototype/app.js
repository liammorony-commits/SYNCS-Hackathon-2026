// Simple prototype interactions: tab switch, swipe, scan simulation
const tabs = document.querySelectorAll('.tab');
const pastPane = document.getElementById('pastPane');
const presentPane = document.getElementById('presentPane');
const scanBtn = document.getElementById('scanButton');
const presentCards = document.getElementById('presentCards');
const peopleList = document.getElementById('peopleList');

tabs.forEach(t=>t.addEventListener('click',()=>{
  tabs.forEach(x=>x.classList.remove('active'));
  t.classList.add('active');
  const v = t.dataset.view;
  if(v==='past'){
    pastPane.classList.add('active');
    presentPane.classList.remove('active');
  } else {
    presentPane.classList.add('active');
    pastPane.classList.remove('active');
  }
}));

// Basic swipe support
let startX=null;
const viewport = document.querySelector('.viewport');
viewport.addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX});
viewport.addEventListener('touchend',e=>{
  const endX = e.changedTouches[0].clientX;
  if(startX-endX>50){ // swipe left
    document.querySelector('[data-view="present"]').click();
  } else if(endX-startX>50){ // swipe right
    document.querySelector('[data-view="past"]').click();
  }
});

// Sample present people/cards
const samplePeople = [
  {name:'Isabella R.', msg:'I proposed to my partner right here under the tree', time:'18m', likes:24, phone:'+61-4** *** ***'},
  {name:'James M.', msg:'Graduated today! 4 years of hard work paid off', time:'42m', likes:31, phone:'+61-4** *** ***'},
  {name:'Sophia L.', msg:'This is where I met some of my lifelong best friends', time:'1h', likes:19, phone:'+61-4** *** ***'}
];

function renderPresent(){
  presentCards.innerHTML='';
  peopleList.innerHTML='';
  samplePeople.forEach(p=>{
    const card = document.createElement('div');card.className='person-card';
    card.innerHTML = `<strong>${p.name}</strong><p>${p.msg}</p><div style="display:flex;justify-content:space-between;align-items:center"><div>❤ ${p.likes}</div><button class=connect>Connect</button></div>`;
    presentCards.appendChild(card);

    const li = document.createElement('li');
    li.innerHTML = `<strong>${p.name}</strong> · ${p.time} · <button class='connect small'>Connect</button>`;
    peopleList.appendChild(li);
  });
}
renderPresent();

// Scan simulation reveals holograms + comments
scanBtn.addEventListener('click',()=>{
  scanBtn.classList.add('scanning');
  scanBtn.textContent='SCANNING...';
  setTimeout(()=>{
    // show present pane and highlight holograms
    document.querySelector('[data-view="present"]').click();
    scanBtn.textContent='LIVE';
    scanBtn.classList.remove('scanning');
    // add a temporary glowing hologram preview
    const holo = document.createElement('div'); holo.className='holo-card';
    holo.innerHTML=`<h3>Realtime Hologram</h3><p>Historic overlay active</p><button class='view-event'>View</button>`;
    pastPane.querySelector('.holograms').prepend(holo);
  },1200);
});

// Connect buttons (demo only)
document.addEventListener('click',e=>{
  if(e.target.classList.contains('connect')){
    alert('Connect request sent — demo only.\nProfiles include masked phone numbers.');
  }
});
