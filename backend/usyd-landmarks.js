const SUMMARY_VERSION = 2;
const VERIFIED_AT = '2026-08-29';

const landmarkRecords = [
  {
    id: 'quadrangle',
    name: 'University of Sydney Quadrangle',
    kind: 'heritage-precinct',
    aliases: [
      'quadrangle',
      'the quadrangle',
      'university of sydney quadrangle'
    ],
    summary:
      'The University of Sydney Quadrangle began in 1855 with Edmund Blacket’s East Range and Great Hall; later additions extended the sandstone ensemble into the twentieth century, with the West Tower completed in 1966. Built as Gothic and Tudor Revival ranges around a court, it remains the University’s symbolic heart and forms part of an exceptionally significant group of Gothic Revival buildings.',
    sources: [
      'https://www.sydney.edu.au/engage/visit/places-of-interest.html',
      'https://apps.environment.nsw.gov.au/dpcheritageapp/ViewHeritageItemDetails.aspx?ID=2431004'
    ]
  },
  {
    id: 'great-hall',
    name: 'Great Hall',
    kind: 'heritage-building',
    aliases: ['great hall', 'the great hall', 'great hall usyd'],
    summary:
      'Designed by Edmund Blacket and built with the East Range from 1855, the Great Hall is a sandstone Gothic Revival hall whose hammerbeam roof was modelled on Westminster Hall. Opened in July 1859, it remains a working ceremonial venue for graduations, public lectures, concerts, examinations and other University events.',
    sources: [
      'https://www.sydney.edu.au/engage/visit/places-of-interest.html',
      'https://apps.environment.nsw.gov.au/dpcheritageapp/ViewHeritageItemDetails.aspx?ID=4726003'
    ]
  },
  {
    id: 'new-law-building',
    name: 'New Law Building',
    kind: 'building',
    aliases: [
      'new law building',
      'new law building f10',
      'new law building (f10)',
      'new law building usyd',
      'f10',
      'law building'
    ],
    summary:
      'Sydney Law School relocated to the Francis-Jones Morehen Thorp-designed New Law Building on Eastern Avenue in 2009. The award-winning purpose-built complex brings together a moot court, law library, teaching spaces and a public forecourt for legal education and research.',
    sources: [
      'https://www.sydney.edu.au/law/about/history.html',
      'https://www.sydney.edu.au/content/dam/corporate/documents/sydney-law-school/about/past-juristdictions/juristdiction-2009-issue-2.pdf'
    ]
  },
  {
    id: 'fisher-library',
    name: 'Fisher Library',
    kind: 'library-building',
    aliases: [
      'fisher library',
      'fisher library f03',
      'fisher library (f03)',
      'f03',
      'fisher'
    ],
    summary:
      'The current Fisher Library was designed by Ken Woolley and Tom O’Mahoney as a mid-century modern replacement for the original 1909 library in what is now MacLaurin Hall, with its undergraduate wing opening in 1963. It is the University’s only building to have received both a Sulman Award and a RIBA Bronze Medal and remains a major centre for study, collections and student life.',
    sources: [
      'https://www.library.sydney.edu.au/stories/history-of-the-library',
      'https://www.library.sydney.edu.au/about/news/celebrating-fisher-60'
    ]
  },
  {
    id: 'carslaw-building',
    name: 'Carslaw Building',
    kind: 'building',
    aliases: [
      'carslaw',
      'carslaw building',
      'carslaw building f07',
      'carslaw building (f07)',
      'f07'
    ],
    summary:
      'Carslaw Building was begun in 1960 and completed in 1965 at the southern end of Eastern Avenue as a building for first-year science and mathematics. It remains an academic building with teaching spaces and University units including the School of History and Philosophy of Science.',
    sources: [
      'https://www.sydney.edu.au/content/dam/corporate/documents/about-us/campuses/heritage-and-conservation-documents/Grounds%20CMP%20Final%20%28revised%202017%29.pdf',
      'https://www.sydney.edu.au/handbooks/archive/2025/science/subject-areas/subject-areas-fm/history-philosophy-science.html'
    ]
  },
  {
    id: 'abercrombie-building',
    name: 'Belinda Hutchinson Building',
    kind: 'building',
    aliases: [
      'belinda hutchinson building',
      'belinda hutchinson building h70',
      'abercrombie',
      'abercrombie building',
      'abercrombie building h70',
      'abercrombie building (h70)',
      'h70'
    ],
    summary:
      'Opened in July 2016 as the purpose-designed home of the University of Sydney Business School, H70 provides technology-rich teaching, research and collaboration spaces. The University renamed the former Abercrombie Building the Belinda Hutchinson Building in late 2024, so Abercrombie is retained here as a search alias.',
    sources: [
      'https://www.sydney.edu.au/news-opinion/news/2016/07/07/state-of-the-art-facility-heralds-new-era-for-business-education.html',
      'https://www.sydney.edu.au/business/about/location-and-facilities.html'
    ]
  },
  {
    id: 'charles-perkins-centre',
    name: 'Charles Perkins Centre',
    kind: 'research-building',
    aliases: [
      'charles perkins centre',
      'charles perkins centre d17',
      'charles perkins centre (d17)',
      'cpc',
      'd17'
    ],
    summary:
      'Established in 2012, the Charles Perkins Centre’s D17 research and education hub opened in June 2014 beside Royal Prince Alfred Hospital with laboratories, teaching spaces, core facilities, a pathology museum and a clinic. Named for alumnus and Aboriginal rights activist Charles Perkins, the Centre brings multiple disciplines together to address obesity, diabetes, cardiovascular disease and related conditions.',
    sources: [
      'https://www.sydney.edu.au/charles-perkins-centre/about.html',
      'https://www.sydney.edu.au/content/dam/corporate/documents/charles-perkins-centre/A-systems-approach-to-public-health.pdf'
    ]
  },
  {
    id: 'sydney-uni-commons',
    name: 'University of Sydney Commons (unresolved label)',
    kind: 'unresolved-place',
    aliases: ['university of sydney commons', 'university commons', 'commons'],
    summary:
      'No exact official place named University of Sydney Commons could be verified in current University records. Likely matches include Camden Commons, a University Library study facility on the Camden campus, and Bosch Commons at Camperdown, so the app should ask the user to choose the intended place.',
    sources: [
      'https://www.library.sydney.edu.au/visit/camden-commons',
      'https://www.sydney.edu.au/content/dam/corporate/documents/about-us/campuses/4.%20Construction%20and%20Pedestrian%20Management%20Plan.pdf'
    ]
  },
  {
    id: 'sydney-union',
    name: 'University of Sydney Union',
    kind: 'student-organisation',
    aliases: [
      'university of sydney union',
      'sydney university union',
      'usu',
      'union',
      'student union'
    ],
    summary:
      'The University of Sydney Union is a not-for-profit student organisation that provides programs and services and oversees more than 200 student clubs and societies. It traces its history to the Sydney University Union and Sydney University Women’s Union, founded in 1874 and 1914 respectively and merged in 1972.',
    sources: [
      'https://www.sydney.edu.au/students/student-representation.html',
      'https://usu.edu.au/usu-150-years/'
    ]
  },
  {
    id: 'madsen-building',
    name: 'Madsen Building',
    kind: 'heritage-building',
    aliases: ['madsen building', 'madsen building f09', 'madsen', 'f09'],
    summary:
      'Built for the Council for Scientific and Industrial Research between 1939 and 1944, Madsen Building housed Australia’s first National Standards Laboratory, whose work in metrology, physics and electrotechnology supported the Second World War effort. CSIRO handed the building to the University in the late 1970s, and it now accommodates research facilities including Sydney Microscopy and Microanalysis administration.',
    sources: [
      'https://www.sydney.edu.au/study/student-life/student-news/2024/04/29/5-things-you-probably-didnt-know-about-the-university.html',
      'https://www.sydney.edu.au/research/facilities/sydney-microscopy-and-microanalysis/our-facilities.html'
    ]
  },
  {
    id: 'butlin-building',
    name: 'Butlin Avenue (not a building)',
    kind: 'street',
    aliases: ['butlin building', 'butlin avenue', 'butlin'],
    summary:
      'Butlin Avenue is a Darlington-campus street named for economist Syd Butlin, who was a University of Sydney professor from 1943 to 1971. It provides access to buildings including Merewether and Peter Nicol Russell, but no official University building named Butlin Building could be verified.',
    sources: [
      'https://www.sydney.edu.au/content/dam/corporate/documents/faculty-of-arts-and-social-sciences/schools/economics/school-of-economics-review-issue-3.pdf',
      'https://www.library.sydney.edu.au/visit/pnr-learning-hub'
    ]
  },
  {
    id: 'science-road',
    name: 'Science Road',
    kind: 'heritage-precinct',
    aliases: ['science road', 'science walkway'],
    summary:
      'Science Road is a heritage precinct whose late-nineteenth-century buildings were created as an urgent response to the University’s need for science facilities and were repeatedly adapted for teaching. Before Eastern Avenue became the main campus spine, Science Road was a busy hub that included the Union Building, now known as the Holme Building.',
    sources: [
      'https://www.sydney.edu.au/content/dam/corporate/documents/about-us/campuses/heritage-and-conservation-documents/Uni%20of%20Sydney_HAMS_Jan%202018.pdf',
      'https://www.sydney.edu.au/study/student-life/student-news/2017/03/23/an-a-z-of-campus-trivia.html'
    ]
  },
  {
    id: 'sydney-university-main-building',
    name: 'Main Building (Main Quadrangle)',
    kind: 'building-alias',
    aliases: [
      'main building',
      'main quadrangle building',
      'sydney university main building',
      'university main building',
      'a14'
    ],
    summary:
      'The Main Building formed the first phase of today’s Main Quadrangle, with Edmund Blacket’s East Range and Great Hall built in the 1850s and early 1860s in the Gothic Revival style. It is not a separate modern landmark from the Quadrangle, so this record preserves Main Building as a compatible historical name.',
    sources: [
      'https://apps.environment.nsw.gov.au/dpcheritageapp/ViewHeritageItemDetails.aspx?ID=4726003',
      'https://www.sydney.edu.au/news-opinion/news/2018/08/27/university-of-sydney-and-surrounds-to-be-heritage-listed.html'
    ]
  },
  {
    id: 'sydney-university-gallery',
    name: 'J. R. McMillan Building',
    kind: 'former-building',
    aliases: ['j r mcmillan building', 'jr mcmillan building', 'mcmillan building', 'mcmillan', 'a05'],
    summary:
      'The JR McMillan Building was begun in 1962 as an agricultural-research extension to the University’s Agriculture premises. The University’s Grounds Conservation Management Plan records that it was demolished in 2010, so it is a historical rather than a current campus landmark.',
    sources: [
      'https://www.sydney.edu.au/content/dam/corporate/documents/about-us/campuses/grounds-conservation-plan-appendices.pdf',
      'https://www.sydney.edu.au/content/dam/corporate/documents/about-us/campuses/heritage-and-conservation-documents/Grounds%20CMP%20Final%20%28revised%202017%29.pdf'
    ]
  },
  {
    id: 'sydney-university-hall',
    name: 'University Hall and Cottages (not a USYD building)',
    kind: 'nearby-heritage-building',
    aliases: ['university hall', 'the university hall', 'university hall and cottages'],
    summary:
      'University Hall and Cottages at 281–285 Broadway is a heritage-listed former hotel complex, originally known as the University Hotel and now used as residential apartments. It is near the campus but is not a University of Sydney building, so the app should not use it as a USYD AR anchor.',
    sources: [
      'https://apps.environment.nsw.gov.au/dpcheritageapp/ViewHeritageItemDetails.aspx?ID=5045292',
      'https://archives.cityofsydney.nsw.gov.au/nodes/view/1982611'
    ]
  },
  {
    id: 'sydney-university-library',
    name: 'University of Sydney Library',
    kind: 'library-system',
    aliases: ['university of sydney library', 'university library', 'library'],
    summary:
      'The University of Sydney Library is a network of libraries, technology spaces and learning hubs rather than a single building. For a physical Camperdown AR landmark, the app should use Fisher Library at F03 while retaining University Library for searches about the wider service.',
    sources: [
      'https://www.library.sydney.edu.au/visit',
      'https://www.library.sydney.edu.au/stories/history-of-the-library'
    ]
  },
  {
    id: 'sydney-university-physics-building',
    name: 'Physics Building',
    kind: 'heritage-building',
    aliases: ['physics building', 'physics building a28', 'a28', 'science building'],
    summary:
      'Constructed from 1923 to 1926 by University Architect Leslie Wilkinson with Keith Harris, the Physics Building was the first major campus extension beyond the Main Quadrangle and Science Road. The Mediterranean-style A28 building remains in teaching and research use and hosts the public Art of Physics display.',
    sources: [
      'https://www.sydney.edu.au/content/dam/corporate/documents/about-us/campuses/heritage-and-conservation-documents/Uni%20of%20Sydney_HAMS_Jan%202018.pdf',
      'https://www.sydney.edu.au/science/schools/school-of-physics/research/physics-art-project.html'
    ]
  },
  {
    id: 'sydney-university-chemistry-building',
    name: 'Chemistry Building',
    kind: 'building',
    aliases: ['chemistry building', 'chemistry building f11', 'f11', 'chemistry'],
    summary:
      'The current Chemistry Building was completed in 1958 south of the Old Medical School, succeeding the University’s first purpose-built chemistry facility on Science Road. Identified as F11, it continues to support chemistry teaching and research as well as specialist analytical and materials facilities.',
    sources: [
      'https://www.sydney.edu.au/content/dam/corporate/documents/about-us/campuses/grounds-conservation-plan-appendices.pdf',
      'https://www.sydney.edu.au/science/about/our-history.html'
    ]
  },
  {
    id: 'sydney-university-medicine-building',
    name: 'Anderson Stuart Building',
    kind: 'heritage-building',
    aliases: [
      'anderson stuart building',
      'anderson stuart building f13',
      'f13',
      'medicine building',
      'medical school building',
      'old medical school'
    ],
    summary:
      'The Anderson Stuart Building opened in 1889 to house the University of Sydney School of Medicine, the first medical school in Australia. Designed by Colonial Architect James Barnet and expanded over subsequent decades, the sandstone Gothic Revival building remains closely associated with medical teaching and collections.',
    sources: [
      'https://www.sydney.edu.au/medicine-health/about/our-history.html',
      'https://www.sydney.edu.au/about-us/campuses/transforming-our-campus/heritage-and-conservation.html'
    ]
  },
  {
    id: 'sydney-university-engineering-building',
    name: 'Engineering and Technology Precinct',
    kind: 'teaching-and-research-building',
    aliases: [
      'engineering and technology precinct',
      'engineering technology precinct',
      'engineering precinct',
      'engineering building',
      'school of engineering',
      'j03'
    ],
    summary:
      'The Engineering and Technology Precinct at J03 combines nine levels of student spaces and research laboratories with the retained former Electrical Engineering Building through a large glass atrium. Designed by Cox Architecture around the University’s Wingara Mura principles, the renewed precinct achieved a four-star Green Star rating.',
    sources: [
      'https://www.sydney.edu.au/engineering/about/engineering-and-technology-precinct.html',
      'https://www.sydney.edu.au/content/dam/corporate/documents/about-us/campuses/engineering-and-technology-precinct/19069_sydney-uni-etp-audit-4-report_0.2.pdf'
    ]
  },
  {
    id: 'sydney-university-studio-building',
    name: 'The Studio (unresolved label)',
    kind: 'unresolved-place',
    aliases: ['the studio', 'studio'],
    summary:
      'The Studio cannot be matched to a uniquely named University of Sydney building because official campus sources describe several unrelated studio facilities. The app should request a building code or street address before publishing a historical summary or placing an AR anchor for this label.',
    sources: [
      'https://www.sydney.edu.au/arts/schools/sydney-college-of-the-arts/studio-facilities-workshops-labs.html',
      'https://maps.sydney.edu.au/'
    ]
  },
  {
    id: 'school-information-technologies',
    name: 'Computer Science Building',
    kind: 'teaching-and-research-building',
    aliases: [
      'computer science building',
      'computer science building j12',
      'school of information technologies',
      'school of information technologies j12',
      'school of it',
      'school of it j12',
      'school of it (j12)',
      'sit',
      'j12'
    ],
    summary:
      'Completed in 2007 through the Campus 2010 program, J12 was built as the School of Information Technologies Building. The University now identifies it as the Computer Science Building, which houses computer science teaching and research as well as the Faculty of Engineering Dean’s office.',
    sources: [
      'https://www.sydney.edu.au/content/dam/corporate/documents/about-us/campuses/heritage-and-conservation-documents/Grounds%20CMP%20Final%20%28revised%202017%29.pdf',
      'https://www.sydney.edu.au/engineering/about/contact-us.html'
    ]
  },
  {
    id: 'pnr-learning-hub',
    name: 'PNR Learning Hub',
    kind: 'learning-space',
    aliases: [
      'pnr learning hub',
      'peter nicol russell learning hub',
      'peter nicol russell building',
      'pnr building',
      'pnr',
      'j02'
    ],
    summary:
      'PNR Learning Hub occupies Level 2 of the Peter Nicol Russell Building at J02 on the Darlington campus. Operated by the University Library, it provides computers, study pods, printing, lockers and other collaborative study facilities with public and University access.',
    sources: [
      'https://www.library.sydney.edu.au/visit/pnr-learning-hub',
      'https://www.library.sydney.edu.au/about/news/5-hidden-gem-study-spots'
    ]
  },
  {
    id: 'seymour-centre',
    name: 'Seymour Centre',
    kind: 'performing-arts-building',
    aliases: ['seymour centre', 'seymour', 'seymour centre usyd'],
    summary:
      'The Seymour Centre opened on the Darlington campus in 1975 after businessman Everest York Seymour left a bequest for a centre devoted to musical and dramatic arts. Designed by Allen Jack and Cottier in a bold Brutalist style, it remains a major University performing-arts venue and supporter of independent artists and arts education.',
    sources: [
      'https://www.seymourcentre.com/our-history/',
      'https://www.seymourcentre.com/50th-anniversary/seymour-50th-anniversary/'
    ]
  }
];

