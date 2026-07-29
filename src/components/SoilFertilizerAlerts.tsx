import React, { useState } from "react";
import { FarmerProfile, Language, NotificationItem } from "../types";
import {
  Sprout,
  Droplets,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Bot,
  BellRing,
  MapPin,
  TrendingUp,
  Layers,
  Calculator,
  ShieldCheck,
  Send,
  Zap,
  Sliders,
  ChevronRight,
  Info
} from "lucide-react";

interface SoilFertilizerAlertsProps {
  farmer: FarmerProfile;
  language: Language;
  onAddNotification?: (notification: NotificationItem) => void;
  onAskAi?: (query: string) => void;
  setActiveTab?: (tab: string) => void;
}

interface SoilTrendRecommendation {
  soilTypeKey: string;
  name: string;
  nameTe: string;
  regionalTrendAlert: string;
  regionalTrendAlertTe: string;
  deficiencies: string[];
  deficienciesTe: string[];
  optimalFertilizers: {
    name: string;
    nameTe: string;
    perAcreKg: number;
    timing: string;
    timingTe: string;
    purpose: string;
    purposeTe: string;
  }[];
  organicAmendments: string[];
  organicAmendmentsTe: string[];
  foliarSprays: string[];
  foliarSpraysTe: string[];
  avoidPractices: string[];
  avoidPracticesTe: string[];
}

