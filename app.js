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
    id: "abercrombie",
    name: "Abercrombie Building (H70)",
    meta: "2015 · modern / business",
    lat: -33.8903,
    lng: 151.1923,
    history: "Home to the USYD Business School, featuring a distinctive wooden interior, a 500-seat lecture theatre, and countless collaborative learning spaces.",
    comments: [
      {text:"Trying to figure out the price equation for craft beer for my microeconomics tutorial.", activity:"work", likes:92, era:"present", author:"econ_kid"},
      {text:"Meeting my casing prep group in one of the glass pods.", activity:"meet", likes:41, era:"present", author:"consultant2b"},
      {text:"Sitting in the atrium waiting for my next class to start.", activity:"sit", likes:30, era:"past", author:"anon"},
      {text:"Rushing from Redfern station just to make it to my 9AM.", activity:"rush", likes:105, era:"present", author:"comm_student"}
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
  }
];