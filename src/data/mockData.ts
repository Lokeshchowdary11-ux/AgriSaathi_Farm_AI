import { FarmerProfile, MandiItem, WeatherDay, NotificationItem, EmergencyLog } from "../types";

export const defaultFarmerProfile: FarmerProfile = {
  fullName: "Kasi Viswanadham Rao",
  age: 48,
  gender: "Male",
  mobileNumber: "9848012345",
  email: "kasi.farmer@agrisaathi.in",
  village: "Pedakakani",
  mandal: "Pedakakani",
  district: "Guntur",
  state: "Andhra Pradesh",
  pinCode: "522509",
  farmLocation: "Guntur Rural (Lat: 16.3067, Long: 80.4365)",
  landAreaAcres: 4.5,
  soilType: "Black Cotton Soil",
  cropDetails: "Red Chilli (Teja 334), Paddy (BPT 5204 - Sona Masuri)",
  primaryCrop: "Chilli (మిరప)",
  cropSowingDate: "2026-06-15",
  emergencyContact1: {
    id: "ec1",
    name: "Subba Rao (Brother)",
    phone: "9440188223",
    relation: "Brother",
    isMandatory: true,
  },
  emergencyContact2: {
    id: "ec2",
    name: "Lakshmi Devi (Wife)",
    phone: "9848122334",
    relation: "Spouse",
    isMandatory: true,
  },
  emergencyContact3: {
    id: "ec3",
    name: "Raju (Village Sarpanch)",
    phone: "9866112233",
    relation: "Village Elder / Sarpanch",
    isMandatory: false,
  },
  isLoggedIn: true,
};

export const sampleCropImages = [
  {
    id: "cotton_leaf",
    name: "Cotton - Pink Bollworm Attack",
    nameTe: "పత్తి - గులాబీ రంగు పురుగు దాడి",
    url: "https://images.unsplash.com/photo-1599586120429-48281b6f0eca?auto=format&fit=crop&w=600&q=80",
    defaultDisease: {
      diseaseName: "Pink Bollworm Infestation (పత్తి గులాబీ రంగు పురుగు)",
      confidenceScore: 94,
      severity: "High" as const,
      explanation: "Presence of rose-pink larvae feeding on flower buds and interior boll carpels, causing premature drop.",
      treatmentOrganic: [
        "Deploy Pheromone traps @ 8 traps/acre for adult moth monitoring.",
        "Spray Neem Seed Kernel Extract (NSKE 5%) @ 50ml per liter of water."
      ],
      treatmentChemical: [
        "Spray Emamectin Benzoate 5% SG @ 4g per 10 liters of water.",
        "Spray Chlorantraniliprole 18.5% SC @ 3ml per 10L water during evening hours."
      ],
      preventionMethods: [
        "Avoid extending cotton crop beyond December to break pest life cycle.",
        "Destroy crop residues after harvest immediately."
      ],
      recoveryTimeline: "8-12 Days with targeted spray"
    }
  },
  {
    id: "paddy_leaf",
    name: "Paddy - Rice Blast Fungus",
    nameTe: "వరి - అగ్గి తెగులు (బ్లాస్ట్)",
    url: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80",
    defaultDisease: {
      diseaseName: "Rice Leaf Blast - Pyricularia oryzae (వరి అగ్గి తెగులు)",
      confidenceScore: 91,
      severity: "Medium" as const,
      explanation: "Spindle-shaped lesions with gray centers and reddish-brown borders visible on foliage.",
      treatmentOrganic: [
        "Apply Pseudomonas fluorescens bio-fungicide @ 10g per liter of water.",
        "Drain excessive field water temporarily for 2-3 days."
      ],
      treatmentChemical: [
        "Spray Tricyclazole 75% WP @ 0.6 grams per liter of water.",
        "Avoid excess Nitrogen fertilizer application."
      ],
      preventionMethods: [
        "Use resistant varieties like BPT 5204 or MTU 1010 with seed treatment.",
        "Seed treatment with Carbendazim @ 2g/kg seed."
      ],
      recoveryTimeline: "7-10 Days"
    }
  },
  {
    id: "chilli_leaf",
    name: "Chilli - Leaf Curl Virus",
    nameTe: "మిర్చి - ఆకు ముడత తెగులు",
    url: "https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?auto=format&fit=crop&w=600&q=80",
    defaultDisease: {
      diseaseName: "Chilli Leaf Curl Virus & Thrips Attack (మిర్చి నల్ల తామర పురుగు & ఆకు ముడత)",
      confidenceScore: 89,
      severity: "High" as const,
      explanation: "Upward and downward curling of leaves, stunted growth and boat-shaped puckering caused by whiteflies/thrips vector.",
      treatmentOrganic: [
        "Set up Yellow & Blue Sticky traps @ 15/acre.",
        "Spray Sour Milk/Butter Milk fermented spray (5L/100L water)."
      ],
      treatmentChemical: [
        "Spray Fipronil 5% SC @ 2ml/L or Spinetoram 11.7% SC @ 0.9ml/L.",
        "Spray Acetamiprid 20% SP @ 0.2g/L to control whitefly vector."
      ],
      preventionMethods: [
        "Grow barrier crops like maize or sorghum in 4 rows around chilli plot.",
        "Keep field weed-free."
      ],
      recoveryTimeline: "10-14 Days"
    }
  },
  {
    id: "tomato_leaf",
    name: "Tomato - Early Blight",
    nameTe: "టమోటా - ముందస్తు మచ్చ తెగులు",
    url: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=600&q=80",
    defaultDisease: {
      diseaseName: "Tomato Early Blight - Alternaria solani (టమోటా మచ్చ తెగులు)",
      confidenceScore: 93,
      severity: "Medium" as const,
      explanation: "Concentric target-like rings on lower mature leaves causing premature yellowing.",
      treatmentOrganic: [
        "Spray Trichoderma viride solution @ 5g/L.",
        "Prune bottom 6 inches of infected leaves."
      ],
      treatmentChemical: [
        "Spray Mancozeb 75% WP @ 2.5g/L or Azoxystrobin @ 1ml/L."
      ],
      preventionMethods: [
        "Mulch bed surface with straw to prevent soil splash on leaves.",
        "Ensure good crop rotation."
      ],
      recoveryTimeline: "6-8 Days"
    }
  }
];

