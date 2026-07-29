import React, { useState } from "react";
import { FarmerProfile, Language, WeatherDay } from "../types";
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sprout,
  Droplets,
  Zap,
  ChevronRight,
  Sparkles,
  Bot,
  Bell,
  Check,
  Edit3,
  CalendarDays,
  ShieldAlert,
  Sliders,
  Filter,
  ArrowRight
} from "lucide-react";

interface CropCalendarProps {
  farmer: FarmerProfile;
  language: Language;
  weather?: WeatherDay;
  onUpdateSowingDetails?: (crop: string, sowingDate: string) => void;
  onAskAi?: (query: string) => void;
  setActiveTab?: (tab: string) => void;
}

interface CropStage {
  id: string;
  stageName: string;
  stageNameTe: string;
  startDay: number; // Days after sowing
  endDay: number;
  category: "planting" | "fertilizing" | "irrigation" | "pest" | "harvesting";
  actionText: string;
  actionTextTe: string;
  fertilizerDetails?: string;
  fertilizerDetailsTe?: string;
  isCritical?: boolean;
}

// Preset crop lifecycle definitions
const CROP_PRESETS: Record<
  string,
  {
    name: string;
    nameTe: string;
    totalDays: number;
    stages: CropStage[];
  }
> = {
  Chilli: {
    name: "Red Chilli (మిరప)",
    nameTe: "ఎర్ర మిరప (Red Chilli)",
    totalDays: 150,
    stages: [
      {
        id: "ch1",
        stageName: "Nursery & Seed Treatment",
        stageNameTe: "నార్ల పెంపకం & విత్తన శుద్ధి",
        startDay: 0,
        endDay: 15,
        category: "planting",
        actionText: "Treat seeds with Trichoderma viride (10g/kg) and sow in raised beds with shade net.",
        actionTextTe: "ట్రైకోడెర్మా విరిడే (10గ్రా/కిలో) తో విత్తన శుద్ధి చేసి, ఎత్తైన మడులలో నారు పోయండి.",
        isCritical: true
      },
      {
        id: "ch2",
        stageName: "Main Field Transplanting & Basal Dose",
        stageNameTe: "నాట్లు వేయడం & ప్రారంభ బేసల్ ఎరువులు",
        startDay: 20,
        endDay: 35,
        category: "planting",
        actionText: "Transplant 35-day seedlings at 60x45cm spacing. Apply 50kg DAP + 25kg MOP per acre.",
        actionTextTe: "35 రోజుల నారును 60x45 సెం.మీ దూరంలో నాటండి. ఎకరాకు 50కిలోల DAP + 25కిలోల MOP వేయండి.",
        fertilizerDetails: "Basal: 50kg DAP + 25kg MOP + 10 ton FYM/acre",
        fertilizerDetailsTe: "బేసల్ ఎరువు: 50కిలోల DAP + 25కిలోల MOP + 10 టన్నుల పశువుల ఎరువు/ఎకరా",
        isCritical: true
      },
      {
        id: "ch3",
        stageName: "1st Top Dressing & Intercultivation",
        stageNameTe: "మొదటి విడత ఎరువులు & కలుపు తీత",
        startDay: 40,
        endDay: 55,
        category: "fertilizing",
        actionText: "Apply 35kg Urea + 15kg Potash (MOP) per acre near root zone. Perform light weeding.",
        actionTextTe: "ఎకరాకు 35కిలోల యూరియా + 15కిలోల పొటాష్ వేసి మట్టి దున్నండి. కలుపు తీయండి.",
        fertilizerDetails: "1st Dose: 35kg Urea + 15kg MOP/acre",
        fertilizerDetailsTe: "1వ విడత: 35కిలోల యూరియా + 15కిలోల MOP/ఎకరా",
        isCritical: true
      },
      {
        id: "ch4",
        stageName: "Thrips & Mite Pest Protection",
        stageNameTe: "తామర పురుగులు & నల్లి నివారణ స్ప్రే",
        startDay: 60,
        endDay: 75,
        category: "pest",
        actionText: "Spray Fipronil 5% SC @ 2ml/L or Neem Oil 10,000 ppm to control Chilli Thrips & Curling.",
        actionTextTe: "తామర పురుగులు, ఆకు ముడుత నివారణకు ఫిప్రోనిల్ 5% SC (2మి.లీ/లీ) లేదా వేప నూనె పిచికారీ చేయండి.",
        isCritical: true
      },
      {
        id: "ch5",
        stageName: "2nd Top Dressing & Flowering Boost",
        stageNameTe: "2వ విడత ఎరువులు & పూత రాలకుండా స్ప్రే",
        startDay: 80,
        endDay: 95,
        category: "fertilizing",
        actionText: "Apply 30kg Urea + 20kg Potash. Spray Planofix (Alpha NAA) @ 1ml/4.5L to prevent flower drop.",
        actionTextTe: "30కిలోల యూరియా + 20కిలోల పొటాష్ వేయండి. పూత రాలకుండా ప్లానోఫిక్స్ స్ప్రే చేయండి.",
        fertilizerDetails: "2nd Dose: 30kg Urea + 20kg MOP + Micronutrient Mixture (2g/L)",
        fertilizerDetailsTe: "2వ విడత: 30కిలోల యూరియా + 20కిలోల MOP + మైక్రోన్యూట్రియెంట్ స్ప్రే",
        isCritical: false
      },
      {
        id: "ch6",
        stageName: "Fruit Borer Protection & Pod Development",
        stageNameTe: "కాయ తొలచు పురుగు నివారణ & కాయ సైజు పెంపు",
        startDay: 100,
        endDay: 120,
        category: "pest",
        actionText: "Spray Chlorantraniliprole 18.5% SC @ 0.3ml/L. Maintain light soil moisture for heavy yield.",
        actionTextTe: "కాయ తొలచు పురుగుకు క్లోరాంట్రానిలిప్రోల్ (0.3మి.లీ/లీ) స్ప్రే చేయండి. పొలంలో పదును ఉంచండి.",
        isCritical: false
      },
      {
        id: "ch7",
        stageName: "1st Green/Red Chilli Harvesting & Drying",
        stageNameTe: "మొదటి దఫా కోత & ఎండబెట్టడం",
        startDay: 130,
        endDay: 150,
        category: "harvesting",
        actionText: "Harvest mature deep red pods in morning. Spread on clean tarpaulin tarps for sun drying.",
        actionTextTe: "బాగా పండిన ఎర్ర మిరపకాయలను కోసి, కాటన్/తార్పాలిన్ పరదాలపై ఎండబెట్టండి.",
        isCritical: true
      }
    ]
  },
  Paddy: {
    name: "Paddy / Rice (వరి)",
    nameTe: "వరి (Paddy / Rice)",
    totalDays: 135,
    stages: [
      {
        id: "pa1",
        stageName: "Nursery Sowing & Water Management",
        stageNameTe: "వరి నారుమడి చల్లడం & నీటి యాజమాన్యం",
        startDay: 0,
        endDay: 15,
        category: "planting",
        actionText: "Sow pre-sprouted seeds in nursery bed. Maintain thin film of water (2cm).",
        actionTextTe: "మొలకెత్తిన విత్తనాలను నారుమడిలో చల్లండి. 2 సెం.మీ నీటి పదును నిర్వహించండి.",
        isCritical: true
      },
      {
        id: "pa2",
        stageName: "Transplanting & Basal Fertilizer",
        stageNameTe: "వరి నాట్లు & ప్రారంభ కాంప్లెక్స్ ఎరువులు",
        startDay: 20,
        endDay: 30,
        category: "planting",
        actionText: "Transplant 25-day seedlings at 20x15cm spacing. Apply 50kg DAP + 10kg Zinc Sulphate per acre.",
        actionTextTe: "25 రోజుల నారు నాటండి. ఎకరాకు 50కిలోల DAP + 10కిలోల జింక్ సల్ఫేట్ వేయండి.",
        fertilizerDetails: "Basal: 50kg DAP + 20kg MOP + 10kg Zinc Sulphate/acre",
        fertilizerDetailsTe: "బేసల్: 50కిలోల DAP + 20కిలోల MOP + 10కిలోల జింక్ సల్ఫేట్",
        isCritical: true
      },
      {
        id: "pa3",
        stageName: "Active Tillering & 1st Urea Dose",
        stageNameTe: "పిలకల దశ & మొదటి విడత యూరియా",
        startDay: 35,
        endDay: 48,
        category: "fertilizing",
        actionText: "Apply 35kg Urea + 15kg Potash per acre. Drain excess water before top dressing.",
        actionTextTe: "ఎకరాకు 35కిలోల యూరియా + 15కిలోల పొటాష్ వేయండి. ఎరువు వేసే ముందు నీటిని తీసివేయండి.",
        fertilizerDetails: "1st Split: 35kg Urea + 15kg MOP/acre",
        fertilizerDetailsTe: "1వ విడత: 35కిలోల యూరియా + 15కిలోల పొటాష్",
        isCritical: true
      },
      {
        id: "pa4",
        stageName: "Panicle Initiation & BPH Protection",
        stageNameTe: "చిరు పొట్ట దశ & సుడిదోమ (BPH) నివారణ",
        startDay: 60,
        endDay: 75,
        category: "pest",
        actionText: "Apply 2nd dose 30kg Urea. Check plant base for Brown Plant Hopper (BPH). Spray Pymetrozine if needed.",
        actionTextTe: "30కిలోల యూరియా వేయండి. సుడిదోమ నివారణకు మొదళ్లలో చూసి పైమెట్రోజిన్ స్ప్రే చేయండి.",
        isCritical: true
      },
      {
        id: "pa5",
        stageName: "Flowering & Grain Filling",
        stageNameTe: "ఈత దశ & గింజ పాలుపోసుకునే సమయం",
        startDay: 85,
        endDay: 105,
        category: "irrigation",
        actionText: "Maintain continuous 5cm water layer. Spray 13-0-45 (10g/L) for heavy golden grains.",
        actionTextTe: "పొలంలో 5 సెం.మీ నీరు ఉంచండి. గింజ గట్టిపడటానికి 13-0-45 (10గ్రా/లీ) స్ప్రే చేయండి.",
        isCritical: false
      },
      {
        id: "pa6",
        stageName: "Drain Water & Paddy Harvest",
        stageNameTe: "నీరు తీసివేత & వరి కోతలు",
        startDay: 120,
        endDay: 135,
        category: "harvesting",
        actionText: "Drain field 10 days before harvest. Use combine harvester when 85% grains turn golden.",
        actionTextTe: "కోతకు 10 రోజుల ముందు నీటిని తీసివేయండి. 85% పైరు బంగారు రంగులోకి రాగానే కోతలు ప్రారంభించండి.",
        isCritical: true
      }
    ]
  },
  Cotton: {
    name: "Cotton (పత్తి)",
    nameTe: "పత్తి (Cotton)",
    totalDays: 160,
    stages: [
      {
        id: "co1",
        stageName: "Sowing & Germination",
        stageNameTe: "విత్తనం నాటడం & మొలక",
        startDay: 0,
        endDay: 15,
        category: "planting",
        actionText: "Sow Bt Cotton seeds at 90x60cm spacing. Maintain good moisture.",
        actionTextTe: "90x60 సెం.మీ దూరంలో పత్తి విత్తనాలు నాటండి.",
        isCritical: true
      },
      {
        id: "co2",
        stageName: "Thinning & Gap Filling",
        stageNameTe: "మొక్కల సాంద్రత సర్దుబాటు",
        startDay: 18,
        endDay: 30,
        category: "planting",
        actionText: "Keep one healthy seedling per hill. Apply 40kg 20-20-0-13 complex fertilizer.",
        actionTextTe: "చొప్పున ఒక ఆరోగ్యకరమైన మొక్కను ఉంచి మిగతావి తీసివేయండి. 40కిలోల కాంప్లెక్స్ వేయండి.",
        isCritical: false
      },
      {
        id: "co3",
        stageName: "Branching & Top Dressing 1",
        stageNameTe: "కొమ్మల పెరుగుదల & 1వ ఎరువు",
        startDay: 40,
        endDay: 55,
        category: "fertilizing",
        actionText: "Apply 35kg Urea + 15kg Potash. Spray Neem oil for sucking pests.",
        actionTextTe: "35కిలోల యూరియా + 15కిలోల పొటాష్ వేయండి. రసం పీల్చే పురుగులకు వేప నూనె స్ప్రే చేయండి.",
        fertilizerDetails: "Top Dressing: 35kg Urea + 15kg MOP/acre",
        fertilizerDetailsTe: "ఎరువు: 35కిలోల యూరియా + 15కిలోల MOP",
        isCritical: true
      },
      {
        id: "co4",
        stageName: "Square Formation & Pink Bollworm Trap",
        stageNameTe: "మొగ్గ దశ & గులాబీ పురుగు ట్రాప్స్",
        startDay: 60,
        endDay: 80,
        category: "pest",
        actionText: "Fix 8 Pheromone traps/acre for Pink Bollworm. Spray Boron 1g/L for square retention.",
        actionTextTe: "ఎకరాకు 8 ఫెరమోన్ ట్రాప్‌లు అమర్చండి. మొగ్గ రాలకుండా బోరాన్ 1గ్రా/లీ స్ప్రే చేయండి.",
        isCritical: true
      },
      {
        id: "co5",
        stageName: "Flowering & Boll Formation",
        stageNameTe: "పూత & కాయ తొడుగు దశ",
        startDay: 85,
        endDay: 110,
        category: "fertilizing",
        actionText: "Apply 3rd Dose Urea (25kg) + Potash (15kg). Spray Magnesium Sulphate 1% against leaf reddening.",
        actionTextTe: "25కిలోల యూరియా + 15కిలోల పొటాష్ వేయండి. ఆకు ఎర్రబడకుండా మెగ్నీషియం సల్ఫేట్ స్ప్రే చేయండి.",
        isCritical: false
      },
      {
        id: "co6",
        stageName: "Boll Bursting & Cotton Picking",
        stageNameTe: "కాయలు పగలడం & పత్తి ఏరుత",
        startDay: 120,
        endDay: 160,
        category: "harvesting",
        actionText: "Pick clean fully opened bolls in dry sunny weather. Store in moisture-free bags.",
        actionTextTe: "ఎండిన వాతావరణంలో తెరుచుకున్న పత్తి ఏరండి. తేమ లేని సంచులలో భద్రపరచండి.",
        isCritical: true
      }
    ]
  },
  Maize: {
    name: "Maize / Corn (మొక్కజొన్న)",
    nameTe: "మొక్కజొన్న (Maize / Corn)",
    totalDays: 110,
    stages: [
      {
        id: "mz1",
        stageName: "Sowing & Basal Fertilizer",
        stageNameTe: "విత్తుట & ప్రారంభ ఎరువులు",
        startDay: 0,
        endDay: 15,
        category: "planting",
        actionText: "Sow seeds at 60x20cm spacing with 50kg DAP + 20kg MOP per acre.",
        actionTextTe: "60x20 సెం.మీ దూరంలో విత్తుకోండి. 50కిలోల DAP + 20కిలోల MOP వేయండి.",
        isCritical: true
      },
      {
        id: "mz2",
        stageName: "Knee-High Stage & Fall Armyworm Check",
        stageNameTe: "మోకాలు లోతు పెరిగే దశ & లద్దెపురుగు నివారణ",
        startDay: 25,
        endDay: 40,
        category: "pest",
        actionText: "Apply 35kg Urea. Apply Emamectin Benzoate in whorls to control Fall Armyworm (కత్తెర పురుగు).",
        actionTextTe: "35కిలోల యూరియా వేయండి. కత్తెర పురుగు నివారణకు సుడిలో ఎమామెక్టిన్ బెన్జోయేట్ పొడి వెయ్యండి.",
        isCritical: true
      },
      {
        id: "mz3",
        stageName: "Tasseling & Silking Stage",
        stageNameTe: "తెన్ను తొడుగు & కెంపు దశ",
        startDay: 50,
        endDay: 70,
        category: "fertilizing",
        actionText: "Apply 2nd dose Urea (30kg). Ensure critical irrigation during silking for full cob filling.",
        actionTextTe: "30కిలోల యూరియా వేయండి. కెంపు దశలో నీటి తడి తప్పనిసరిగా ఇవ్వండి.",
        isCritical: true
      },
      {
        id: "mz4",
        stageName: "Cob Maturation & Harvesting",
        stageNameTe: "కంకి ముదిరే దశ & కోత",
        startDay: 90,
        endDay: 110,
        category: "harvesting",
        actionText: "Harvest when cob sheath turns yellow-brown and grains show black layer at tip.",
        actionTextTe: "కంకి పొట్టు పసుపు-గోధుమ రంగులోకి మారిన తర్వాత కోత కోయండి.",
        isCritical: true
      }
    ]
  }
};

