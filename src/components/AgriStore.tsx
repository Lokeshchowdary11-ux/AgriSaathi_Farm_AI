import React, { useState } from "react";
import { Language } from "../types";
import { ShoppingCart, Leaf, Droplet, Package, Tractor, Search, Filter, Star, Plus, CheckCircle2, Check, History, Truck, Clock, MapPin } from "lucide-react";


interface Order {
  id: string;
  date: string;
  items: { product: Product; quantity: number }[];
  total: number;
  status: "Processing" | "Shipped" | "Delivered";
}

interface Product {
  id: string;
  name: string;
  nameTe: string;
  category: "Fertilizer" | "Pesticide" | "Seeds" | "Equipment";
  price: number;
  unit: string;
  rating: number;
  image: string;
  description: string;
  descriptionTe: string;
}

const sampleProducts: Product[] = [
  {
    id: "prod-1",
    name: "Urea 46% Nitrogen",
    nameTe: "యూరియా 46% నత్రజని",
    category: "Fertilizer",
    price: 266,
    unit: "45 kg bag",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1628183204781-a9dc2db5a3d5?w=500&auto=format&fit=crop&q=60",
    description: "High quality urea fertilizer for enhanced crop growth.",
    descriptionTe: "పంటల పెరుగుదలకు నాణ్యమైన యూరియా ఎరువు.",
  },
  {
    id: "prod-2",
    name: "DAP (Di-ammonium Phosphate)",
    nameTe: "డీఏపీ ఎరువు (DAP)",
    category: "Fertilizer",
    price: 1350,
    unit: "50 kg bag",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1628183204781-a9dc2db5a3d5?w=500&auto=format&fit=crop&q=60",
    description: "Essential for root development and early plant growth.",
    descriptionTe: "వేరు అభివృద్ధికి మరియు మొక్కల ప్రారంభ పెరుగుదలకు అవసరమైన ఎరువు.",
  },
  {
    id: "prod-3",
    name: "Neem Oil Bio-Pesticide",
    nameTe: "వేప నూనె క్రిమిసంహారిణి",
    category: "Pesticide",
    price: 450,
    unit: "1 Liter",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1615486511484-92e172054dbb?w=500&auto=format&fit=crop&q=60",
    description: "Organic spray liquid for pest control.",
    descriptionTe: "పురుగుల నివారణకు ఆర్గానిక్ స్ప్రే లిక్విడ్.",
  },
  {
    id: "prod-4",
    name: "NPK 19:19:19 Water Soluble",
    nameTe: "ఎన్‌పికె 19:19:19 నీటిలో కరిగే ఎరువు",
    category: "Fertilizer",
    price: 180,
    unit: "1 kg",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1628183204781-a9dc2db5a3d5?w=500&auto=format&fit=crop&q=60",
    description: "Ideal for foliar spray and drip irrigation to improve yield.",
    descriptionTe: "దిగుబడిని పెంచడానికి ఫోలియర్ స్ప్రే మరియు డ్రిప్ ఇరిగేషన్‌కు అనువైనది.",
  },
  {
    id: "prod-5",
    name: "Chlorpyrifos 20% EC",
    nameTe: "క్లోర్‌పైరిఫాస్ 20% EC (పురుగుమందు)",
    category: "Pesticide",
    price: 320,
    unit: "500 ml",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=500&auto=format&fit=crop&q=60",
    description: "Broad-spectrum insecticide for controlling various pests.",
    descriptionTe: "వివిధ మట్టి మరియు ఆకుల తెగుళ్ళను నివారించే క్రిమిసంహారిణి.",
  },
  {
    id: "prod-6",
    name: "BT Cotton Seeds (Bollgard II)",
    nameTe: "బిటి పత్తి విత్తనాలు (Bollgard II)",
    category: "Seeds",
    price: 850,
    unit: "450 gm",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1599813953796-03cead447f5b?w=500&auto=format&fit=crop&q=60",
    description: "High yielding cotton seeds with bollworm resistance.",
    descriptionTe: "అధిక దిగుబడినిచ్చే, పత్తి కాయతొలుచు పురుగును తట్టుకునే విత్తనాలు.",
  },
  {
    id: "prod-7",
    name: "Battery Operated Knapsack Sprayer",
    nameTe: "బ్యాటరీతో పనిచేసే స్ప్రేయర్ (16L)",
    category: "Equipment",
    price: 2400,
    unit: "1 Piece (16L)",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&auto=format&fit=crop&q=60",
    description: "16-Liter dual mode sprayer for efficient application.",
    descriptionTe: "సమర్థవంతంగా పిచికారీ చేయడానికి 16 లీటర్ల డ్యూయల్ మోడ్ స్ప్రేయర్.",
  },
  {
    id: "prod-8",
    name: "Paddy Seeds (BPT 5204)",
    nameTe: "వరి విత్తనాలు (BPT 5204 / సాంబ మసూరి)",
    category: "Seeds",
    price: 950,
    unit: "25 kg bag",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=500&auto=format&fit=crop&q=60",
    description: "Fine grain, high yielding paddy seed variety.",
    descriptionTe: "సన్న గింజలు, అధిక దిగుబడినిచ్చే వరి రకం.",
  },
  {
    id: "prod-9",
    name: "Zinc Sulphate 33%",
    nameTe: "జింక్ సల్ఫేట్ 33%",
    category: "Fertilizer",
    price: 450,
    unit: "5 kg bag",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1628183204781-a9dc2db5a3d5?w=500&auto=format&fit=crop&q=60",
    description: "Crucial for plant enzyme systems.",
    descriptionTe: "మొక్కల ఎంజైమ్ వ్యవస్థలకు కీలకం.",
  },
  {
    id: "prod-10",
    name: "Imidacloprid 17.8% SL",
    nameTe: "ఇమిడాక్లోప్రిడ్ 17.8% SL (పురుగుమందు)",
    category: "Pesticide",
    price: 380,
    unit: "250 ml",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=500&auto=format&fit=crop&q=60",
    description: "Effective systemic insecticide for sucking pests.",
    descriptionTe: "రసం పీల్చే పురుగుల నివారణకు సమర్థవంతమైన పురుగుమందు.",
  },
  {
    id: "prod-11",
    name: "Solar Insect Light Trap",
    nameTe: "సోలార్ ఇన్సెక్ట్ లైట్ ట్రాప్ (పురుగుల వల)",
    category: "Equipment",
    price: 1850,
    unit: "1 Piece",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1509391366360-12808b1a41f6?w=500&auto=format&fit=crop&q=60",
    description: "Eco-friendly pest management trap.",
    descriptionTe: "పర్యావరణ అనుకూల పురుగుల నివారణ వల.",
  },
  {
    id: "prod-12",
    name: "Tomato Seeds (Arka Rakshak)",
    nameTe: "టమాటా విత్తనాలు (అర్క రక్షక్)",
    category: "Seeds",
    price: 650,
    unit: "10 gm",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=500&auto=format&fit=crop&q=60",
    description: "High yielding hybrid tomato seeds.",
    descriptionTe: "అధిక దిగుబడినిచ్చే హైబ్రిడ్ టమాటా విత్తనాలు.",
  },
  {
    id: "prod-13",
    name: "Roundup Herbicide",
    nameTe: "రౌండప్ కలుపు నివారణ",
    category: "Pesticide",
    price: 450,
    unit: "1 Liter",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1593352216443-c045b84c8be2?w=500&auto=format&fit=crop&q=60",
    description: "Non-selective systemic herbicide.",
    descriptionTe: "కలుపు మొక్కలను నాశనం చేసే హెర్బిసైడ్.",
  },
  {
    id: "prod-14",
    name: "Coragen Insecticide",
    nameTe: "కోరాజెన్ పురుగుమందు",
    category: "Pesticide",
    price: 1850,
    unit: "150 ml",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=500&auto=format&fit=crop&q=60",
    description: "Advanced insecticide for long-lasting protection.",
    descriptionTe: "దీర్ఘకాలిక రక్షణ కోసం అత్యుత్తమ పురుగుమందు.",
  },
  {
    id: "prod-15",
    name: "MOP (Muriate of Potash)",
    nameTe: "పొటాష్ ఎరువు (MOP)",
    category: "Fertilizer",
    price: 1700,
    unit: "50 kg bag",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1628183204781-a9dc2db5a3d5?w=500&auto=format&fit=crop&q=60",
    description: "Improves crop quality and water retention.",
    descriptionTe: "పంట నాణ్యత, నీటి నిల్వ సామర్థ్యాన్ని పెంచుతుంది.",
  },
  {
    id: "prod-16",
    name: "Chilli Seeds (Tejaswini)",
    nameTe: "మిరప విత్తనాలు (తేజస్విని)",
    category: "Seeds",
    price: 450,
    unit: "10 gm",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1616421063628-98448a3e743a?w=500&auto=format&fit=crop&q=60",
    description: "High pungent hybrid chilli seeds.",
    descriptionTe: "అధిక కారం గల హైబ్రిడ్ విత్తనాలు.",
  },
  {
    id: "prod-17",
    name: "Heavy Duty Tarpaulin Sheet",
    nameTe: "టార్పాలిన్ కవర్ (24x30 ft)",
    category: "Equipment",
    price: 1250,
    unit: "24x30 ft",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=500&auto=format&fit=crop&q=60",
    description: "Waterproof tarpaulin for protecting crops.",
    descriptionTe: "పంటలను రక్షించడానికి వాటర్‌ప్రూఫ్ టార్పాలిన్.",
  },
  {
    id: "prod-18",
    name: "Drip Irrigation Kit",
    nameTe: "డ్రిప్ ఇరిగేషన్ కిట్ (1 ఎకరం)",
    category: "Equipment",
    price: 15000,
    unit: "1 Acre Kit",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1598466619623-289552d4b9b9?w=500&auto=format&fit=crop&q=60",
    description: "Complete drip irrigation kit for 1 acre.",
    descriptionTe: "1 ఎకరం పొలానికి పూర్తి డ్రిప్ ఇరిగేషన్ కిట్.",
  },
  {
    id: "prod-19",
    name: "Vermicompost Fertilizer",
    nameTe: "వానపాముల ఎరువు (వర్మీకంపోస్ట్)",
    category: "Fertilizer",
    price: 350,
    unit: "50 kg bag",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1628183204781-a9dc2db5a3d5?w=500&auto=format&fit=crop&q=60",
    description: "100% organic fertilizer rich in nutrients.",
    descriptionTe: "పోషకాలతో నిండిన 100% ఆర్గానిక్ ఎరువు.",
  },
  {
    id: "prod-20",
    name: "Onion Seeds (Nasik Red)",
    nameTe: "ఉల్లి విత్తనాలు (నాసిక్ రెడ్)",
    category: "Seeds",
    price: 1200,
    unit: "1 kg",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1623838421008-01334994ee31?w=500&auto=format&fit=crop&q=60",
    description: "High quality red onion seeds with good storage capacity.",
    descriptionTe: "మంచి నిల్వ సామర్థ్యం ఉన్న నాణ్యమైన ఉల్లి విత్తనాలు.",
  },
  {
    id: "prod-21",
    name: "Agricultural Sickle",
    nameTe: "కొడవలి (Sickle)",
    category: "Equipment",
    price: 150,
    unit: "1 Piece",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1603525281518-e7cdebb98dcd?w=500&auto=format&fit=crop&q=60",
    description: "Sharp and durable sickle for harvesting.",
    descriptionTe: "కోత కోసం పదునైన మరియు మన్నికైన కొడవలి.",
  },
  {
    id: "prod-22",
    name: "Mancozeb 75% WP Fungicide",
    nameTe: "మాంకోజెబ్ 75% WP (శిలీంద్ర సంహారిణి)",
    category: "Pesticide",
    price: 400,
    unit: "1 kg",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=500&auto=format&fit=crop&q=60",
    description: "Broad-spectrum contact fungicide.",
    descriptionTe: "విస్తృత శ్రేణి శిలీంద్ర సంహారిణి.",
  },
  {
    id: "prod-23",
    name: "PVC Delivery Pipe (2 inch)",
    nameTe: "PVC డెలివరీ పైపు (2 అంగుళాలు)",
    category: "Equipment",
    price: 850,
    unit: "30 Meters",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1598466619623-289552d4b9b9?w=500&auto=format&fit=crop&q=60",
    description: "Flexible and durable water delivery pipe.",
    descriptionTe: "నీటి సరఫరా కోసం మన్నికైన పైపు.",
  },
  {
    id: "prod-24",
    name: "Maize Seeds (Pioneer 3396)",
    nameTe: "మొక్కజొన్న విత్తనాలు (Pioneer 3396)",
    category: "Seeds",
    price: 1450,
    unit: "4 kg bag",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1601646271913-9069d2be0b48?w=500&auto=format&fit=crop&q=60",
    description: "High yielding hybrid maize seeds.",
    descriptionTe: "అధిక దిగుబడినిచ్చే మొక్కజొన్న హైబ్రిడ్ విత్తనాలు.",
  },
  {
    id: "prod-25",
    name: "Calcium Nitrate",
    nameTe: "కాల్షియం నైట్రేట్ ఎరువు",
    category: "Fertilizer",
    price: 1250,
    unit: "25 kg bag",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1628183204781-a9dc2db5a3d5?w=500&auto=format&fit=crop&q=60",
    description: "Water soluble fertilizer for cell wall strengthening.",
    descriptionTe: "కణకవచం బలోపేతం చేయడానికి నీటిలో కరిగే ఎరువు.",
  },
  {
    id: "prod-26",
    name: "Safety Gloves (Heavy Duty)",
    nameTe: "సేఫ్టీ గ్లోవ్స్",
    category: "Equipment",
    price: 250,
    unit: "1 Pair",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1591871261353-84f9715a3177?w=500&auto=format&fit=crop&q=60",
    description: "Protective gloves for handling chemicals and rough farming tasks.",
    descriptionTe: "రసాయనాలు మరియు కఠినమైన పనుల కోసం రక్షణ గ్లోవ్స్.",
  },
  {
    id: "prod-27",
    name: "Trichoderma Viride Bio-Fungicide",
    nameTe: "ట్రైకోడెర్మా విరిడే (బయో-ఫంగిసైడ్)",
    category: "Pesticide",
    price: 180,
    unit: "1 kg",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=500&auto=format&fit=crop&q=60",
    description: "Organic solution to prevent soil-borne diseases.",
    descriptionTe: "నేల ద్వారా వచ్చే తెగుళ్లను నివారించడానికి సేంద్రీయ ద్రావణం.",
  },
  {
    id: "prod-28",
    name: "Sunflower Seeds",
    nameTe: "పొద్దుతిరుగుడు విత్తనాలు",
    category: "Seeds",
    price: 950,
    unit: "2 kg bag",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1593026362840-7e40624a0d8e?w=500&auto=format&fit=crop&q=60",
    description: "High oil yielding sunflower hybrid seeds.",
    descriptionTe: "అధిక నూనె దిగుబడినిచ్చే పొద్దుతిరుగుడు విత్తనాలు.",
  },
  {
    id: "prod-29",
    name: "Weed Cutter / Brush Cutter",
    nameTe: "కలుపు కోసే యంత్రం (Brush Cutter)",
    category: "Equipment",
    price: 12500,
    unit: "1 Machine",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&auto=format&fit=crop&q=60",
    description: "Petrol operated brush cutter for clearing weeds and shrubs.",
    descriptionTe: "కలుపు మరియు పొదలను తొలగించడానికి పెట్రోల్ తో పనిచేసే యంత్రం.",
  },
  {
    id: "prod-30",
    name: "Seaweed Extract Liquid",
    nameTe: "సీవీడ్ ఎక్స్‌ట్రాక్ట్ లిక్విడ్",
    category: "Fertilizer",
    price: 550,
    unit: "1 Liter",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1628183204781-a9dc2db5a3d5?w=500&auto=format&fit=crop&q=60",
    description: "Natural plant growth promoter.",
    descriptionTe: "సహజమైన మొక్కల పెరుగుదల ప్రమోటర్.",
  },
  {
    id: "prod-31",
    name: "Spade (Phawda)",
    nameTe: "పార (Spade)",
    category: "Equipment",
    price: 350,
    unit: "1 Piece",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1603525281518-e7cdebb98dcd?w=500&auto=format&fit=crop&q=60",
    description: "Sturdy spade for digging and soil turning.",
    descriptionTe: "మట్టి త్రవ్వడానికి మరియు తిప్పడానికి గట్టి పార.",
  },
  {
    id: "prod-32",
    name: "Watermelon Seeds (Icebox)",
    nameTe: "పుచ్చకాయ విత్తనాలు (ఐస్బాక్స్)",
    category: "Seeds",
    price: 850,
    unit: "50 gm",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=500&auto=format&fit=crop&q=60",
    description: "Sweet, dark green outer rind watermelon seeds.",
    descriptionTe: "తీపి మరియు ముదురు ఆకుపచ్చ రంగు పుచ్చకాయ విత్తనాలు.",
  },
  {
    id: "prod-33",
    name: "Bavistin Systemic Fungicide",
    nameTe: "బావిస్టిన్ ఫంగిసైడ్",
    category: "Pesticide",
    price: 580,
    unit: "500 gm",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=500&auto=format&fit=crop&q=60",
    description: "Highly effective systemic fungicide.",
    descriptionTe: "అత్యంత ప్రభావవంతమైన సిస్టమిక్ ఫంగిసైడ్.",
  },
  {
    id: "prod-34",
    name: "Boron 20%",
    nameTe: "బోరాన్ 20% ఎరువు",
    category: "Fertilizer",
    price: 250,
    unit: "1 kg",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1628183204781-a9dc2db5a3d5?w=500&auto=format&fit=crop&q=60",
    description: "Essential micronutrient for flower and fruit development.",
    descriptionTe: "పువ్వులు మరియు పండ్ల అభివృద్ధికి అవసరమైన సూక్ష్మపోషకం.",
  },
  {
    id: "prod-35",
    name: "Water Pump (1.5 HP)",
    nameTe: "వాటర్ పంప్ (1.5 HP మోటార్)",
    category: "Equipment",
    price: 8500,
    unit: "1 Motor",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1598466619623-289552d4b9b9?w=500&auto=format&fit=crop&q=60",
    description: "Reliable centrifugal water pump for irrigation.",
    descriptionTe: "నీటి పారుదల కోసం నమ్మదగిన నీటి పంప్.",
  },
  {
    id: "prod-36",
    name: "Papaya Seeds (Red Lady)",
    nameTe: "బొప్పాయి విత్తనాలు (రెడ్ లేడీ)",
    category: "Seeds",
    price: 3200,
    unit: "10 gm",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1615486511484-92e172054dbb?w=500&auto=format&fit=crop&q=60",
    description: "World famous hybrid papaya seeds.",
    descriptionTe: "ప్రపంచ ప్రసిద్ధ హైబ్రిడ్ బొప్పాయి విత్తనాలు.",
  },
  {
    id: "prod-37",
    name: "Pseudomonas Fluorescens",
    nameTe: "సూడోమోనాస్ బయో-ఫంగిసైడ్",
    category: "Pesticide",
    price: 150,
    unit: "1 kg",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=500&auto=format&fit=crop&q=60",
    description: "Biological control agent against plant pathogens.",
    descriptionTe: "మొక్కల వ్యాధికారక క్రిములకు వ్యతిరేకంగా బయో-కంట్రోల్ ఏజెంట్.",
  },
  {
    id: "prod-38",
    name: "Secateurs (Pruning Shears)",
    nameTe: "కత్తిరింపు కత్తెర (Secateurs)",
    category: "Equipment",
    price: 450,
    unit: "1 Piece",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1603525281518-e7cdebb98dcd?w=500&auto=format&fit=crop&q=60",
    description: "Sharp pruning shears for cutting branches and stems.",
    descriptionTe: "కొమ్మలు మరియు కాడలను కత్తిరించడానికి కత్తెర.",
  },
  {
    id: "prod-39",
    name: "Magnesium Sulphate (Epsom Salt)",
    nameTe: "మెగ్నీషియం సల్ఫేట్ (ఎప్సమ్ సాల్ట్)",
    category: "Fertilizer",
    price: 200,
    unit: "5 kg",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1628183204781-a9dc2db5a3d5?w=500&auto=format&fit=crop&q=60",
    description: "Provides magnesium for chlorophyll production.",
    descriptionTe: "క్లోరోఫిల్ ఉత్పత్తికి మెగ్నీషియంను అందిస్తుంది.",
  },
  {
    id: "prod-40",
    name: "Gumboots (PVC)",
    nameTe: "గం బూట్స్ (నీటి బూట్లు)",
    category: "Equipment",
    price: 550,
    unit: "1 Pair",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1591871261353-84f9715a3177?w=500&auto=format&fit=crop&q=60",
    description: "Waterproof boots for farming in wet and muddy conditions.",
    descriptionTe: "తడి మరియు బురదలో వ్యవసాయం చేయడానికి వాటర్‌ప్రూఫ్ బూట్లు.",
  }
];

