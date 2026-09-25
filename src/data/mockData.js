export const BLOCKS_AND_VILLAGES = [
  { block: 'Rani Block', village: 'Rani Gaon', district: 'Kamrup Rural', state: 'Assam' },
  { block: 'Rani Block', village: 'Palasbari', district: 'Kamrup Rural', state: 'Assam' },
  { block: 'Chaygaon Block', village: 'Boko Bazaar', district: 'Kamrup Rural', state: 'Assam' },
  { block: 'Hajo Block', village: 'Ramdia', district: 'Kamrup Rural', state: 'Assam' },
  { block: 'Mylliem Block', village: 'Upper Shillong', district: 'East Khasi Hills', state: 'Meghalaya' },
  { block: 'Lunglei Block', village: 'Zotlang', district: 'Lunglei', state: 'Mizoram' },
  { block: 'Ucharpi Block', village: 'Jiribam', district: 'East Imphal', state: 'Manipur' },
];

export const OCCUPATIONS = [
  { id: 'teaWorker', label: 'Tea Garden Worker', icon: '🍃', burden: 'High repetitive kneeling & slope walking' },
  { id: 'farmer', label: 'Farmer / Paddy Cultivator', icon: '🌾', burden: 'Heavy paddy load lifting & waterlogging stance' },
  { id: 'weaver', label: 'Handloom Weaver', icon: '🧵', burden: 'Prolonged sitting & pedal flexing' },
  { id: 'shopkeeper', label: 'Shopkeeper / Vendor', icon: '🏪', burden: 'Long standing hours' },
  { id: 'homemaker', label: 'Homemaker', icon: '🏡', burden: 'Deep squatting & unpaved water fetching' },
  { id: 'porter', label: 'Hill Porter / Heavy Loader', icon: '🎒', burden: 'Extreme uphill biomechanical strain' },
];

export const PREVIOUS_PATIENTS = [
  {
    id: 'PAT-8821',
    name: 'Bimala Rabha',
    age: 54,
    gender: 'Female',
    occupation: 'Tea Garden Worker',
    village: 'Rani Gaon',
    block: 'Rani Block',
    complaints: { morningStiffness: true, swelling: true, locking: false, slopePain: true },
    riskScore: 78,
    riskBand: 'High Risk',
    riskColor: 'risk-high',
    rom: 96,
    angularVelocity: 172,
    pressureAsymmetry: '68% Medial / 32% Lateral',
    thermalDelta: '+1.6°C',
    crepitusCount: 14,
    terrainContext: 'Hilly Unpaved (1.35x)',
    visits: [
      { date: '2026-03-10', score: 82, rom: 90 },
      { date: '2026-06-15', score: 80, rom: 92 },
      { date: '2026-09-20', score: 78, rom: 96 }
    ]
  },
  {
    id: 'PAT-4109',
    name: 'Moniram Das',
    age: 62,
    gender: 'Male',
    occupation: 'Farmer / Paddy Cultivator',
    village: 'Boko Bazaar',
    block: 'Chaygaon Block',
    complaints: { morningStiffness: true, swelling: true, locking: true, slopePain: true },
    riskScore: 88,
    riskBand: 'Refer to District Hospital',
    riskColor: 'risk-refer',
    rom: 84,
    angularVelocity: 145,
    pressureAsymmetry: '74% Medial / 26% Lateral',
    thermalDelta: '+2.1°C',
    crepitusCount: 22,
    terrainContext: 'Muddy Paddy (1.45x)',
    visits: [
      { date: '2026-04-12', score: 85, rom: 88 },
      { date: '2026-09-18', score: 88, rom: 84 }
    ]
  },
  {
    id: 'PAT-1044',
    name: 'Tenzing Lepcha',
    age: 48,
    gender: 'Male',
    occupation: 'Hill Porter / Heavy Loader',
    village: 'Upper Shillong',
    block: 'Mylliem Block',
    complaints: { morningStiffness: false, swelling: false, locking: false, slopePain: true },
    riskScore: 42,
    riskBand: 'Moderate Risk',
    riskColor: 'risk-moderate',
    rom: 114,
    angularVelocity: 210,
    pressureAsymmetry: '58% Medial / 42% Lateral',
    thermalDelta: '+0.7°C',
    crepitusCount: 6,
    terrainContext: 'Steep Hill Slope (1.40x)',
    visits: [
      { date: '2026-08-01', score: 45, rom: 110 },
      { date: '2026-09-19', score: 42, rom: 114 }
    ]
  },
  {
    id: 'PAT-3092',
    name: 'Renu Gogoi',
    age: 39,
    gender: 'Female',
    occupation: 'Handloom Weaver',
    village: 'Ramdia',
    block: 'Hajo Block',
    complaints: { morningStiffness: false, swelling: false, locking: false, slopePain: false },
    riskScore: 18,
    riskBand: 'Low Risk',
    riskColor: 'risk-low',
    rom: 128,
    angularVelocity: 260,
    pressureAsymmetry: '51% Medial / 49% Lateral',
    thermalDelta: '+0.2°C',
    crepitusCount: 1,
    terrainContext: 'Flat Paved (1.00x)',
    visits: [
      { date: '2026-09-15', score: 18, rom: 128 }
    ]
  }
];