export const CropCalendar: React.FC<CropCalendarProps> = ({
  farmer,
  language,
  weather,
  onUpdateSowingDetails,
  onAskAi,
  setActiveTab
}) => {
  // Current crop selection & sowing date state
  const selectedCropKey = farmer.primaryCrop?.includes("Paddy") || farmer.primaryCrop?.includes("వరి")
    ? "Paddy"
    : farmer.primaryCrop?.includes("Cotton") || farmer.primaryCrop?.includes("పత్తి")
    ? "Cotton"
    : farmer.primaryCrop?.includes("Maize") || farmer.primaryCrop?.includes("మొక్కజొన్న")
    ? "Maize"
    : "Chilli"; // Default fallback

  const [activeCropKey, setActiveCropKey] = useState<string>(selectedCropKey);
  const [sowingDateStr, setSowingDateStr] = useState<string>(
    farmer.cropSowingDate || "2026-06-15"
  );
  const [isEditingSettings, setIsEditingSettings] = useState<boolean>(false);
  const [completedReminders, setCompletedReminders] = useState<Record<string, boolean>>({
    ch1: true,
    ch2: true,
    pa1: true,
    pa2: true,
    co1: true,
    mz1: true
  });
  const [activeFilter, setActiveFilter] = useState<"all" | "due" | "upcoming" | "completed">("due");
  const [alertSentMsg, setAlertSentMsg] = useState<string | null>(null);

  const cropPreset = CROP_PRESETS[activeCropKey] || CROP_PRESETS["Chilli"];

  // Calculate Days Since Sowing (relative to fixed current date July 28, 2026 or browser date)
  const todayDate = new Date("2026-07-28");
  const sowingDate = new Date(sowingDateStr);
  const diffTime = todayDate.getTime() - sowingDate.getTime();
  const daysSinceSowing = Math.max(1, Math.floor(diffTime / (1000 * 60 * 60 * 24)));

  const progressPercent = Math.min(
    100,
    Math.round((daysSinceSowing / cropPreset.totalDays) * 100)
  );

  // Projected Harvest Date
  const harvestDate = new Date(sowingDate);
  harvestDate.setDate(harvestDate.getDate() + cropPreset.totalDays);
  const formattedHarvestDate = harvestDate.toLocaleDateString(
    language === "te" ? "te-IN" : "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );

  const formattedSowingDate = sowingDate.toLocaleDateString(
    language === "te" ? "te-IN" : "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );

  // Helper to determine status of a stage
  const getStageStatus = (stage: CropStage) => {
    const isCompleted = !!completedReminders[stage.id];
    if (isCompleted) return "completed";
    if (daysSinceSowing >= stage.startDay && daysSinceSowing <= stage.endDay + 10) {
      return "due";
    }
    if (daysSinceSowing < stage.startDay) {
      return "upcoming";
    }
    return "overdue";
  };

  const handleToggleComplete = (id: string) => {
    setCompletedReminders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSaveSettings = () => {
    setIsEditingSettings(false);
    if (onUpdateSowingDetails) {
      onUpdateSowingDetails(activeCropKey, sowingDateStr);
    }
  };

  const triggerReminderToast = (stage: CropStage) => {
    const title = language === "te" ? stage.stageNameTe : stage.stageName;
    setAlertSentMsg(
      language === "te"
        ? `🔔 '${title}' సకాలపు రిమైండర్ మీ ఫోన్‌కు పంపబడింది!`
        : `🔔 Reminder set for '${title}'! Notification dispatched.`
    );
    setTimeout(() => setAlertSentMsg(null), 4000);
  };

  const filteredStages = cropPreset.stages.filter((st) => {
    const status = getStageStatus(st);
    if (activeFilter === "all") return true;
    if (activeFilter === "due") return status === "due" || status === "overdue";
    if (activeFilter === "upcoming") return status === "upcoming";
    if (activeFilter === "completed") return status === "completed";
    return true;
  });

  const dueCount = cropPreset.stages.filter(
    (st) => getStageStatus(st) === "due" || getStageStatus(st) === "overdue"
  ).length;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6 text-slate-900">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm">
            <CalendarDays className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {language === "te" ? "పంట క్యాలెండర్ & సమయపాలన హెచ్చరికలు" : "Dynamic Crop Calendar & Smart Reminders"}
              </h2>
              {dueCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-extrabold animate-pulse">
                  {dueCount} {language === "te" ? "చర్యలు బాకీ" : "Due Now"}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              {language === "te"
                ? `విత్తనం నాటిన తేది (${formattedSowingDate}) ఆధారంగా విత్తనం, ఎరువులు మరియు కోత సమయపట్టిక.`
                : `Automated timeline for ${cropPreset.name} based on sowing date (${formattedSowingDate}).`}
            </p>
          </div>
        </div>

        {/* Quick Settings Button */}
        <button
          onClick={() => setIsEditingSettings(!isEditingSettings)}
          className="self-start md:self-auto px-4 py-2.5 bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 border border-slate-200 rounded-xl text-xs font-semibold transition flex items-center space-x-1.5 cursor-pointer"
        >
          <Sliders className="w-4 h-4 text-emerald-600" />
          <span>
            {isEditingSettings
              ? language === "te"
                ? "సెట్టింగ్‌లు మూసివేయి"
                : "Close Settings"
              : language === "te"
              ? "పంట / నాటిన తేది మార్చు"
              : "Change Crop / Sowing Date"}
          </span>
        </button>
      </div>

      {/* Sowing Date & Crop Selection Panel (Accordion/Expandable) */}
      {isEditingSettings && (
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 sm:p-5 space-y-4 animate-fadeIn">
          <div className="flex items-center space-x-2 text-emerald-900 font-bold text-sm">
            <Edit3 className="w-4 h-4 text-emerald-700" />
            <span>{language === "te" ? "పంట వివరాలు సవరించండి" : "Customize Crop & Sowing Parameters"}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {/* Select Crop Preset */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {language === "te" ? "ముఖ్యమైన పంట (Primary Crop) *" : "Primary Crop *"}
              </label>
              <select
                value={activeCropKey}
                onChange={(e) => setActiveCropKey(e.target.value)}
                className="w-full bg-white border border-emerald-300 rounded-xl p-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                {Object.keys(CROP_PRESETS).map((key) => (
                  <option key={key} value={key}>
                    {language === "te" ? CROP_PRESETS[key].nameTe : CROP_PRESETS[key].name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sowing Date Picker */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {language === "te" ? "విత్తుకున్న తేది (Sowing Date) *" : "Sowing / Planting Date *"}
              </label>
              <input
                type="date"
                value={sowingDateStr}
                onChange={(e) => setSowingDateStr(e.target.value)}
                className="w-full bg-white border border-emerald-300 rounded-xl p-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            {/* Save Button */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleSaveSettings}
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl transition shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{language === "te" ? "క్యాలెండర్ నవీకరించు" : "Update Calendar Schedule"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Lifecycle Progress Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-2xl p-5 text-white shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-700/60 pb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center shrink-0 font-extrabold text-sm">
              Day {daysSinceSowing}
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-white">
                {language === "te" ? cropPreset.nameTe : cropPreset.name} — {daysSinceSowing} {language === "te" ? "వ రోజు సాగులో ఉన్నారు" : "Days Post-Sowing"}
              </h3>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                {language === "te" ? `మొత్తం పంట కాలం: ${cropPreset.totalDays} రోజులు` : `Total Duration: ${cropPreset.totalDays} Days`} | {language === "te" ? "అంచనా కోత:" : "Est. Harvest:"} <span className="text-amber-300 font-bold">{formattedHarvestDate}</span>
              </p>
            </div>
          </div>

          <div className="text-right self-end sm:self-auto">
            <span className="text-2xl font-black text-emerald-400">{progressPercent}%</span>
            <span className="block text-[10px] uppercase text-slate-400 font-semibold tracking-wider">
              {language === "te" ? "పూర్తయిన దశ" : "Lifecycle Done"}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-slate-700/80 rounded-full h-3 overflow-hidden p-0.5 border border-slate-600">
            <div
              className="bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 h-2 rounded-full transition-all duration-700 shadow-xs"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-300 font-medium">
            <span>{language === "te" ? `విత్తుట (${formattedSowingDate})` : `Sown (${formattedSowingDate})`}</span>
            <span className="text-emerald-300 font-bold">
              {daysSinceSowing <= 40
                ? language === "te" ? "మొలక & నారు దశ" : "Seedling & Establishment"
                : daysSinceSowing <= 75
                ? language === "te" ? "కొమ్మలు & శాఖీయ దశ" : "Vegetative & Branching"
                : daysSinceSowing <= 110
                ? language === "te" ? "పూత & కాయ దశ" : "Flowering & Pod Formation"
                : language === "te" ? "ముదిరే దశ & కోత" : "Maturation & Harvest"}
            </span>
            <span>{language === "te" ? `కోత (${formattedHarvestDate})` : `Harvest (${formattedHarvestDate})`}</span>
          </div>
        </div>
      </div>

      {/* Toast Alert Banner */}
      {alertSentMsg && (
        <div className="bg-emerald-800 text-white px-4 py-3 rounded-2xl text-xs font-semibold flex items-center justify-between shadow-md animate-bounce">
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4 text-amber-300 shrink-0" />
            <span>{alertSentMsg}</span>
          </div>
          <button
            onClick={() => setAlertSentMsg(null)}
            className="text-white hover:text-slate-200 text-xs font-bold underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Filter Tabs & Weather Advisory Alert */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveFilter("due")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center space-x-1 ${
                activeFilter === "due"
                  ? "bg-amber-500 text-white shadow-xs"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{language === "te" ? `బాకీ ఉన్నవి (${dueCount})` : `Action Needed (${dueCount})`}</span>
            </button>

            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeFilter === "all"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              {language === "te" ? "అన్ని దశలు (All)" : "Full Timeline"}
            </button>

            <button
              onClick={() => setActiveFilter("upcoming")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeFilter === "upcoming"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              {language === "te" ? "రాబోయేవి (Upcoming)" : "Upcoming"}
            </button>

            <button
              onClick={() => setActiveFilter("completed")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeFilter === "completed"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              {language === "te" ? "పూర్తయినవి (Done)" : "Completed"}
            </button>
          </div>

          {weather && (
            <div className="text-[11px] text-sky-800 bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-xl font-medium flex items-center space-x-1.5 shrink-0">
              <Droplets className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>
                {language === "te"
                  ? `వర్షం సూచన: ${weather.rainProbability}% | ఎరువులు వేసేముందు వాతావరణం పరిశీలించండి`
                  : `Weather Integration: Rain ${weather.rainProbability}% | Verify before liquid spraying`}
              </span>
            </div>
          )}
        </div>

        {/* Timeline Items List */}
        <div className="space-y-3">
          {filteredStages.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-2xl text-slate-500 text-xs">
              {language === "te"
                ? "ఈ ఫిల్టర్‌లో ఎటువంటి రిమైండర్‌లు లేవు."
                : "No reminders found under this filter option."}
            </div>
          ) : (
            filteredStages.map((stage) => {
              const status = getStageStatus(stage);
              const isDone = status === "completed";
              const isDue = status === "due" || status === "overdue";

              return (
                <div
                  key={stage.id}
                  className={`p-4 rounded-2xl border transition-all duration-200 space-y-3 ${
                    isDone
                      ? "bg-slate-50 border-slate-200/80 opacity-75"
                      : isDue
                      ? "bg-amber-50/60 border-amber-300 shadow-xs ring-1 ring-amber-400/30"
                      : "bg-white border-slate-200 hover:border-emerald-300"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-2.5">
                    <div className="flex items-center space-x-2.5">
                      {/* Checkbox Toggle */}
                      <button
                        onClick={() => handleToggleComplete(stage.id)}
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center transition cursor-pointer shrink-0 ${
                          isDone
                            ? "bg-emerald-600 border-emerald-600 text-white"
                            : "bg-white border-slate-300 hover:border-emerald-500"
                        }`}
                        title={isDone ? "Mark as Pending" : "Mark as Completed"}
                      >
                        {isDone && <Check className="w-4 h-4 stroke-[3]" />}
                      </button>

                      <div>
                        <div className="flex items-center space-x-2">
                          <h4
                            className={`font-bold text-xs sm:text-sm ${
                              isDone
                                ? "line-through text-slate-500"
                                : isDue
                                ? "text-amber-950 font-black"
                                : "text-slate-900"
                            }`}
                          >
                            {language === "te" ? stage.stageNameTe : stage.stageName}
                          </h4>

                          {/* Status Badge */}
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                              isDone
                                ? "bg-slate-200 text-slate-700"
                                : isDue
                                ? "bg-amber-600 text-white animate-pulse"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {isDone
                              ? language === "te" ? "పూర్తయింది" : "Completed"
                              : isDue
                              ? language === "te" ? "ఈ వారంలో తప్పనిసరి!" : "DUE NOW!"
                              : language === "te" ? "రాబోయే దశ" : "Upcoming"}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-500 font-medium">
                          {language === "te"
                            ? `నాటిన తేది నుండి: ${stage.startDay} - ${stage.endDay} రోజులు`
                            : `Timeline: Days ${stage.startDay} – ${stage.endDay} post-sowing`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 self-end sm:self-auto">
                      <button
                        onClick={() => triggerReminderToast(stage)}
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 border border-slate-200 rounded-lg text-[11px] font-semibold transition flex items-center space-x-1 cursor-pointer"
                        title="Set Phone Alarm / Notification"
                      >
                        <Bell className="w-3.5 h-3.5 text-amber-600" />
                        <span>{language === "te" ? "రిమైండర్ పెట్టు" : "Set Alert"}</span>
                      </button>

                      {onAskAi && (
                        <button
                          onClick={() => {
                            const query = `Provide expert guidance on ${stage.stageName} for ${cropPreset.name} around Day ${daysSinceSowing}. What fertilizer doses, organic care, and irrigation timing should I follow?`;
                            onAskAi(query);
                            if (setActiveTab) setActiveTab("ai-assistant");
                          }}
                          className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-lg text-[11px] font-bold transition flex items-center space-x-1 cursor-pointer"
                        >
                          <Bot className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{language === "te" ? "AI సలహా పొందు" : "Ask AI"}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Stage Action Text */}
                  <div className="text-xs text-slate-800 leading-relaxed font-medium">
                    <p>{language === "te" ? stage.actionTextTe : stage.actionText}</p>

                    {(stage.fertilizerDetails || stage.fertilizerDetailsTe) && (
                      <div className="mt-2 p-2.5 bg-emerald-100/70 border border-emerald-300 rounded-xl text-[11px] text-emerald-950 font-semibold flex items-center space-x-2">
                        <Sprout className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>
                          {language === "te"
                            ? stage.fertilizerDetailsTe || stage.fertilizerDetails
                            : stage.fertilizerDetails}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