const usydLandmarks = Object.freeze(
  landmarkRecords.map((record) =>
    Object.freeze({
      ...record,
      aliases: Object.freeze([...record.aliases]),
      sources: Object.freeze([...record.sources]),
      summaryVersion: SUMMARY_VERSION,
      verifiedAt: VERIFIED_AT
    })
  )
);

function normaliseLandmarkLookup(value) {
  return String(value || '')
    .normalize('NFKD')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function findUsydLandmark(value) {
  const cleanName = normaliseLandmarkLookup(value);

  if (!cleanName) {
    return null;
  }

  const exactMatch = usydLandmarks.find((landmark) => {
    const lookupValues = [landmark.name, ...landmark.aliases];
    return lookupValues.some((candidate) => normaliseLandmarkLookup(candidate) === cleanName);
  });

  if (exactMatch) {
    return exactMatch;
  }

  const partialMatches = usydLandmarks.flatMap((landmark) => {
    return [landmark.name, ...landmark.aliases]
      .map(normaliseLandmarkLookup)
      .filter((candidate) => candidate.length > 4)
      .filter((candidate) => cleanName.includes(candidate) || candidate.includes(cleanName))
      .map((candidate) => ({ landmark, matchLength: candidate.length }));
  });

  partialMatches.sort((a, b) => b.matchLength - a.matchLength);
  return partialMatches[0]?.landmark || null;
}

module.exports = {
  SUMMARY_VERSION,
  VERIFIED_AT,
  findUsydLandmark,
  normaliseLandmarkLookup,
  usydLandmarks
};