export function AgriStore({ language }: { language: Language }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "address" | "payment" | "success">("cart");
  const [address, setAddress] = useState({ name: "", phone: "", address: "", pincode: "" });
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "upi" | "card">("cod");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });
  const [upiRef, setUpiRef] = useState("");
  const [userUpiId, setUserUpiId] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [showOrders, setShowOrders] = useState(false);

  const categories = ["All", "Fertilizer", "Pesticide", "Seeds", "Equipment"];

  const filteredProducts = sampleProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.nameTe.includes(searchTerm);
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 1000000)}`,
      date: new Date().toLocaleDateString(),
      items: [...cart],
      total: cartTotal,
      status: "Processing"
    };
    setOrders(prev => [newOrder, ...prev]);

    setCheckoutStep("success");
    setCart([]);
    setTimeout(() => {
      setCheckoutStep("cart");
      setShowCart(false);
      setAddress({ name: "", phone: "", address: "", pincode: "" });
      setPaymentMethod("cod");
      setUpiRef("");
      setUserUpiId("");
      setCardDetails({ number: "", expiry: "", cvv: "" });
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 relative">
      {/* Header and Cart Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-emerald-600" />
            {language === "te" ? "వ్యవసాయ మార్కెట్ (Agri Store)" : "AgriStore & Supplies"}
          </h1>
          <p className="text-slate-600 mt-2">
            {language === "te"
              ? "ఎరువులు, పురుగుమందులు, విత్తనాలు మరియు పనిముట్లను నేరుగా కొనుగోలు చేయండి."
              : "Buy authentic fertilizers, spray liquids, seeds, and equipment directly."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowOrders(true)}
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 md:px-6 py-3 rounded-xl font-bold transition flex items-center gap-2 shadow-sm"
          >
            <History className="w-5 h-5" />
            <span className="hidden sm:inline">{language === "te" ? "ఆర్డర్ హిస్టరీ" : "Orders"}</span>
          </button>
          <button
            onClick={() => setShowCart(true)}
            className="relative bg-emerald-600 hover:bg-emerald-700 text-white px-4 md:px-6 py-3 rounded-xl font-bold transition flex items-center gap-2 shadow-lg"
          >
          <ShoppingCart className="w-5 h-5" />
          {language === "te" ? "కార్ట్ చూడండి" : "View Cart"}
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder={language === "te" ? "ఉత్పత్తులను శోధించండి..." : "Search products..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-xl font-medium transition ${
                  selectedCategory === category
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {category === "All" && (language === "te" ? "అన్నీ" : "All")}
                {category === "Fertilizer" && (language === "te" ? "ఎరువులు" : "Fertilizers")}
                {category === "Pesticide" && (language === "te" ? "పురుగుమందులు" : "Pesticides")}
                {category === "Seeds" && (language === "te" ? "విత్తనాలు" : "Seeds")}
                {category === "Equipment" && (language === "te" ? "పనిముట్లు" : "Equipment")}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition group flex flex-col h-full">
            <div className="relative h-48 overflow-hidden bg-slate-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-white/90 backdrop-blur text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 flex items-center gap-1.5">
                  {product.category === "Fertilizer" && <Leaf className="w-3.5 h-3.5 text-emerald-600" />}
                  {product.category === "Pesticide" && <Droplet className="w-3.5 h-3.5 text-blue-500" />}
                  {product.category === "Seeds" && <Leaf className="w-3.5 h-3.5 text-amber-500" />}
                  {product.category === "Equipment" && <Tractor className="w-3.5 h-3.5 text-slate-600" />}
                  {product.category}
                </span>
              </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-800 text-lg leading-tight line-clamp-2">
                  {language === "te" ? product.nameTe : product.name}
                </h3>
              </div>
              <div className="flex items-center gap-1 mb-3">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold text-slate-700">{product.rating}</span>
              </div>
              <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-grow">
                {language === "te" ? product.descriptionTe : product.description}
              </p>
              
              <div className="pt-4 border-t border-slate-100 mt-auto">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <span className="text-2xl font-black text-slate-900">₹{product.price}</span>
                    <span className="text-sm text-slate-500 ml-1">/ {product.unit}</span>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  {language === "te" ? "కార్ట్‌కు జోడించు" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (          <div className="col-span-full py-12 text-center text-slate-500">            <Package className="w-16 h-16 mx-auto mb-4 text-slate-300" />            <p className="text-lg">{language === "te" ? "ఉత్పత్తులు కనుగొనబడలేదు." : "No products found."}</p>          </div>        )}      </div>
      
      
      {/* Orders Drawer / Modal overlay */}
      {showOrders && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowOrders(false)}></div>
          <div className="relative w-full max-w-lg bg-slate-50 h-full shadow-2xl flex flex-col animate-slide-in-right">
            <div className="p-6 border-b border-slate-200 bg-white flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <History className="w-7 h-7 text-emerald-600" />
                {language === "te" ? "మీ ఆర్డర్లు" : "Your Orders"}
              </h2>
              <button onClick={() => setShowOrders(false)} className="p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full transition shadow-sm">
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {orders.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500">
                  <Package className="w-24 h-24 text-slate-200 mb-4" />
                  <p className="text-xl font-medium">{language === "te" ? "ఆర్డర్లు లేవు" : "No orders yet"}</p>
                  <button 
                    onClick={() => {
                      setShowOrders(false);
                    }}
                    className="mt-6 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-6 py-2.5 rounded-full font-bold transition shadow-sm"
                  >
                    {language === "te" ? "షాపింగ్ ప్రారంభించండి" : "Start Shopping"}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                      <div className="p-4 bg-slate-100 border-b border-slate-200 flex flex-wrap justify-between items-center gap-2">
                        <div>
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Order ID</p>
                          <p className="font-mono font-bold text-slate-800">{order.id}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Date</p>
                          <p className="font-bold text-slate-800">{order.date}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Total</p>
                          <p className="font-bold text-emerald-700">₹{order.total}</p>
                        </div>
                      </div>
                      
                      <div className="p-5 border-b border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-slate-800">{language === "te" ? "డెలివరీ స్థితి" : "Delivery Status"}</h4>
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                            order.status === "Delivered" ? "bg-emerald-100 text-emerald-700" :
                            order.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                            "bg-amber-100 text-amber-700"
                          }`}>
                            {order.status === "Processing" && (language === "te" ? "ప్రోసెసింగ్" : "Processing")}
                            {order.status === "Shipped" && (language === "te" ? "రవాణా చేయబడింది" : "Shipped")}
                            {order.status === "Delivered" && (language === "te" ? "డెలివరీ అయింది" : "Delivered")}
                          </span>
                        </div>
                        
                        <div className="relative">
                          <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-200"></div>
                          
                          <div className="relative flex items-start gap-4 mb-4">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${
                              ["Processing", "Shipped", "Delivered"].includes(order.status) ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-400"
                            }`}>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <p className={`font-bold ${["Processing", "Shipped", "Delivered"].includes(order.status) ? "text-slate-800" : "text-slate-400"}`}>
                                {language === "te" ? "ఆర్డర్ ధృవీకరించబడింది" : "Order Confirmed"}
                              </p>
                              <p className="text-xs text-slate-500">Your order has been placed.</p>
                            </div>
                          </div>
                          
                          <div className="relative flex items-start gap-4 mb-4">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${
                              ["Shipped", "Delivered"].includes(order.status) ? "bg-blue-500 text-white" : "bg-slate-200 text-slate-400"
                            }`}>
                              <Truck className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <p className={`font-bold ${["Shipped", "Delivered"].includes(order.status) ? "text-slate-800" : "text-slate-400"}`}>
                                {language === "te" ? "రవాణా చేయబడింది" : "Shipped"}
                              </p>
                              <p className="text-xs text-slate-500">Package is on the way.</p>
                            </div>
                          </div>
                          
                          <div className="relative flex items-start gap-4">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${
                              order.status === "Delivered" ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-400"
                            }`}>
                              <MapPin className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <p className={`font-bold ${order.status === "Delivered" ? "text-slate-800" : "text-slate-400"}`}>
                                {language === "te" ? "డెలివరీ అయింది" : "Delivered"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Items</p>
                        <div className="space-y-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex gap-3">
                              <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover bg-white border border-slate-200" />
                              <div className="flex-1">
                                <p className="font-bold text-sm text-slate-800 line-clamp-1">{language === "te" ? item.product.nameTe : item.product.name}</p>
                                <div className="flex justify-between mt-1 text-xs text-slate-500">
                                  <span>Qty: {item.quantity}</span>
                                  <span className="font-bold text-slate-700">₹{item.product.price * item.quantity}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer / Modal overlay */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowCart(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-emerald-50">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <ShoppingCart className="w-7 h-7 text-emerald-600" />
                {checkoutStep === "cart" && (language === "te" ? "మీ కార్ట్" : "Your Cart")}
                {checkoutStep === "address" && (language === "te" ? "డెలివరీ వివరాలు" : "Delivery Details")}
                {checkoutStep === "payment" && (language === "te" ? "చెల్లింపు" : "Payment")}
                {checkoutStep === "success" && (language === "te" ? "విజయం" : "Success")}
              </h2>
              <button onClick={() => setShowCart(false)} className="p-2 text-slate-400 hover:text-slate-700 bg-white rounded-full transition shadow-sm">
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {checkoutStep === "success" ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                  <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-inner">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900">
                    {language === "te" ? "ఆర్డర్ విజయవంతమైంది!" : "Order Placed Successfully!"}
                  </h3>
                  <p className="text-slate-600">
                    {language === "te" 
                      ? "మీ వ్యవసాయ ఉత్పత్తులు త్వరలో డెలివరీ చేయబడతాయి. ధన్యవాదాలు!" 
                      : "Your agricultural supplies will be delivered soon. Thank you!"}
                  </p>
                </div>
              ) : checkoutStep === "address" ? (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-bold text-slate-800 mb-4">{language === "te" ? "డెలివరీ చిరునామా నమోదు చేయండి" : "Enter Delivery Address"}</h3>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{language === "te" ? "పూర్తి పేరు" : "Full Name"}</label>
                    <input type="text" value={address.name} onChange={e => setAddress({...address, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Enter your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{language === "te" ? "ఫోన్ నంబర్" : "Phone Number"}</label>
                    <input type="tel" value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="10-digit mobile number" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{language === "te" ? "పూర్తి చిరునామా (ఊరు/మండలం)" : "Full Address (Village/Mandal)"}</label>
                    <textarea value={address.address} onChange={e => setAddress({...address, address: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Door No, Street, Village..." rows={3}></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{language === "te" ? "పిన్‌కోడ్" : "Pincode"}</label>
                    <input type="text" value={address.pincode} onChange={e => setAddress({...address, pincode: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="e.g. 522001" />
                  </div>
                </div>
              ) : checkoutStep === "payment" ? (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="font-bold text-slate-800 mb-2">{language === "te" ? "చెల్లింపు పద్ధతి ఎంచుకోండి" : "Select Payment Method"}</h3>
                  
                  <div className="space-y-3">
                    <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition ${paymentMethod === "cod" ? "border-emerald-500 bg-emerald-50" : "border-slate-200"}`}>
                      <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} className="w-5 h-5 text-emerald-600 focus:ring-emerald-500" />
                      <span className="ml-3 font-medium text-slate-800">{language === "te" ? "క్యాష్ ఆన్ డెలివరీ (COD)" : "Cash on Delivery (COD)"}</span>
                    </label>
                    
                    <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition ${paymentMethod === "upi" ? "border-emerald-500 bg-emerald-50" : "border-slate-200"}`}>
                      <input type="radio" name="payment" value="upi" checked={paymentMethod === "upi"} onChange={() => setPaymentMethod("upi")} className="w-5 h-5 text-emerald-600 focus:ring-emerald-500" />
                      <span className="ml-3 font-medium text-slate-800">{language === "te" ? "UPI ఆన్‌లైన్ పేమెంట్ (Google Pay/PhonePe)" : "UPI Online Payment (GPay/PhonePe)"}</span>
                    </label>

                    <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition ${paymentMethod === "card" ? "border-emerald-500 bg-emerald-50" : "border-slate-200"}`}>
                      <input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} className="w-5 h-5 text-emerald-600 focus:ring-emerald-500" />
                      <span className="ml-3 font-medium text-slate-800">{language === "te" ? "డెబిట్ / క్రెడిట్ కార్డ్" : "Debit / Credit Card"}</span>
                    </label>
                  </div>

                  {paymentMethod === "upi" && (
                    <div className="mt-6 bg-[#f4f7fa] border border-slate-200 rounded-3xl overflow-hidden shadow-md">
                      {/* Top Header */}
                      <div className="pt-8 pb-4 text-center">
                        <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
                          Channamallu Lokesh 
                          <span className="bg-[#00baf2] text-white p-0.5 rounded-full">
                            <Check className="w-4 h-4" />
                          </span>
                        </h3>
                      </div>

                      {/* Card Content */}
                      <div className="px-6 pb-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border-[6px] border-[#00baf2]">
                          <div className="flex justify-center items-center mb-6">
                            <span className="text-[#002970] font-bold text-2xl tracking-tight mr-1">Paytm</span>
                            <span className="text-red-500 text-xl mx-1">❤</span>
                            <span className="text-slate-800 font-bold text-2xl italic">UPI</span>
                          </div>
                          
                          <div className="flex justify-center mb-6">
                            <img 
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("upi://pay?pa=9392121229@ptyes&pn=Channamallu Lokesh&am=" + cartTotal + "&cu=INR")}`} 
                              alt="Paytm UPI QR" 
                              className="w-full max-w-[224px] aspect-square" 
                            />
                          </div>
                        </div>

                        {/* Bottom Blue Section of Card */}
                        <div className="bg-[#002970] -mt-8 pt-10 pb-4 rounded-b-2xl flex justify-center text-white">
                          <div className="bg-white text-slate-800 px-6 py-2 rounded-full font-medium text-lg flex items-center gap-2 shadow-sm">
                            <span className="text-green-500">▶</span> 9392121229@ptyes
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="bg-slate-100 py-3 text-center border-t border-slate-200 text-sm font-medium text-slate-600 flex justify-center items-center gap-2">
                        Scan with any UPI app 
                        <span className="text-[#002970] font-bold">Paytm</span>
                        <span className="w-5 h-5 bg-purple-700 text-white rounded-full flex items-center justify-center text-[10px] font-bold">पे</span>
                        <span className="text-green-600 font-bold italic">BHIM</span>
                      </div>

                      {/* Input Section */}
                      <div className="p-6 bg-white border-t border-slate-200">
                        <div className="flex items-center gap-4 my-2 mb-6">
                          <div className="h-px bg-slate-200 flex-1"></div>
                          <span className="text-slate-400 text-sm font-medium">{language === "te" ? "లేదా" : "OR"}</span>
                          <div className="h-px bg-slate-200 flex-1"></div>
                        </div>

                        <div className="text-left">
                          <label className="block text-sm font-medium text-slate-700 mb-2">{language === "te" ? "మీ UPI ID నమోదు చేయండి" : "Enter your UPI ID"}</label>
                          <input 
                            type="text" 
                            value={userUpiId} 
                            onChange={e => setUserUpiId(e.target.value)} 
                            className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#00baf2] outline-none text-slate-800 mb-4 bg-slate-50" 
                            placeholder="e.g. mobile@upi" 
                          />
                          <label className="block text-sm font-medium text-slate-700 mb-2">{language === "te" ? "లావాదేవీ సంఖ్య (UTR / Txn ID)" : "Transaction Reference ID (UTR)"}</label>
                          <input 
                            type="text" 
                            value={upiRef} 
                            onChange={e => setUpiRef(e.target.value)} 
                            className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#00baf2] outline-none text-slate-800 bg-slate-50" 
                            placeholder="Enter 12-digit UTR number" 
                          />
                        </div>
                        <p className="text-xs text-slate-500 mt-4 text-center">
                          {language === "te" ? "గమనిక: డెలివరీకి 1 రోజు ముందు వరకు మాత్రమే ఆర్డర్ రద్దు చేయవచ్చు." : "Note: Orders can only be cancelled up to 1 day before delivery."}
                        </p>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="mt-6 p-5 bg-white border border-slate-200 rounded-xl space-y-4 shadow-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex -space-x-2">
                          <div className="w-8 h-8 rounded-full bg-red-500/80 mix-blend-multiply"></div>
                          <div className="w-8 h-8 rounded-full bg-yellow-500/80 mix-blend-multiply"></div>
                        </div>
                        <span className="font-bold text-slate-700 ml-2">Card Details</span>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{language === "te" ? "కార్డ్ నంబర్" : "Card Number"}</label>
                        <input 
                          type="text" 
                          value={cardDetails.number}
                          onChange={e => setCardDetails({...cardDetails, number: e.target.value.replace(/\D/g, '').slice(0, 16)})}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none" 
                          placeholder="0000 0000 0000 0000" 
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">{language === "te" ? "గడువు తేదీ" : "Expiry (MM/YY)"}</label>
                          <input 
                            type="text" 
                            value={cardDetails.expiry}
                            onChange={e => setCardDetails({...cardDetails, expiry: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none" 
                            placeholder="MM/YY" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">CVV</label>
                          <input 
                            type="password" 
                            value={cardDetails.cvv}
                            onChange={e => setCardDetails({...cardDetails, cvv: e.target.value.replace(/\D/g, '').slice(0, 3)})}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none" 
                            placeholder="123" 
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500">
                  <ShoppingCart className="w-24 h-24 text-slate-200 mb-4" />
                  <p className="text-xl font-medium">{language === "te" ? "కార్ట్ ఖాళీగా ఉంది" : "Your cart is empty"}</p>
                  <button 
                    onClick={() => setShowCart(false)}
                    className="mt-6 bg-slate-100 hover:bg-slate-200 text-slate-800 px-6 py-2.5 rounded-full font-bold transition shadow-sm"
                  >
                    {language === "te" ? "ఉత్పత్తులను బ్రౌజ్ చేయండి" : "Browse products"}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-4 border-b border-slate-100 pb-6 group">
                      <img src={item.product.image} alt={item.product.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover bg-slate-100 border border-slate-200 shadow-sm" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-slate-800 line-clamp-2">
                            {language === "te" ? item.product.nameTe : item.product.name}
                          </h4>
                          <div className="text-xs text-slate-500 mt-1">{item.product.unit}</div>
                        </div>
                        <div className="flex items-end justify-between mt-2">
                          <div className="font-black text-slate-900 text-lg">₹{item.product.price}</div>
                          <div className="flex items-center bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-slate-600 hover:bg-slate-200 font-bold transition"
                            >-</button>
                            <div className="w-10 text-center font-bold text-slate-800 text-sm">{item.quantity}</div>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-slate-600 hover:bg-slate-200 font-bold transition"
                            >+</button>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-rose-500 p-2 rounded-lg hover:bg-rose-50 self-start transition opacity-100 sm:opacity-0 group-hover:opacity-100"
                      >
                        <Plus className="w-5 h-5 rotate-45" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {checkoutStep !== "success" && cart.length > 0 && (
              <div className="p-6 border-t border-slate-200 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600 font-medium">{language === "te" ? "మొత్తం (Subtotal):" : "Subtotal:"}</span>
                  <span className="text-lg font-black text-slate-900">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-600 font-medium">{language === "te" ? "డెలివరీ (Delivery):" : "Delivery:"}</span>
                  <span className="text-emerald-600 font-bold">{language === "te" ? "ఉచితం (Free)" : "Free"}</span>
                </div>
                
                {checkoutStep === "cart" && (
                  <button
                    onClick={() => setCheckoutStep("address")}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
                  >
                    {language === "te" ? `కొనసాగించండి (Continue)` : `Continue to Delivery`}
                  </button>
                )}

                {checkoutStep === "address" && (
                  <div className="flex gap-3">
                    <button onClick={() => setCheckoutStep("cart")} className="px-6 py-4 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition">{language === "te" ? "వెనుకకు" : "Back"}</button>
                    <button
                      onClick={() => {
                        if(address.name && address.phone && address.address && address.pincode) {
                          setCheckoutStep("payment");
                        } else {
                          alert(language === "te" ? "దయచేసి అన్ని వివరాలను పూరించండి" : "Please fill all address details");
                        }
                      }}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
                    >
                      {language === "te" ? `కొనసాగించండి (Continue)` : `Continue to Payment`}
                    </button>
                  </div>
                )}

                {checkoutStep === "payment" && (
                  <div className="flex gap-3">
                    <button onClick={() => setCheckoutStep("address")} className="px-6 py-4 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition">{language === "te" ? "వెనుకకు" : "Back"}</button>
                    <button
                      onClick={() => {
                        if (paymentMethod === "upi" && !upiRef && !userUpiId) {
                          alert(language === "te" ? "దయచేసి UPI ID లేదా UTR నమోదు చేయండి" : "Please enter your UPI ID or UTR number");
                          return;
                        }
                        if (paymentMethod === "card" && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)) {
                          alert(language === "te" ? "దయచేసి కార్డ్ వివరాలను నమోదు చేయండి" : "Please enter all card details");
                          return;
                        }
                        handleCheckout();
                      }}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
                    >
                      {language === "te" ? `₹${cartTotal} చెల్లించండి (Place Order)` : `Place Order (₹${cartTotal})`}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