export const SENSOR_CONFIG = [
  {
    id: 'imu',
    name: 'IMU Gait Accelerometer',
    icon: 'Activity',
    unit: '°/s',
    normalRange: '200 - 280 °/s',
    desc: 'Measures leg angular velocity & step symmetry ratio'
  },
  {
    id: 'goniometer',
    name: 'Flexible Goniometer',
    icon: 'Maximize2',
    unit: 'Degrees (°)',
    normalRange: '120° - 140°',
    desc: 'Measures active knee flexion & extension range of motion'
  },
  {
    id: 'pressure',
    name: '5-Point Pressure Array',
    icon: 'Footprints',
    unit: 'Force Ratio',
    normalRange: '50% / 50%',
    desc: 'Detects medial vs lateral joint load imbalances'
  },
  {
    id: 'thermal',
    name: 'Infrared Thermal Sensor',
    icon: 'Thermometer',
    unit: 'ΔT (°C)',
    normalRange: '< 0.5°C',
    desc: 'Detects localized knee joint skin temperature elevation'
  },
  {
    id: 'acoustic',
    name: 'Acoustic / Piezo Sensor',
    icon: 'Volume2',
    unit: 'Events/min',
    normalRange: '< 3 events',
    desc: 'Records joint crepitus, clicking, and vibration bursts'
  },
  {
    id: 'barometer',
    name: 'Terrain Barometer',
    icon: 'Mountain',
    unit: 'Slope Index',
    normalRange: '1.0x - 1.5x',
    desc: 'Adjusts risk score for unpaved hill climbing effort'
  }
];

export const DISTRICT_ANALYTICS = {
  summary: {
    totalScreened: 1482,
    highRiskCases: 318,
    referralsSent: 142,
    activeAshas: 89,
    villagesCovered: 46
  },
  blockStats: [
    { block: 'Rani', low: 220, moderate: 140, high: 85, refer: 35 },
    { block: 'Chaygaon', low: 180, moderate: 110, high: 92, refer: 48 },
    { block: 'Hajo', low: 260, moderate: 95, high: 45, refer: 18 },
    { block: 'Boko', low: 190, moderate: 130, high: 64, refer: 28 },
    { block: 'Mylliem', low: 140, moderate: 88, high: 52, refer: 24 }
  ],
  highRiskRegistry: [
    { id: 'PAT-4109', name: 'Moniram Das', village: 'Boko Bazaar', block: 'Chaygaon', score: 88, band: 'Refer', asha: 'Sunita Deka', phone: '+91 98640 12345', date: '2026-09-18' },
    { id: 'PAT-8821', name: 'Bimala Rabha', village: 'Rani Gaon', block: 'Rani', score: 78, band: 'High Risk', asha: 'Kamala Kalita', phone: '+91 98640 67890', date: '2026-09-20' },
    { id: 'PAT-9012', name: 'Prabhat Gogoi', village: 'Ramdia', block: 'Hajo', score: 84, band: 'Refer', asha: 'Minoti Saikia', phone: '+91 98640 54321', date: '2026-09-19' },
    { id: 'PAT-3319', name: 'Lalitha Sangma', village: 'Upper Shillong', block: 'Mylliem', score: 81, band: 'High Risk', asha: 'Mary Lyngdoh', phone: '+91 98640 99887', date: '2026-09-17' },
  ]
};

export const CACHED_ASHA_WORKERS = [
  { id: 'ASHA-KAM-04', name: 'Sunita Deka', pin: '1234', block: 'Kamrup Rural', post: 'Post #4', phone: '+91 98640 12345' },
  { id: 'ASHA-RANI-02', name: 'Kamala Kalita', pin: '2345', block: 'Rani Block', post: 'Post #2', phone: '+91 98640 67890' },
  { id: 'ASHA-HAJO-01', name: 'Minoti Saikia', pin: '3456', block: 'Hajo Block', post: 'Post #1', phone: '+91 98640 54321' },
  { id: 'ASHA-MYL-03', name: 'Mary Lyngdoh', pin: '4567', block: 'Mylliem Block', post: 'Post #3', phone: '+91 98640 99887' },
];