export const mandiPricesData: MandiItem[] = [
  {
    id: "m1",
    cropName: "Red Chilli (Teja)",
    cropNameTe: "ఎర్ర మిర్చి (తేజ)",
    mandiName: "Guntur Mirchi Yard",
    district: "Guntur",
    state: "Andhra Pradesh",
    modalPrice: 19800,
    minPrice: 17500,
    maxPrice: 22400,
    priceChange: 3.8,
    trend: "up",
    lastUpdated: "Today 08:30 AM",
    recommendation: "Hold for 4-5 days. Export demand expected to raise prices by ₹500/quintal.",
    recommendationTe: "4-5 రోజులు ఆగండి. ఎగుమతుల డిమాండ్ వల్ల క్వింటాలుకు ₹500 వరకు ధర పెరిగే అవకాశం ఉంది."
  },
  {
    id: "m2",
    cropName: "Paddy (BPT 5204 Sona)",
    cropNameTe: "వరి (బిపిటి 5204 సోనా మసూరి)",
    mandiName: "Warangal Agricultural Market",
    district: "Warangal",
    state: "Telangana",
    modalPrice: 2320,
    minPrice: 2180,
    maxPrice: 2450,
    priceChange: 1.2,
    trend: "up",
    lastUpdated: "Today 09:00 AM",
    recommendation: "Good time to sell high-grade dry paddy. Govt MSP purchase centers active.",
    recommendationTe: "మంచి రకం పొడి వరి అమ్మకానికి అనుకూల సమయం. ప్రభుత్వ కొనుగోలు కేంద్రాలు అందుబాటులో ఉన్నాయి."
  },
  {
    id: "m3",
    cropName: "Cotton (Long Staple)",
    cropNameTe: "పత్తి (పొడవు పింజ)",
    mandiName: "Adoni Cotton Market",
    district: "Kurnool",
    state: "Andhra Pradesh",
    modalPrice: 7450,
    minPrice: 6800,
    maxPrice: 7820,
    priceChange: -0.8,
    trend: "down",
    lastUpdated: "Today 07:45 AM",
    recommendation: "Price slightly decreased due to moisture content. Dry cotton before bringing to market.",
    recommendationTe: "తేమ శాతం వల్ల ధర స్వల్పంగా తగ్గింది. పత్తి బాగా ఆర్రబెట్టి మార్కెట్‌కు తీసుకురండి."
  },
  {
    id: "m4",
    cropName: "Maize (Yellow Corn)",
    cropNameTe: "మొక్కజొన్న",
    mandiName: "Nizamabad Market Yard",
    district: "Nizamabad",
    state: "Telangana",
    modalPrice: 2150,
    minPrice: 1950,
    maxPrice: 2280,
    priceChange: 0,
    trend: "stable",
    lastUpdated: "Today 08:15 AM",
    recommendation: "Poultry feed mills actively purchasing at stable rates.",
    recommendationTe: "పౌల్ట్రీ ఫీడ్ మిల్లుల నుండి స్థిరమైన కొనుగోళ్లు సాగుతున్నాయి."
  },
  {
    id: "m5",
    cropName: "Turmeric (Finger)",
    cropNameTe: "పసుపు (కొమ్ము)",
    mandiName: "Duggirala Turmeric Yard",
    district: "Guntur",
    state: "Andhra Pradesh",
    modalPrice: 14200,
    minPrice: 12800,
    maxPrice: 15600,
    priceChange: 4.5,
    trend: "up",
    lastUpdated: "Today 09:10 AM",
    recommendation: "High demand in North India markets. Prices trending upwards.",
    recommendationTe: "ఉత్తరాది మార్కెట్లలో భారీ డిమాండ్. ధరలు పెరుగుతున్నాయి."
  },
  {
    id: "m6",
    cropName: "Bengal Gram (Khabuli Chana)",
    cropNameTe: "శనగలు",
    mandiName: "Khammam Grain Market",
    district: "Khammam",
    state: "Telangana",
    modalPrice: 5650,
    minPrice: 5200,
    maxPrice: 5900,
    priceChange: 0.5,
    trend: "stable",
    lastUpdated: "Today 08:50 AM",
    recommendation: "Stable market. Good offer for dry grain.",
    recommendationTe: "స్థిరమైన మార్కెట్. నాణ్యమైన శనగలకు మంచి ధర."
  }
];