const SOIL_RECOMMENDATIONS_DB: Record<string, SoilTrendRecommendation> = {
  "Black Cotton Soil": {
    soilTypeKey: "Black Cotton Soil",
    name: "Black Cotton Soil (నల్లరేగడి నేలలు)",
    nameTe: "నల్లరేగడి నేలలు (Black Cotton Soil)",
    regionalTrendAlert: "High Zinc & Iron chlorosis deficiency trend reported across Guntur & Krishna district Krishna river basin.",
    regionalTrendAlertTe: "గుంటూరు & కృష్ణా జిల్లా నల్లరేగడి నేలల్లో జింక్ మరియు ఇనుము (Iron) లోపం ఎక్కువగా వ్యక్తమవుతున్నట్లు హెచ్చరిక.",
    deficiencies: ["Zinc (Zn)", "Available Nitrogen", "Organic Carbon", "Free Iron aeration"],
    deficienciesTe: ["జింక్ లోపం", "లభ్య నత్రజని లోపం", "సేంద్రీయ కర్బనం తక్కువ", "గాలి ప్రసరణ లోపం"],
    optimalFertilizers: [
      {
        name: "Zinc Sulphate 21% (జింక్ సల్ఫేట్)",
        nameTe: "జింక్ సల్ఫేట్ 21% (Zinc Sulphate)",
        perAcreKg: 10,
        timing: "Basal application before sowing / transplanting",
        timingTe: "విత్తుటకు లేదా నాట్లకు ముందు బేసల్ డోస్‌గా",
        purpose: "Prevents leaf yellowing, stunting, and crop growth lag in high-clay soil.",
        purposeTe: "ఆకులు పసుపుపచ్చగా మారడం మరియు మొక్కల ఎదుగుదల లోపాన్ని నివారిస్తుంది."
      },
      {
        name: "Single Super Phosphate - SSP (సింగిల్ సూపర్ ఫాస్ఫేట్)",
        nameTe: "సింగిల్ సూపర్ ఫాస్ఫేట్ - SSP",
        perAcreKg: 75,
        timing: "At land preparation / basal dressing",
        timingTe: "దుక్కి తయారీ సమయంలో",
        purpose: "Provides Sulphur + Calcium to unlock bound Phosphorus in dense black clay.",
        purposeTe: "నల్లరేగడి నేలలో భాస్వరం సులభంగా మొక్కకు అందుబాటులోకి తెస్తుంది."
      },
      {
        name: "Neem Coated Urea + MOP Potash (వేపపూత యూరియా & పొటాష్)",
        nameTe: "వేపపూత యూరియా + పొటాష్ (Split Dose)",
        perAcreKg: 35,
        timing: "30 & 60 days after sowing in splits",
        timingTe: "30 మరియు 60 రోజుల వ్యవధిలో విడతల వారీగా",
        purpose: "Avoids high salt toxicity in soil while maintaining steady flower/pod development.",
        purposeTe: "నేలలో లవణ సాంద్రత పెరగకుండా పూత, కాయ అభివృద్ధికి తోడ్పడుతుంది."
      }
    ],
    organicAmendments: [
      "Farmyard Manure (FYM) @ 5 Tons/acre to improve soil aeration",
      "Trichoderma viride (2kg/acre) mixed with 100kg FYM against root rot"
    ],
    organicAmendmentsTe: [
      "నేల గాలి ప్రసరణకు ఎకరాకు 5 టన్నుల పశువుల ఎరువు",
      "వేరుకుళ్ళు నివారణకు ట్రైకోడెర్మా విరిడే (2కిలోలు/ఎకరా) పశువుల ఎరువులో కలిపి వేయాలి"
    ],
    foliarSprays: [
      "Chelated Zinc (1g/L) + Ferrous Sulphate (2g/L) during active vegetative stage"
    ],
    foliarSpraysTe: [
      "శాఖీయ దశలో చీలేటెడ్ జింక్ (1గ్రా/లీ) + అన్నభేది/ఫెర్రస్ సల్ఫేట్ (2గ్రా/లీ) పిచికారీ"
    ],
    avoidPractices: [
      "Avoid applying DAP and Zinc Sulphate together in the same mix (causes chemical precipitation)",
      "Avoid excess flooding during dry spell to prevent soil hardening cracks"
    ],
    avoidPracticesTe: [
      "DAP మరియు జింక్ సల్ఫేట్‌లను ఒకేసారి కలిపి చల్లవద్దు (అవి రసాయనికంగా నిష్క్రియం అవుతాయి)",
      "ఎండిపోయిన నల్లరేగడి నేలలో ఒక్కసారిగా ఎక్కువ నీటి ముంపు ఇవ్వకండి"
    ]
  },
  "Red Loamy Soil": {
    soilTypeKey: "Red Loamy Soil",
    name: "Red Loamy Soil (ఎర్ర లొమ్ము నేలలు)",
    nameTe: "ఎర్ర లొమ్ము నేలలు (Red Loamy Soil)",
    regionalTrendAlert: "High Nitrogen & Potash leaching trend due to rain run-off in Prakasam, Rayalaseema & Chittoor belts.",
    regionalTrendAlertTe: "ప్రకాశం, రాయలసీమ మరియు చిత్తూరు ప్రాంత ఎర్ర నేలల్లో వర్షపు నీటి కొట్టుకుపోవుట వలన నత్రజని, పొటాష్ లీచింగ్ హెచ్చరిక.",
    deficiencies: ["Nitrogen (N)", "Potassium (K)", "Calcium & Boron"],
    deficienciesTe: ["నత్రజని లోపం", "పొటాషియం లోపం", "కాల్షియం & బోరాన్ లోపం"],
    optimalFertilizers: [
      {
        name: "Neem Coated Urea (వేపపూత యూరియా - 4 Splits)",
        nameTe: "వేపపూత యూరియా (Neem Coated Urea)",
        perAcreKg: 25,
        timing: "Every 20 days in 4 micro-splits",
        timingTe: "ప్రతి 20 రోజులకు ఒకసారి 4 విడతలుగా",
        purpose: "Prevents rapid Nitrogen leaching through porous sandy-red profile.",
        purposeTe: "ఎర్ర నేలలో నత్రజని నీటితో పాటు కొట్టుకుపోకుండా కాపాడుతుంది."
      },
      {
        name: "Gypsum (జిప్సం - Calcium & Sulphur)",
        nameTe: "జిప్సం (Gypsum - 100kg/acre)",
        perAcreKg: 100,
        timing: "At final plowing / 30 DAP",
        timingTe: "చివరి దుక్కిలో లేదా 30 రోజుల వద్ద",
        purpose: "Enriches Calcium and Sulphur for oilseed, chilli and groundnut pod density.",
        purposeTe: "మిర్చి, వేరుశనగ పంటలలో కాయ నాణ్యత, నూనె శాతాన్ని పెంచుతుంది."
      },
      {
        name: "Muriate of Potash - MOP (పొటాష్ 0-0-60)",
        nameTe: "MOP పొటాష్ (Muriate of Potash)",
        perAcreKg: 20,
        timing: "Flowering & Fruit initiation",
        timingTe: "పూత మరియు పిందె దశలలో",
        purpose: "Improves drought resistance and grain/fruit skin glossiness.",
        purposeTe: "వర్షాభావ పరిస్థితులను తట్టుకుని పంట ఊట, రంగును పెంచుతుంది."
      }
    ],
    organicAmendments: [
      "Vermicompost @ 1.5 Tons/acre to boost moisture retention",
      "Azospirillum & PSB bio-fertilizers @ 2kg/acre"
    ],
    organicAmendmentsTe: [
      "తేమను పట్టి ఉంచేందుకు ఎకరాకు 1.5 టన్నుల వర్మీకంపోస్ట్",
      "అజోస్పిరిల్లమ్ & ఫాస్ఫోబాక్టీరియా జీవ ఎరువులు (2కిలోలు/ఎకరా)"
    ],
    foliarSprays: [
      "Boron 20% (1.5g/L) during flowering to prevent blossom drop"
    ],
    foliarSpraysTe: [
      "పూత రాలకుండా పూత దశలో బోరాన్ 20% (1.5గ్రా/లీ) స్ప్రే"
    ],
    avoidPractices: [
      "Do not apply full Nitrogen dose at once; 70% gets leached into deep soil layers",
      "Do not skip potash during pod formation"
    ],
    avoidPracticesTe: [
      "మొత్తం యూరియా ఒకేసారి చల్లవద్దు; నేలలో ఇంకిపోయి వృథా అవుతుంది",
      "కాయ ఊట దశలో పొటాష్ ఎరువును నిర్లక్ష్యం చేయకండి"
    ]
  },
  "Sandy Loam": {
    soilTypeKey: "Sandy Loam",
    name: "Sandy Loam (ఇసుక లొమ్ము నేలలు)",
    nameTe: "ఇసుక లొమ్ము నేలలు (Sandy Loam)",
    regionalTrendAlert: "Fast nutrient drainage & low organic carbon alert across coastal sandy farming patches.",
    regionalTrendAlertTe: "కోస్తా తీర ప్రాంత ఇసుక లొమ్ము నేలల్లో పోషకాలు త్వరితగతిన కరిగిపోవడం మరియు సేంద్రీయ లోపం హెచ్చరిక.",
    deficiencies: ["Organic Carbon", "Potassium", "Micronutrient mixture"],
    deficienciesTe: ["సేంద్రీయ కర్బనం", "పొటాషియం", "సూక్ష్మ పోషకాల మిశ్రమం"],
    optimalFertilizers: [
      {
        name: "19-19-19 Water Soluble NPK (19-19-19 ఎరువు)",
        nameTe: "19-19-19 నీటిలో కరిగే ఎరువు",
        perAcreKg: 5,
        timing: "Weekly via drip or foliar spray",
        timingTe: "డ్రిప్ ద్వారా లేదా వారానికి ఒకసారి స్ప్రే",
        purpose: "Delivers 100% bio-available balanced nutrients directly to fibrous roots.",
        purposeTe: "వేర్ల వ్యవస్థకు తక్షణ సమతుల్య పోషకాలను అందిస్తుంది."
      },
      {
        name: "Humic Acid 98% (హ్యూమిక్ యాసిడ్)",
        nameTe: "హ్యూమిక్ యాసిడ్ 98% (Humic Acid)",
        perAcreKg: 1,
        timing: "Drenching / fertigation at 15 & 45 days",
        timingTe: "మొదళ్ళలో తడి లేదా డ్రిప్ ద్వారా 15, 45 రోజులలో",
        purpose: "Binds sandy particles and dramatically increases nutrient retention (CEC).",
        purposeTe: "ఇసుక రేణువులను బంధించి ఎరువుల నష్టాన్ని అరికడుతుంది."
      }
    ],
    organicAmendments: [
      "Compost / Green Manure (Sunnhemp/Pillipesara) incorporated 20 days prior"
    ],
    organicAmendmentsTe: [
      "విత్తుటకు 20 రోజుల ముందు జనుము / పిల్లిపెసర పచ్చిరొట్ట ఎరువు తొక్కి చొప్పించాలి"
    ],
    foliarSprays: [
      "Grade-2 Micronutrient spray (3g/L) every 25 days"
    ],
    foliarSpraysTe: [
      "ప్రతి 25 రోజులకు గ్రేడ్-2 సూక్ష్మపోషకాల మిశ్రమం (3గ్రా/లీ) స్ప్రే"
    ],
    avoidPractices: [
      "Avoid flood irrigation; causes complete washing of topsoil fertilizers"
    ],
    avoidPracticesTe: [
      "పావురం నీటి పారుదల వద్దండి; చల్లిన ఎరువులన్నీ కొట్టుకుపోతాయి"
    ]
  },
  "Clay Soil": {
    soilTypeKey: "Clay Soil",
    name: "Clay Soil (బంకమన్ను నేలలు)",
    nameTe: "బంకమన్ను నేలలు (Clay Soil)",
    regionalTrendAlert: "Poor internal drainage & high waterlogging compaction alert in lowland delta pockets.",
    regionalTrendAlertTe: "పల్లపు డెల్టా ప్రాంత బంకమన్ను నేలల్లో నీరు నిల్వ ఉండి వేరుకుళ్ళు మరియు ఆక్సిజన్ కొరత హెచ్చరిక.",
    deficiencies: ["Soil Aeration", "Phosphorus availability", "Sulphur"],
    deficienciesTe: ["గాలి ప్రసరణ", "భాస్వర లభ్యత", "సల్ఫర్ లోపం"],
    optimalFertilizers: [
      {
        name: "Sulphur 90% WDG (సల్ఫర్ 90%)",
        nameTe: "సల్ఫర్ 90% WDG (Sulphur)",
        perAcreKg: 3,
        timing: "Soil application with first top dress",
        timingTe: "మొదటి విడత ఎరువులతో పాటు",
        purpose: "Improves soil porosity, lowers toxic sodium levels, and combats root fungi.",
        purposeTe: "నేల గుల్లబారడానికి మరియు వేరు శిలీంధ్రాలను నివారించడానికి తోడ్పడుతుంది."
      }
    ],
    organicAmendments: [
      "Coir Pith / Pressmud @ 2 Tons/acre to break dense clay crust"
    ],
    organicAmendmentsTe: [
      "బంకమన్ను పొరలను సడలించడానికి కొబ్బరి పొట్టు / ప్రెస్ మడ్ 2 టన్నులు"
    ],
    foliarSprays: [
      "13-0-45 Potassium Nitrate (10g/L) during pod development"
    ],
    foliarSpraysTe: [
      "కాయ ఊట దశలో 13-0-45 పొటాషియం నైట్రేట్ (10గ్రా/లీ) పిచికారీ"
    ],
    avoidPractices: [
      "Never walk or operate heavy tractors in wet clay soil to prevent severe soil compaction"
    ],
    avoidPracticesTe: [
      "నేల తడిగా ఉన్నప్పుడు ట్రాక్టర్లు తిప్పవద్దు; గుల్లతనం పూర్తిగా దెబ్బతింటుంది"
    ]
  },
  "Alluvial Soil": {
    soilTypeKey: "Alluvial Soil",
    name: "Alluvial Soil (ఒండ్రు నేలలు)",
    nameTe: "ఒండ్రు నేలలు (Alluvial Soil)",
    regionalTrendAlert: "Potassium depletion trend observed due to intensive double-cropping paddy/maize.",
    regionalTrendAlertTe: "వరి/మొక్కజొన్న పంటల తీవ్ర సాగు వలన ఒండ్రు నేలల్లో పొటాషియం పోషకాల క్షీణత హెచ్చరిక.",
    deficiencies: ["Potassium", "Zinc", "Sulphur"],
    deficienciesTe: ["పొటాషియం క్షీణత", "జింక్", "సల్ఫర్"],
    optimalFertilizers: [
      {
        name: "Complex NPK 20-20-0-13 (20-20-0-13 కాంప్లెక్స్)",
        nameTe: "20-20-0-13 కాంప్లెక్స్ ఎరువు",
        perAcreKg: 50,
        timing: "Basal dressing at transplanting",
        timingTe: "నాట్ల సమయంలో బేసల్ డోస్‌గా",
        purpose: "Provides balanced Nitrogen, Phosphorus & Sulphur for rapid tillering.",
        purposeTe: "మంచి పిలకల సంఖ్య మరియు వేగవంతమైన ఎదుగుదలకు తోడ్పడుతుంది."
      }
    ],
    organicAmendments: [
      "Bio-fertilizers Azotobacter & VAM (Vesicular Arbuscular Mycorrhiza) @ 3kg/acre"
    ],
    organicAmendmentsTe: [
      "వేరు వ్యవస్థ బలానికి VAM ఫంగస్ & అజోటోబాక్టర్ (3కిలోలు/ఎకరా)"
    ],
    foliarSprays: [
      "0-0-50 Sulphate of Potash (10g/L) for heavy grain weight"
    ],
    foliarSpraysTe: [
      "గింజ బరువు, ఊట పెరగడానికి 0-0-50 సల్ఫేట్ ఆఫ్ పొటాష్ (10గ్రా/లీ) పిచికారీ"
    ],
    avoidPractices: [
      "Avoid burning crop stubble; incorporate paddy straw back into alluvial soil"
    ],
    avoidPracticesTe: [
      "వరి కోతల తర్వాత వ్యర్థాలను తగలేయవద్దు; భూమిలోనే కుళ్ళింపచేయండి"
    ]
  },
  "Laterite Soil": {
    soilTypeKey: "Laterite Soil",
    name: "Laterite Soil (లేటరైట్ నేలలు)",
    nameTe: "లేటరైట్ నేలలు (Laterite Soil)",
    regionalTrendAlert: "High soil acidity (pH < 5.8) locking applied Phosphate fertilizers in upland regions.",
    regionalTrendAlertTe: "మెట్ట ప్రాంత లేటరైట్ నేలల్లో ఆమ్ల గుణం (pH < 5.8) వలన భాస్వరం లభించక పంట కుంగిపోయే హెచ్చరిక.",
    deficiencies: ["Available Phosphorus", "Calcium & Magnesium", "Molybdenum"],
    deficienciesTe: ["లభ్య భాస్వరం లోపం", "కాల్షియం & మెగ్నీషియం", "మోలిబ్డినం"],
    optimalFertilizers: [
      {
        name: "Agricultural Lime / Dolomite (సున్నం / డోలమైట్)",
        nameTe: "వ్యవసాయ సున్నం / డోలమైట్ (Lime/Dolomite)",
        perAcreKg: 150,
        timing: "Broadcast 20 days prior to sowing",
        timingTe: "విత్తుటకు 20 రోజుల ముందు చల్లాలి",
        purpose: "Neutralizes acidic soil pH and prevents iron toxicity in roots.",
        purposeTe: "ఆమ్ల గుణాన్ని తగ్గించి భాస్వరం మొక్కలకు లభ్యమయ్యేలా చేస్తుంది."
      }
    ],
    organicAmendments: [
      "Rock Phosphate (100kg/acre) mixed with Vermicompost"
    ],
    organicAmendmentsTe: [
      "వర్మీకంపోస్ట్‌తో కలిపిన రాక్ ఫాస్ఫేట్ (100కిలోలు/ఎకరా)"
    ],
    foliarSprays: [
      "19-19-19 (5g/L) + Magnesium Sulphate (5g/L)"
    ],
    foliarSpraysTe: [
      "19-19-19 (5గ్రా/లీ) + మెగ్నీషియం సల్ఫేట్ (5గ్రా/లీ) పిచికారీ"
    ],
    avoidPractices: [
      "Do not use acidic fertilizers like Ammonium Sulphate in raw acidic laterite soil"
    ],
    avoidPracticesTe: [
      "ఆమ్ల గుణం గల నేలలో అమ్మోనియం సల్ఫేట్ వంటి ఎరువులను నేరుగా చల్లవద్దు"
    ]
  }
};