export const AWARENESS_TOPICS = [
  {
    id: 'nutrition',
    category: 'nutrition',
    titleKey: 'awareNutritionTitle',
    title: 'Joint-Friendly Nutrition',
    icon: 'Apple',
    badge: 'Diet & Anti-Inflammatory',
    items: [
      {
        title: 'Moringa (Sajna) & Local Green Herbs',
        desc: 'Rich in natural bio-available calcium, magnesium, and Vitamin C for joint cartilage health. Consume weekly in stews or dal.',
        tag: 'High Calcium'
      },
      {
        title: 'Turmeric (Haldi) & Ginger Decoction',
        desc: 'Curcumin significantly suppresses joint capsule synovitis and morning inflammatory flares. Take with warm water or milk.',
        tag: 'Anti-Inflammatory'
      },
      {
        title: 'Consistent Clean Hydration',
        desc: 'Articular cartilage is over 70% water. Drinking 2.5–3L daily prevents synovial fluid thinning during heavy field labor.',
        tag: 'Synovial Fluid'
      },
      {
        title: 'Fresh Small Fish & Sesame (Til)',
        desc: 'Abundant in Omega-3 fatty acids and zinc that reduce joint matrix degradation and stiffness.',
        tag: 'Omega-3 Rich'
      }
    ]
  },
  {
    id: 'activity',
    category: 'activity',
    titleKey: 'awareActivityTitle',
    title: 'Physical Activity Guidance',
    icon: 'Activity',
    badge: 'Safe Movement Guidance',
    items: [
      {
        title: 'Morning Seated Knee Extensions',
        desc: 'Perform 15 gentle, slow leg extensions from a stool before beginning fieldwork to lubricate joint surfaces.',
        tag: 'Morning Routine'
      },
      {
        title: 'Non-Impact Walking on Even Surfaces',
        desc: 'Maintain 20–30 minutes of continuous brisk walking on flat paths. Avoid sudden high-impact running on rocks.',
        tag: 'Low-Impact'
      },
      {
        title: 'Avoid Abrupt Full Deep Squatting',
        desc: 'Deep squatting multiplies patellofemoral compressive force by 7–8x bodyweight. Use a low stool (pidha/mura) whenever possible.',
        tag: 'Joint Unloading'
      },
      {
        title: 'Warm Compress Prior to Field Work',
        desc: 'Apply a warm moist cloth for 10 minutes on stiff knees before starting morning harvesting shifts to increase flexibility.',
        tag: 'Stiffness Relief'
      }
    ]
  },
  {
    id: 'ergonomics',
    category: 'ergonomics',
    titleKey: 'awareErgoTitle',
    title: 'Occupational Ergonomics',
    icon: 'Briefcase',
    badge: 'Workplace Adaptation',
    items: [
      {
        title: 'Tea Garden Workers (Leaf Plucking)',
        desc: 'Alternate weight between knees every 20 minutes on hill slopes. Distribute basket weight using padded forehead straps and hip waist ties.',
        tag: 'Tea Garden'
      },
      {
        title: 'Paddy Farmers (Waterlogged Fields)',
        desc: 'Take 2-minute standing breaks every 30 minutes of bent-forward transplantation to relieve compartment strain from mud suction.',
        tag: 'Paddy Cultivator'
      },
      {
        title: 'Hill Porters (Heavy Loads on Slopes)',
        desc: 'Use a sturdy bamboo walking staff (danda) on descents. A walking pole absorbs up to 25% of knee joint impact during downhill walking.',
        tag: 'Hill Porters'
      },
      {
        title: 'Handloom Weavers (Prolonged Loom Sitting)',
        desc: 'Adjust foot-pedal elevation so knee angle never drops below 90 degrees. Stand and perform 10 heel-to-toe raises every hour.',
        tag: 'Handloom Weaving'
      }
    ]
  },
  {
    id: 'posture',
    category: 'posture',
    titleKey: 'awarePostureTitle',
    title: 'Footwear & Posture Tips',
    icon: 'Footprints',
    badge: 'Alignment & Cushioning',
    items: [
      {
        title: 'Supportive Padded Rubber Footwear',
        desc: 'Avoid ultra-thin flat slippers or barefoot walking on rocky unpaved paths. Use 15mm+ cushioned soles to absorb ground reaction forces.',
        tag: 'Shock Absorption'
      },
      {
        title: 'Equal Weight Distribution When Standing',
        desc: 'Avoid shifting all body weight habitually onto one "good" knee, which rapidly accelerates unilateral medial compartment degeneration.',
        tag: 'Symmetry'
      },
      {
        title: 'Carrying Water Pots / Firewood Safely',
        desc: 'Keep heavy loads close to the chest/centre of gravity rather than hanging outward, reducing knee flexion torque by up to 40%.',
        tag: 'Load Lifting'
      }
    ]
  }
];