export const weather7Days: WeatherDay[] = [
  {
    date: "2026-07-28",
    dayName: "Today",
    tempMax: 33,
    tempMin: 25,
    condition: "Cloudy",
    humidity: 72,
    rainProbability: 25,
    windSpeed: 14,
    precaution: "Ideal weather for weeding and soil loosening.",
    precautionTe: "కలుపు తీయుటకు, దుక్కి దున్నుటకు అనుకూలమైన వాతావరణం."
  },
  {
    date: "2026-07-29",
    dayName: "Tomorrow",
    tempMax: 31,
    tempMin: 24,
    condition: "Rainy",
    humidity: 86,
    rainProbability: 80,
    windSpeed: 22,
    precaution: "Heavy showers predicted in afternoon. Postpone pesticide sprays & fertilizer application.",
    precautionTe: "మధ్యాహ్నం మోస్తరు నుండి భారీ వర్షం పడే అవకాశం. మందుల పిచికారీ, ఎరువుల వాడకం వాయిదా వేయండి."
  },
  {
    date: "2026-07-30",
    dayName: "Thursday",
    tempMax: 30,
    tempMin: 23,
    condition: "Thunderstorm",
    humidity: 90,
    rainProbability: 85,
    windSpeed: 28,
    precaution: "Thunderstorms & lightning expected! Keep livestock indoors and away from electrical poles.",
    precautionTe: "ఉరుములు, మెరుపులతో కూడిన వర్షం. పశువులను సురక్షితమైన ప్రదేశాల్లో ఉంచండి."
  },
  {
    date: "2026-07-31",
    dayName: "Friday",
    tempMax: 32,
    tempMin: 24,
    condition: "Cloudy",
    humidity: 78,
    rainProbability: 30,
    windSpeed: 16,
    precaution: "Ensure excess water is drained from paddy fields to prevent root rot.",
    precautionTe: "చేనులో నిలిచిన అదనపు నీటిని బయటకు వెళ్లేలా కాలువలు తీయండి."
  },
  {
    date: "2026-08-01",
    dayName: "Saturday",
    tempMax: 34,
    tempMin: 26,
    condition: "Sunny",
    humidity: 65,
    rainProbability: 10,
    windSpeed: 12,
    precaution: "Clear sunny day. Good condition for foliage fertilizer spray.",
    precautionTe: "ఎండ కాస్తుంది. ఆకులపై పోషకాల పిచికారీ చేయడానికి అనుకూలం."
  },
  {
    date: "2026-08-02",
    dayName: "Sunday",
    tempMax: 35,
    tempMin: 26,
    condition: "Sunny",
    humidity: 62,
    rainProbability: 5,
    windSpeed: 10,
    precaution: "Provide drip irrigation for chilli & vegetable beds.",
    precautionTe: "మిర్చి, కూరగాయల పంటలకు డ్రిప్ నీటి పారుదల అందించండి."
  },
  {
    date: "2026-08-03",
    dayName: "Monday",
    tempMax: 34,
    tempMin: 25,
    condition: "Cloudy",
    humidity: 68,
    rainProbability: 20,
    windSpeed: 15,
    precaution: "Monitor chilli crop for whitefly and thrips attack.",
    precautionTe: "మిర్చి పంటను తెల్లదోమ, తామర పురుగుల కోసం పరిశీలించండి."
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: "n-soil-1",
    title: "🌱 Proactive Alert: Black Cotton Soil Zinc Advisory",
    titleTe: "🌱 నల్లరేగడి నేలల జింక్ పోషక హెచ్చరిక & సలహా",
    message: "Guntur regional trends indicate high Zinc deficiency in Black Cotton Soil. For your 4.5 acres, apply 25kg Zinc Sulphate (21%) + 112kg SSP basal dose before next irrigation cycle.",
    messageTe: "గుంటూరు ప్రాంతీయ నల్లరేగడి నేలల్లో జింక్ లోపం ఎక్కువగా వ్యక్తమవుతోంది. మీ 4.5 ఎకరాలకు 25కిలోల జింక్ సల్ఫేట్ + 112కిలోల SSP బేసల్ ఎరువుగా అందించండి.",
    type: "soil",
    timestamp: "Just Now",
    read: false,
    soilTypeTag: "Black Cotton Soil",
    fertilizerDose: "Zinc Sulphate 21% (25kg) + SSP (112kg for 4.5 acres)",
    actionableQuery: "What is the best way to apply Zinc Sulphate and Single Super Phosphate in Black Cotton Soil for Chilli and Paddy?"
  },
  {
    id: "n1",
    title: "🌧 Rain Alert for Guntur & Krishna",
    titleTe: "🌧 గుంటూరు & కృష్ణా జిల్లాలకు వర్ష హెచ్చరిక",
    message: "Heavy rain (80% probability) expected tomorrow afternoon. Postpone fertilizer application.",
    messageTe: "రేపు మధ్యాహ్నం భారీ వర్షం కురిసే అవకాశం ఉంది. ఎరువుల వేయడం వాయిదా వేయండి.",
    type: "weather",
    timestamp: "10 mins ago",
    read: false,
  },
  {
    id: "n2",
    title: "📈 Red Chilli Price Surge at Guntur Yard",
    titleTe: "📈 గుంటూరు యార్డులో మిర్చి ధరల పెంపు",
    message: "Teja Chilli modal price reached ₹19,800/quintal today (+₹700 increase).",
    messageTe: "తేజ మిర్చి ధర నేడు క్వింటాలుకు ₹19,800 కి చేరింది (+₹700 పెరిగింది).",
    type: "market",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "n3",
    title: "💰 PM-KISAN 17th Installment Credited",
    titleTe: "💰 పిఎం-కిసాన్ 17వ విడత జమ",
    message: "₹2,000 transferred to eligible bank accounts. Check your beneficiary status.",
    messageTe: "అర్హులైన రైతుల ఖాతాల్లో ₹2,000 జమ చేయబడ్డాయి. మీ బ్యాంక్ స్టేటస్ చూసుకోండి.",
    type: "scheme",
    timestamp: "Yesterday",
    read: true,
  }
];

export const sampleEmergencyLogs: EmergencyLog[] = [
  {
    id: "sos-101",
    timestamp: "2026-07-20 16:45",
    locationName: "Pedakakani North Field (Guntur)",
    latLng: "16.3067° N, 80.4365° E",
    contactsAlerted: ["Subba Rao (Brother - 9440188223)", "Lakshmi Devi (Spouse - 9848122334)"],
    status: "Help Responded",
    notes: "Sudden snake encounter near irrigation pump house. Contacts alerted & Sarpanch responded in 8 minutes."
  }
];
