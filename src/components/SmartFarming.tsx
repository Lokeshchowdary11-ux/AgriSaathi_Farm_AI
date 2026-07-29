import React, { useState } from "react";
import { Language, FarmerProfile } from "../types";
import { defaultFarmerProfile } from "../data/mockData";
import { getStates, getDistricts } from "../data/locationData";
import { Sprout, RefreshCw, Droplets, ShieldCheck, Sparkles, Award, ArrowRightCircle, Leaf } from "lucide-react";

interface SmartFarmingProps {
  language: Language;
  farmer?: FarmerProfile;
}

export const SmartFarming: React.FC<SmartFarmingProps> = ({ language, farmer: initialFarmer }) => {
  const farmer = initialFarmer || defaultFarmerProfile;
  const [soilType, setSoilType] = useState<FarmerProfile["soilType"]>(farmer.soilType || "Black Cotton Soil");
  const [landArea, setLandArea] = useState<number>(farmer.landAreaAcres || 5);
  const [season, setSeason] = useState("Kharif (Monsoon)");
  const [district, setDistrict] = useState(farmer.district || "Guntur");
  const [state, setState] = useState(farmer.state || "Andhra Pradesh");
  const [currentCrop, setCurrentCrop] = useState("Red Chilli / Paddy");

  // Crop Rotation Planner State
  const [previousCrop, setPreviousCrop] = useState("Paddy (Rice)");

  const getRotationAdvice = (prev: string, seas: string) => {
    switch (prev) {
      case "Paddy (Rice)":
        return {
          bestNext: seas === "Rabi (Winter)" ? "Black Gram (Urad) or Bengal Gram (Chana)" : "Green Gram (Moong) or Groundnut",
          nitrogenBenefit: "High (Legumes fix atmospheric nitrogen and break paddy pest cycle)",
          soilHealthScore: "88 / 100 (Optimal rotation)",
          recommendation: "After harvesting Paddy, planting a short-duration pulse crop (Black/Green Gram) fixes atmospheric nitrogen, utilizes residual soil moisture, and naturally suppresses weed and nematode cycles.",
          organicTip: "Incorporate post-harvest rice stubble with Bio-decomposer before sowing pulse crops."
        };
      case "Cotton":
        return {
          bestNext: "Red Gram (Pigeon Pea) or Sorghum (Jowar) or Green Gram",
          nitrogenBenefit: "Moderate to High",
          soilHealthScore: "82 / 100",
          recommendation: "Cotton is a heavy feeder and depletes deep soil potassium. Alternating with leguminous crops or millets helps restore micro-nutrients and breaks pink bollworm lifecycle.",
          organicTip: "Apply 2 tons of well-decomposed FYM (Farmyard Manure) per acre before preparing the land."
        };
      case "Red Chilli":
        return {
          bestNext: "Paddy or Maize or Sesbania (Green Manure)",
          nitrogenBenefit: "High soil rejuvenation",
          soilHealthScore: "85 / 100",
          recommendation: "Chilli requires intensive care and leaves root residues. Growing green manure crops like Dhaincha or rotating with flooded Paddy helps eliminate soil-borne fungal pathogens (Fusarium / Root rot).",
          organicTip: "Practice summer ploughing to expose harmful insect pupae to sunlight."
        };
      case "Groundnut":
        return {
          bestNext: "Paddy (Kharif) or Sorghum / Pearl Millet (Bajra)",
          nitrogenBenefit: "Excellent (Already nitrogen-rich soil)",
          soilHealthScore: "94 / 100",
          recommendation: "Groundnut leaves abundant nitrogen nodules in the soil. Follow up with cereal crops like Paddy or Maize which thrive on high nitrogen content.",
          organicTip: "Apply Gypsum @ 200 kg/acre during pod formation if re-planting groundnut."
        };
      default:
        return {
          bestNext: "Black Gram (Urad Dal) or Maize",
          nitrogenBenefit: "Balanced",
          soilHealthScore: "90 / 100",
          recommendation: "Rotate heavy nutrient feeding crops with nitrogen-fixing pulses to maintain organic carbon above 0.75% in the topsoil.",
          organicTip: "Use vermicompost @ 500 kg/acre to boost microbial soil activity."
        };
    }
  };

  const rotationDetails = getRotationAdvice(previousCrop, season);

  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<any>({
    recommendedCrops: [
      {
        name: "Red Chilli (Teja 334 / LCA 334)",
        suitability: "High (96%)",
        expectedYieldPerAcre: "25-28 Quintals (Dry Chilli)",
        reason: "Excellent match for Guntur Black Cotton soil. High mandi price trend.",
      },
      {
        name: "Paddy (BPT 5204 Sona Masuri)",
        suitability: "High (92%)",
        expectedYieldPerAcre: "28-32 Quintals",
        reason: "High consumer demand in Telangana & Andhra Pradesh mills.",
      },
    ],
    fertilizerSchedule: [
      {
        stage: "Basal Application (సమయం: విత్తే ముందు/నాటు వేసేటప్పుడు)",
        fertilizers: "DAP 50 kg/acre + Single Super Phosphate 100 kg + Potash 25 kg + Zinc Sulphate 10 kg",
      },
      {
        stage: "Vegetative Phase (25-30 Days)",
        fertilizers: "Urea 45 kg/acre + Neem Cake 25 kg/acre",
      },
      {
        stage: "Flowering & Pod Setting (50-60 Days)",
        fertilizers: "MOP (Potash) 25 kg/acre + 19:19:19 NPK Foliar Spray @ 5g/L",
      },
    ],
    irrigationAdvice:
      "For Black Cotton soil, provide drip irrigation at 3-day intervals (2.5 hours per cycle). Avoid excess flood irrigation to prevent root wilt.",
    pestControlTips: [
      "Install Yellow & Blue sticky traps @ 12 traps/acre.",
      "Spray Neem Oil (10,000 ppm) @ 2ml/L as preventive measure every 15 days.",
      "Monitor for stem borer and thrips twice weekly.",
    ],
    govSchemes: [
      "PM-KISAN Scheme: ₹6,000 per year direct benefit transfer.",
      "Rythu Bharosa / Farmer Support: Seed subsidy and fertilizer discount via Rythu Seva Kendras.",
      "AP/TS Micro Irrigation Project: 80% to 90% subsidy for drip irrigation setup.",
    ],
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/smart-recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          soilType,
          landArea,
          season,
          district,
          state,
          currentCrop,
          language,
        }),
      });

      const data = await res.json();
      if (data.recommendation) {
        setRecommendation(data.recommendation);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 text-slate-900">
      {/* Title Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white shadow-xs flex items-center justify-center">
            <Sprout className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              {language === "te" ? "🌱 స్మార్ట్ సాగు & పంట మార్పిడి ప్రణాళిక (Smart Crop & Rotation Guide)" : "🌱 Smart Crop & Rotation Planner"}
            </h1>
            <p className="text-xs text-slate-500">
              {language === "te"
                ? "మట్టి ఆరోగ్యాన్ని కాపాడుకోవడానికి, గత పంట ఆధారంగా తదుపరి ఉత్తమ పంట ఎంపిక మరియు ఎరువుల సిఫార్సులు."
                : "AI-driven crop selection, soil health restoration, and scientific crop rotation planning."}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Input Form (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{language === "te" ? "పొలం వివరాల ఎంపిక" : "Farm Parameters"}</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 mb-1 font-medium">State (రాష్ట్రం)</label>
              <select
                value={state}
                onChange={(e) => {
                  const newSt = e.target.value;
                  setState(newSt);
                  const dists = getDistricts(newSt);
                  if (dists.length > 0) setDistrict(dists[0]);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 mb-2"
              >
                {getStates().map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
                {!getStates().includes(state) && state && <option value={state}>{state}</option>}
              </select>

              <label className="block text-slate-700 mb-1 font-medium">District (జిల్లా)</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                {getDistricts(state).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
                {!getDistricts(state).includes(district) && district && (
                  <option value={district}>{district}</option>
                )}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 mb-1 font-medium">Land Area (Acres)</label>
              <input
                type="number"
                step="0.5"
                value={landArea}
                onChange={(e) => setLandArea(parseFloat(e.target.value) || 1)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-slate-700 mb-1 font-medium">Soil Type (మట్టి రకం)</label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="Black Cotton Soil">Black Cotton Soil (నల్లరేగడి నేల)</option>
                <option value="Red Loamy Soil">Red Loamy Soil (ఎర్ర నేల)</option>
                <option value="Sandy Loam">Sandy Loam (ఇసుక నేల)</option>
                <option value="Clay Soil">Clay Soil (బంకమన్ను నేల)</option>
                <option value="Alluvial Soil">Alluvial Soil (ఒండ్రు నేల)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 mb-1 font-medium">Season (కాలం)</label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="Kharif (Monsoon)">Kharif Monsoon (ఖరీఫ్ - వర్షాకాలం)</option>
                <option value="Rabi (Winter)">Rabi Winter (రబీ - చలికాలం)</option>
                <option value="Zaid (Summer)">Zaid Summer (జాైద్ - వేసవి కాలం)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 mb-1 font-medium">Primary Crop Focus</label>
              <input
                type="text"
                value={currentCrop}
                onChange={(e) => setCurrentCrop(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-semibold rounded-xl transition text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>{language === "te" ? "సలహాలు రూపొందుతున్నాయి..." : "Generating AI Advice..."}</span>
              </>
            ) : (
              <>
                <Sprout className="w-4 h-4" />
                <span>{language === "te" ? "AI స్మార్ట్ సలహాలు పొందు" : "Generate Recommendations"}</span>
              </>
            )}
          </button>
        </div>

        {/* Right Recommendation Report (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* CROP ROTATION PLANNER TOOL */}
          <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-white border border-emerald-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-200">
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">
                    {language === "te" ? "🔄 పంట మార్పిడి ప్లానర్ (Crop Rotation Planner)" : "🔄 Crop Rotation Planner for Soil Health"}
                  </h3>
                  <p className="text-xs text-slate-600">
                    {language === "te"
                      ? "గత పంట ఆధారంగా నేల సారాన్ని పెంచడానికి తదుపరి వేయవలసిన ఉత్తమ పంట."
                      : "Select your previous harvested crop to prevent nutrient depletion and break pest cycles."}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-xs font-bold text-slate-700 whitespace-nowrap">
                  {language === "te" ? "గత పంట:" : "Previous Crop:"}
                </label>
                <select
                  value={previousCrop}
                  onChange={(e) => setPreviousCrop(e.target.value)}
                  className="bg-white border border-emerald-300 rounded-xl px-3 py-1.5 text-xs font-bold text-emerald-900 focus:ring-2 focus:ring-emerald-600 shadow-2xs cursor-pointer"
                >
                  <option value="Paddy (Rice)">Paddy (Rice / వరి)</option>
                  <option value="Cotton">Cotton (పత్తి)</option>
                  <option value="Red Chilli">Red Chilli (మిర్చి)</option>
                  <option value="Groundnut">Groundnut (వేరుశనగ)</option>
                  <option value="Maize">Maize (మొక్కజొన్న)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/90 border border-emerald-200 p-4 rounded-xl space-y-1 shadow-2xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  {language === "te" ? "సిఫార్సు చేయబడిన తదుపరి పంట" : "Suggested Next Crop"}
                </span>
                <div className="text-sm font-black text-slate-900 flex items-center space-x-2 pt-1">
                  <ArrowRightCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{rotationDetails.bestNext}</span>
                </div>
              </div>

              <div className="bg-white/90 border border-emerald-200 p-4 rounded-xl space-y-1 shadow-2xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  {language === "te" ? "నైట్రోజన్ & మట్టి ఆరోగ్యం" : "Soil Health & Nitrogen Index"}
                </span>
                <div className="text-xs font-bold text-slate-800 pt-1">
                  {rotationDetails.nitrogenBenefit}
                </div>
                <div className="text-[11px] font-extrabold text-emerald-700">
                  Health Score: {rotationDetails.soilHealthScore}
                </div>
              </div>

              <div className="bg-white/90 border border-emerald-200 p-4 rounded-xl space-y-1 shadow-2xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  {language === "te" ? "మట్టి పునరుద్ధరణ చిట్కా" : "Organic Rejuvenation Tip"}
                </span>
                <div className="text-[11px] text-slate-700 leading-snug pt-0.5">
                  {rotationDetails.organicTip}
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-emerald-900 text-emerald-50 rounded-xl text-xs flex items-start space-x-2.5 shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 font-bold">{language === "te" ? "వ్యవసాయ నిపుణుల సలహా: " : "Agronomist Rotation Advice: "}</strong>
                {rotationDetails.recommendation}
              </div>
            </div>
          </div>

          {/* Recommended Crops */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>{language === "te" ? "1. అనువైన పంటలు & దిగుబడి (Recommended Crops & Yield)" : "1. Recommended Crops & Yield Potential"}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recommendation.recommendedCrops?.map((c: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm">{c.name}</h4>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                      {c.suitability}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800 font-medium">Yield: {c.expectedYieldPerAcre} / acre</p>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{c.reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Fertilizer Schedule */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-2">
              <Sprout className="w-4 h-4 text-emerald-600" />
              <span>{language === "te" ? "2. దశలవారీ ఎరువుల ప్రణాళిక (Fertilizer Schedule)" : "2. Stage-Wise Fertilizer Application Schedule"}</span>
            </h3>

            <div className="space-y-2">
              {recommendation.fertilizerSchedule?.map((f: any, idx: number) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <span className="font-bold text-emerald-800 sm:w-1/3">{f.stage}</span>
                  <span className="text-slate-700 sm:w-2/3">{f.fertilizers}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Irrigation & Pest Control */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                <Droplets className="w-4 h-4 text-sky-600" />
                <span>{language === "te" ? "3. నీటి యాజమాన్యం (Irrigation)" : "3. Irrigation Schedule"}</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">{recommendation.irrigationAdvice}</p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{language === "te" ? "4. సమగ్ర సస్యరక్షణ (Pest Control)" : "4. Integrated Pest Management"}</span>
              </h3>
              <ul className="text-xs text-slate-600 list-disc list-inside space-y-1">
                {recommendation.pestControlTips?.map((tip: string, idx: number) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Subsidy Schemes */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>{language === "te" ? "5. వర్తించే ప్రభుత్వ పథకాలు (Government Schemes)" : "5. Applicable Govt Subsidies & Support Schemes"}</span>
            </h3>
            <div className="space-y-1.5 text-xs text-slate-700">
              {recommendation.govSchemes?.map((s: string, idx: number) => (
                <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                  • {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