export const SoilFertilizerAlerts: React.FC<SoilFertilizerAlertsProps> = ({
  farmer,
  language,
  onAddNotification,
  onAskAi,
  setActiveTab
}) => {
  const [selectedSoilKey, setSelectedSoilKey] = useState<string>(
    farmer.soilType || "Black Cotton Soil"
  );
  const [copiedToast, setCopiedToast] = useState<string | null>(null);

  const soilRec =
    SOIL_RECOMMENDATIONS_DB[selectedSoilKey] ||
    SOIL_RECOMMENDATIONS_DB["Black Cotton Soil"];

  const landAcres = farmer.landAreaAcres || 4.5;

  const handleDispatchProactiveAlert = (fertName: string, fertDoseKg: number) => {
    const totalKg = Math.round(fertDoseKg * landAcres);
    const title = language === "te" ? `🌱 ${soilRec.nameTe} ఎరువుల హెచ్చరిక` : `🌱 Proactive Soil Alert: ${soilRec.name}`;
    const titleTe = `🌱 ${soilRec.nameTe} ఎరువుల హెచ్చరిక`;
    const message = `Based on regional trends for ${soilRec.name} in ${farmer.district}, apply ${totalKg}kg of ${fertName} for your ${landAcres} acres. ${soilRec.regionalTrendAlert}`;
    const messageTe = `${farmer.district} జిల్లా ${soilRec.nameTe} ప్రాంతీయ హెచ్చరిక: మీ ${landAcres} ఎకరాలకు ${totalKg}కిలోల ${fertName} బేసల్ డోస్‌గా అందించండి. ${soilRec.regionalTrendAlertTe}`;

    const newNotif: NotificationItem = {
      id: `soil-alert-${Date.now()}`,
      title,
      titleTe,
      message,
      messageTe,
      type: "soil",
      timestamp: "Just Now",
      read: false,
      soilTypeTag: soilRec.soilTypeKey,
      fertilizerDose: `${totalKg} kg (${fertName}) for ${landAcres} acres`,
      actionableQuery: `Explain dosage application steps for ${fertName} (${totalKg}kg) in ${soilRec.name} for ${farmer.primaryCrop || "Chilli/Paddy"}.`
    };

    if (onAddNotification) {
      onAddNotification(newNotif);
    }

    setCopiedToast(
      language === "te"
        ? `✅ మీ అలర్ట్ సెంటర్‌లో హెచ్చరిక నవీకరించబడింది! (${totalKg}కిలోల ఎరువుల ప్లాన్)`
        : `✅ Proactive Soil Alert dispatched to Notification Center! (${totalKg} kg requirement)`
    );
    setTimeout(() => setCopiedToast(null), 4000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6 text-slate-900">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-800 to-teal-900 text-amber-300 flex items-center justify-center shrink-0 shadow-sm">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                {language === "te" ? "నేల రకం ఆధారిత ప్రొయాక్టివ్ ఎరువుల హెచ్చరికలు" : "Proactive Soil-Based Fertilizer Advisory"}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-[10px] font-extrabold uppercase tracking-wide">
                {language === "te" ? "ప్రాంతీయ సమాచారం" : "Regional Trends Sync"}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              {language === "te"
                ? `మీ ప్రొఫైల్ నేల: '${farmer.soilType}' | ప్రాంతం: ${farmer.district}, ${farmer.mandal} | విస్తీర్ణం: ${landAcres} ఎకరాలు.`
                : `Tailored for stored Profile Soil: '${farmer.soilType}' in ${farmer.district} (${landAcres} Acres).`}
            </p>
          </div>
        </div>

        {/* Dynamic Soil Type Selector */}
        <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <Layers className="w-4 h-4 text-emerald-700 ml-2 shrink-0" />
          <select
            value={selectedSoilKey}
            onChange={(e) => setSelectedSoilKey(e.target.value)}
            className="bg-white border border-slate-300 text-slate-900 text-xs font-bold rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            {Object.keys(SOIL_RECOMMENDATIONS_DB).map((key) => (
              <option key={key} value={key}>
                {language === "te" ? SOIL_RECOMMENDATIONS_DB[key].nameTe : SOIL_RECOMMENDATIONS_DB[key].name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Copied Toast Banner */}
      {copiedToast && (
        <div className="bg-emerald-900 text-white px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between shadow-md animate-bounce">
          <div className="flex items-center space-x-2">
            <BellRing className="w-4 h-4 text-amber-300 shrink-0" />
            <span>{copiedToast}</span>
          </div>
          <button
            onClick={() => setCopiedToast(null)}
            className="text-amber-200 hover:underline text-xs font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Regional Trend Alert Card */}
      <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-emerald-500/10 border-2 border-amber-400/60 rounded-2xl p-5 space-y-3 relative overflow-hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-200 text-amber-950 px-2 py-0.5 rounded">
                  {language === "te" ? "తక్షణ ప్రాంతీయ ట్రెండ్ హెచ్చరిక" : "Current Regional Trend Alert"}
                </span>
                <span className="text-xs text-slate-500 font-semibold">• {farmer.district} Belt</span>
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mt-1">
                {language === "te" ? soilRec.regionalTrendAlertTe : soilRec.regionalTrendAlert}
              </h3>
            </div>
          </div>
        </div>

        {/* Identified Deficiencies Pills */}
        <div className="pt-2 border-t border-amber-200/80 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-amber-950 flex items-center space-x-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>{language === "te" ? "ఈ నేలలో గుర్తించిన లోపాలు:" : "Identified Soil Deficiencies:"}</span>
          </span>
          {(language === "te" ? soilRec.deficienciesTe : soilRec.deficiencies).map((def, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 bg-white border border-amber-300 text-amber-900 font-semibold text-[11px] rounded-lg shadow-2xs"
            >
              ⚠️ {def}
            </span>
          ))}
        </div>
      </div>

      {/* Fertilizer Dosage & Actionable Recommendations Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-sm sm:text-base text-slate-900">
              {language === "te"
                ? `సిఫార్సు చేసిన ఎరువులు & మోతాదు లెక్క (${landAcres} ఎకరాలకు)`
                : `Optimal Fertilizer Types & Dosage Calculation (${landAcres} Acres)`}
            </h3>
          </div>

          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">
            {language === "te" ? `మొత్తం ల్యాండ్: ${landAcres} ఎకరాలు` : `Land Size: ${landAcres} Acres`}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {soilRec.optimalFertilizers.map((fert, idx) => {
            const totalKgForFarm = Math.round(fert.perAcreKg * landAcres);
            const totalBags50kg = (totalKgForFarm / 50).toFixed(1);

            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 hover:border-emerald-400 rounded-2xl p-4 shadow-xs space-y-3 flex flex-col justify-between transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">
                      {language === "te" ? fert.nameTe : fert.name}
                    </h4>
                    <span className="bg-emerald-100 text-emerald-900 text-[10px] font-black px-2 py-0.5 rounded shrink-0">
                      {fert.perAcreKg} kg/acre
                    </span>
                  </div>

                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1 text-xs">
                    <div className="flex items-center justify-between font-bold text-emerald-950">
                      <span>{language === "te" ? "మీ ఫారమ్ లెక్కింపు:" : "Calculated Total Dose:"}</span>
                      <span className="text-emerald-800 font-extrabold text-sm">
                        {totalKgForFarm} kg ({totalBags50kg} Bags)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-tight">
                      <span className="font-semibold text-slate-800">{language === "te" ? "సమయం: " : "Timing: "}</span>
                      {language === "te" ? fert.timingTe : fert.timing}
                    </p>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {language === "te" ? fert.purposeTe : fert.purpose}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <button
                    onClick={() => handleDispatchProactiveAlert(fert.name, fert.perAcreKg)}
                    className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <BellRing className="w-3.5 h-3.5 text-amber-300" />
                    <span>{language === "te" ? "నోటిఫికేషన్‌గా పంపు" : "Dispatch Proactive Alert"}</span>
                  </button>

                  {onAskAi && (
                    <button
                      onClick={() => {
                        const query = `How and when should I apply ${fert.name} (${totalKgForFarm}kg for ${landAcres} acres) in ${soilRec.name} for ${farmer.primaryCrop || "Chilli"}? Give step by step timing.`;
                        onAskAi(query);
                        if (setActiveTab) setActiveTab("ai-assistant");
                      }}
                      className="w-full py-1.5 bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 border border-slate-200 rounded-xl text-[11px] font-semibold transition flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <Bot className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{language === "te" ? "AI ని ప్రణాళిక అడుగు" : "Ask AI Application Steps"}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Organic Amendments & Foliar Sprays Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Organic Soil Care */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
          <div className="flex items-center space-x-2 text-emerald-900 font-bold text-xs sm:text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>{language === "te" ? "సేంద్రీయ నేల పోషణ సిఫార్సులు" : "Organic Soil Amendments & Bio-Fertilizers"}</span>
          </div>

          <ul className="space-y-2 text-xs text-slate-800">
            {(language === "te" ? soilRec.organicAmendmentsTe : soilRec.organicAmendments).map((item, i) => (
              <li key={i} className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Foliar & Micronutrients */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
          <div className="flex items-center space-x-2 text-emerald-900 font-bold text-xs sm:text-sm">
            <Droplets className="w-4 h-4 text-emerald-700" />
            <span>{language === "te" ? "సూక్ష్మ పోషకాల ఆకులపై పిచికారీ" : "Recommended Micronutrient Foliar Sprays"}</span>
          </div>

          <ul className="space-y-2 text-xs text-slate-800">
            {(language === "te" ? soilRec.foliarSpraysTe : soilRec.foliarSprays).map((item, i) => (
              <li key={i} className="flex items-start space-x-2">
                <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Practices to Avoid Warning Card */}
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 space-y-2">
        <div className="flex items-center space-x-2 text-rose-900 font-bold text-xs sm:text-sm">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{language === "te" ? "ఈ నేలలో తప్పక నివారించవలసిన తప్పులు:" : "Critical Mistakes to Avoid for this Soil Type:"}</span>
        </div>

        <ul className="space-y-1.5 text-xs text-rose-950 font-medium pl-6 list-disc">
          {(language === "te" ? soilRec.avoidPracticesTe : soilRec.avoidPractices).map((practice, i) => (
            <li key={i}>{practice}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
