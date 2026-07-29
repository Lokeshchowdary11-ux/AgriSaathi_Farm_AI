import React, { useState, useEffect } from "react";
import { FarmerProfile, Language, WeatherDay, MandiItem, NotificationItem } from "../types";
import { weather7Days, mandiPricesData, initialNotifications, defaultFarmerProfile } from "../data/mockData";
import { CropCalendar } from "./CropCalendar";
import { SoilFertilizerAlerts } from "./SoilFertilizerAlerts";
import { DistrictAgriNews } from "./DistrictAgriNews";
import { t } from "../utils/i18n";
import { saveToOfflineCache, getFromOfflineCache, OFFLINE_CACHE_KEYS, getLastSyncTime } from "../utils/offlineCache";
import {
  Sprout,
  Bot,
  AlertTriangle,
  CloudSun,
  TrendingUp,
  Calculator,
  Scan,
  ShieldCheck,
  ChevronRight,
  Send,
  Mic,
  Zap,
  Boxes,
  Bell,
  Sparkles,
  Wifi,
  WifiOff,
  CloudDownload
} from "lucide-react";

interface DashboardProps {
  farmer?: FarmerProfile;
  language: Language;
  weather?: WeatherDay;
  mandiItems?: MandiItem[];
  notifications?: NotificationItem[];
  setActiveTab: (tab: string) => void;
  onTriggerSOS?: () => void;
  onQuickAiQuery?: (query: string) => void;
  onAssistantPrompt?: (query: string) => void;
  onUpdateSowingDetails?: (crop: string, sowingDate: string) => void;
  onAddNotification?: (notification: NotificationItem) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  farmer: initialFarmer,
  language,
  weather = weather7Days[0],
  mandiItems = mandiPricesData,
  notifications = initialNotifications,
  setActiveTab,
  onTriggerSOS,
  onQuickAiQuery,
  onAssistantPrompt,
  onUpdateSowingDetails,
  onAddNotification
}) => {
  const farmer = initialFarmer || defaultFarmerProfile;
  const [quickInput, setQuickInput] = useState("");
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [lastSync, setLastSync] = useState<string>(getLastSyncTime());

  // Cache critical data on load/update for remote offline field usage
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    if (weather) saveToOfflineCache(OFFLINE_CACHE_KEYS.DASHBOARD_WEATHER, weather);
    if (mandiItems) saveToOfflineCache(OFFLINE_CACHE_KEYS.DASHBOARD_MANDI, mandiItems);
    if (notifications) saveToOfflineCache(OFFLINE_CACHE_KEYS.DASHBOARD_NOTIFICATIONS, notifications);
    if (farmer) saveToOfflineCache(OFFLINE_CACHE_KEYS.FARMER_PROFILE, farmer);

    setLastSync(getLastSyncTime());

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [weather, mandiItems, notifications, farmer]);

  const cachedWeather = isOnline ? weather : getFromOfflineCache(OFFLINE_CACHE_KEYS.DASHBOARD_WEATHER, weather || weather7Days[0]);
  const cachedMandi = isOnline ? mandiItems : getFromOfflineCache(OFFLINE_CACHE_KEYS.DASHBOARD_MANDI, mandiPricesData);

  const safeMandi = cachedMandi && cachedMandi.length > 0 ? cachedMandi : mandiPricesData;
  const safeNotifs = notifications || [];
  const safeWeather = cachedWeather || weather7Days[0];

  const topMandi: MandiItem = safeMandi[0] || mandiPricesData[0];

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;
    if (onQuickAiQuery) {
      onQuickAiQuery(quickInput);
    } else if (onAssistantPrompt) {
      onAssistantPrompt(quickInput);
    }
    setActiveTab("ai-assistant");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-slate-900">
      {/* Offline / Online Storage Status Banner */}
      <div className={`px-4 py-2.5 rounded-2xl border flex items-center justify-between text-xs font-bold shadow-2xs ${
        isOnline 
          ? "bg-emerald-50 border-emerald-200 text-emerald-900" 
          : "bg-amber-50 border-amber-300 text-amber-900"
      }`}>
        <div className="flex items-center space-x-2.5">
          {isOnline ? (
            <>
              <Wifi className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>{language === "te" ? "నెట్‌వర్క్ ఆన్‌లైన్: క్లౌడ్ డేటా సింక్ అయింది" : "Online: Cloud Data Synchronized"}</span>
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4 text-amber-600 animate-bounce" />
              <span>
                {language === "te" 
                  ? "📡 ఆఫ్‌లైన్ మోడ్: రిమోట్ ఫీల్డ్ క్యాష్ యాక్టివ్ (చివరి సింక్: " + lastSync + ")" 
                  : "📡 Offline Mode: Remote Field Cache Active (Viewing offline weather & mandi data, last synced " + lastSync + ")"}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-medium opacity-80">
            {language === "te" ? "స్థానిక నిల్వ క్యాష్: సురక్షితం" : "Local Storage Caching: Active"}
          </span>
          <CloudDownload className="w-4 h-4 text-emerald-700" />
        </div>
      </div>

      {/* Hero Farmer Greeting Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 border border-emerald-600/40 p-6 sm:p-8 shadow-md text-white">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-900/40 border border-emerald-400/30 text-emerald-100 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
              <span>{language === "te" ? "రైతు మిత్రుడు AI వ్యవస్థ" : "Welcome to AgriSaathi AI"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              {language === "te" ? `నమస్తే, ${farmer.fullName} గారూ! 🌾` : `Namaste, ${farmer.fullName}! 🌾`}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
              {language === "te"
                ? `${farmer.village}, ${farmer.district} (${farmer.landAreaAcres} ఎకరాలు) - మీ పంట ఆరోగ్య రక్షణ, మార్కెట్ ధరలు మరియు అత్యవసర భద్రత ఒక్క చోటనే!`
                : `${farmer.village}, ${farmer.district} (${farmer.landAreaAcres} Acres) - Your real-time crop care, weather alerts, mandi market prices, and emergency safety companion.`}
            </p>
          </div>

          {/* Quick SOS & AI Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <button
              onClick={onTriggerSOS}
              className="px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-md transition transform active:scale-95 flex items-center space-x-2 animate-pulse cursor-pointer"
            >
              <AlertTriangle className="w-5 h-5 text-amber-200" />
              <span>{language === "te" ? "అత్యవసర SOS సైరన్" : "EMERGENCY SOS"}</span>
            </button>

            <button
              onClick={() => setActiveTab("3d-showcase")}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm transition flex items-center space-x-2 backdrop-blur-xs cursor-pointer"
            >
              <Boxes className="w-5 h-5 text-amber-300" />
              <span>{language === "te" ? "3D మోడల్స్" : "3D Showcase"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick AI Search/Query Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-xs">
        <form onSubmit={handleQuickSubmit} className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0">
            <Bot className="w-5 h-5" />
          </div>

          <button
            type="button"
            onClick={() => {
              const SpeechRecognition =
                (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
              if (!SpeechRecognition) {
                alert(language === "te" ? "మీ బ్రౌజర్‌లో మైక్ పనిచేయదు." : "Voice input is not supported in this browser.");
                return;
              }
              try {
                const recognition = new SpeechRecognition();
                const langMap: Record<string, string> = {
                  te: "te-IN", hi: "hi-IN", ta: "ta-IN", kn: "kn-IN",
                  ml: "ml-IN", mr: "mr-IN", bn: "bn-IN", gu: "gu-IN", pa: "pa-IN", en: "en-IN"
                };
                recognition.lang = langMap[language] || "te-IN";
                recognition.start();
                recognition.onresult = (event: any) => {
                  const transcript = event.results[0][0].transcript;
                  setQuickInput(transcript);
                  onQuickAiQuery(transcript);
                };
              } catch (e) {
                console.error(e);
              }
            }}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 transition flex items-center justify-center cursor-pointer shrink-0"
            title={language === "te" ? "మైక్ ద్వార మాట్లాడండి (Voice Input)" : "Speak via Microphone"}
          >
            <Mic className="w-5 h-5 text-emerald-600" />
          </button>

          <input
            type="text"
            value={quickInput}
            onChange={(e) => setQuickInput(e.target.value)}
            placeholder={t("quickAiAsk", language)}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-xs sm:text-sm transition flex items-center space-x-1.5 shrink-0 shadow-xs cursor-pointer"
          >
            <span>{t("aiAssistant", language)}</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Main Layout Grid with Quick Actions Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Main Feed (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* 4 Core Summary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1: Farm & Soil Status */}
            <div
              onClick={() => setActiveTab("smart-farming")}
              className="bg-white border border-slate-200/80 hover:border-emerald-300 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {language === "te" ? "పొలం వివరాలు" : "Farm & Soil"}
                </span>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 group-hover:scale-110 transition">
                  <Sprout className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{farmer.landAreaAcres} Acres</p>
                <p className="text-xs text-slate-500 mt-0.5">{farmer.soilType}</p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-medium">
                <span>Crops: {farmer.cropDetails}</span>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-1 transition" />
              </div>
            </div>

            {/* Card 2: Weather Snapshot */}
            <div
              onClick={() => setActiveTab("weather")}
              className="bg-white border border-slate-200/80 hover:border-emerald-300 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {language === "te" ? "వాతావరణం" : "Weather Forecast"}
                </span>
                <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 group-hover:scale-110 transition">
                  <CloudSun className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{weather.tempMax}°C / {weather.tempMin}°C</p>
                <p className="text-xs text-sky-700 mt-0.5 font-medium">
                  {weather.condition} | {weather.rainProbability}% {language === "te" ? "వర్ష అవకాశం" : "Rain"}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-medium">
                <span className="truncate">{language === "te" ? weather.precautionTe : weather.precaution}</span>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-1 transition" />
              </div>
            </div>

            {/* Card 3: Mandi Market Highlights */}
            <div
              onClick={() => setActiveTab("market")}
              className="bg-white border border-slate-200/80 hover:border-emerald-300 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {language === "te" ? "మార్కెట్ ధర" : "Mandi Market"}
                </span>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 group-hover:scale-110 transition">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">₹{topMandi.modalPrice.toLocaleString()}/Qtl</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {language === "te" ? topMandi.cropNameTe : topMandi.cropName} ({topMandi.district})
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-medium">
                <span className="text-emerald-700 font-semibold">
                  {language === "te" ? "ధర పెంపు +3.8% ↑" : "Bullish (+3.8% ↑)"}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-1 transition" />
              </div>
            </div>

            {/* Card 4: Financial Summary */}
            <div
              onClick={() => setActiveTab("financial")}
              className="bg-white border border-slate-200/80 hover:border-emerald-300 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {language === "te" ? "ఆర్థిక అంచనా" : "Financial Estimate"}
                </span>
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 group-hover:scale-110 transition">
                  <Calculator className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-700">
                  ₹{(farmer.landAreaAcres * 120000).toLocaleString()}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {language === "te" ? "అంచనా నికర లాభం (Net Profit)" : "Est. Net Yield Revenue"}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-medium">
                <span>{language === "te" ? "ఎకరా లెక్కలు చూడండి" : "Calculate Acre & Expenses"}</span>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-1 transition" />
              </div>
            </div>
          </div>

          {/* Dynamic Crop Calendar & Time-Sensitive Reminders */}
          <CropCalendar
            farmer={farmer}
            language={language}
            weather={weather}
            onUpdateSowingDetails={onUpdateSowingDetails}
            onAskAi={(query) => {
              if (onQuickAiQuery) onQuickAiQuery(query);
              else if (onAssistantPrompt) onAssistantPrompt(query);
              setActiveTab("ai-assistant");
            }}
            setActiveTab={setActiveTab}
          />

          {/* Proactive Soil-Type Fertilizer Alert Notification System */}
          <SoilFertilizerAlerts
            farmer={farmer}
            language={language}
            onAddNotification={onAddNotification}
            onAskAi={(query) => {
              if (onQuickAiQuery) onQuickAiQuery(query);
              else if (onAssistantPrompt) onAssistantPrompt(query);
              setActiveTab("ai-assistant");
            }}
            setActiveTab={setActiveTab}
          />

          {/* Module Navigation Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-emerald-600" />
                <span>{language === "te" ? "రైతు సేవలు & సాధనాలు" : "AgriSaathi Ecosystem Modules"}</span>
              </h2>
              <span className="text-xs text-slate-500 font-medium">10 Modules Active</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Module 1: AI Crop Disease Detection */}
              <div
                onClick={() => setActiveTab("crop-disease")}
                className="bg-white border border-slate-200/80 hover:border-emerald-400 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer space-y-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 group-hover:scale-110 transition">
                  <Scan className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition">
                    {language === "te" ? "5. 📷 AI పంట వ్యాధి గుర్తింపు" : "5. 📷 AI Crop Disease Detection"}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {language === "te"
                      ? "ఆకు ఫోటో అప్‌లోడ్ చేయండి. AI తెగులును గుర్తించి సేంద్రీయ, రసాయనిక నివారణ మందులు సూచిస్తుంది."
                      : "Upload leaf image for instant Gemini AI disease analysis, organic remedies & chemical dosage."}
                  </p>
                </div>
              </div>

              {/* Module 2: Smart Farming Recommendation */}
              <div
                onClick={() => setActiveTab("smart-farming")}
                className="bg-white border border-slate-200/80 hover:border-emerald-400 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer space-y-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 group-hover:scale-110 transition">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition">
                    {language === "te" ? "6. 🌱 స్మార్ట్ సాగు రికమండేషన్" : "6. 🌱 Smart Farming Advice"}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {language === "te"
                      ? "మీ మట్టి, నీటి పారుదల ఆధారంగా అనువైన పంటలు, ఎరువుల షెడ్యూల్ మరియు ప్రభుత్వ సబ్సిడీ పథకాలు."
                      : "AI crop selection, stage-wise fertilizer application schedule, and subsidy schemes."}
                  </p>
                </div>
              </div>

              {/* Module 3: AI Farmer Voice & Text Assistant */}
              <div
                onClick={() => setActiveTab("ai-assistant")}
                className="bg-white border border-slate-200/80 hover:border-emerald-400 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer space-y-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 group-hover:scale-110 transition">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition">
                    {language === "te" ? "4. 🤖 AI వాయిస్ & టెక్స్ట్ సహాయకుడు" : "4. 🤖 AI Voice & Text Assistant"}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {language === "te"
                      ? "తెలుగు మరియు ఇంగ్లీషులో మాట్లాడండి లేదా టైప్ చేయండి. సలహాలు నేరుగా వినండి."
                      : "Bilingual voice-enabled AI companion answering farming queries in Telugu and English."}
                  </p>
                </div>
              </div>

              {/* Module 4: Emergency Assistance SOS */}
              <div
                onClick={() => setActiveTab("emergency")}
                className="bg-rose-50/50 border border-rose-200/80 hover:border-rose-400 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer space-y-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-700 group-hover:scale-110 transition">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-rose-700 transition">
                    {language === "te" ? "8. 🚨 అత్యవసర భద్రత (SOS Alert)" : "8. 🚨 Emergency Farmer SOS"}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {language === "te"
                      ? "పాము కాటు, ప్రమాదాలు లేదా విద్యుత్ షాక్ సమయాల్లో సైరన్ శబ్దం మరియు కుటుంబానికి GPS లొకేషన్ మెసేజ్."
                      : "Instant SOS trigger, siren generator, automated family SMS alert, and emergency call helpline."}
                  </p>
                </div>
              </div>

              {/* Module 5: Market Intelligence */}
              <div
                onClick={() => setActiveTab("market")}
                className="bg-white border border-slate-200/80 hover:border-emerald-400 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer space-y-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 group-hover:scale-110 transition">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition">
                    {language === "te" ? "9. 💰 మార్కెట్ ధరలు (Mandi Prices)" : "9. 💰 Mandi Market Intelligence"}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {language === "te"
                      ? "ఆంధ్రప్రదేశ్, తెలంగాణ మార్కెట్ యార్డుల తాజా ధరలు, ట్రెండ్ చార్టులు మరియు అమ్మకపు సలహాలు."
                      : "Live market rates across AP & TS mandis, price trend charts, and AI sell advice."}
                  </p>
                </div>
              </div>

              {/* Module 6: Financial Calculators */}
              <div
                onClick={() => setActiveTab("financial")}
                className="bg-white border border-slate-200/80 hover:border-emerald-400 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer space-y-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 group-hover:scale-110 transition">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition">
                    {language === "te" ? "10. 📏 వ్యవసాయ లెక్కలు & లోన్" : "10. 📏 Farm Financial Calculators"}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {language === "te"
                      ? "ఎకరాల నుండి గజాల మార్పిడి, దిగుబడి, విత్తనాలు/ఎరువుల ఖర్చులు మరియు బ్యాంక్ లోన్ వడ్డీ లెక్కలు."
                      : "Acre-to-sqft conversion, crop yield estimator, expense log, net profit & loan interest calculator."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* District Specific Agricultural News & Government Schemes Section */}
          <DistrictAgriNews
            language={language}
            farmer={farmer}
            onAskAI={(query) => {
              if (onQuickAiQuery) onQuickAiQuery(query);
              else if (onAssistantPrompt) onAssistantPrompt(query);
              setActiveTab("ai-assistant");
            }}
          />

          {/* Notifications Bar */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
                <Bell className="w-4 h-4 text-emerald-600" />
                <span>{language === "te" ? "ముఖ్యమైన రైతు ప్రకటనలు & నేల ఎరువుల అలర్ట్‌లు" : "Latest Farmer Bulletins & Soil Fertilizer Alerts"}</span>
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">{safeNotifs.length} Active</span>
            </div>

            <div className="space-y-2">
              {safeNotifs.map((n) => (
                <div
                  key={n.id}
                  className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs transition ${
                    n.type === "soil" || n.type === "fertilizer"
                      ? "bg-emerald-50/70 border-emerald-300"
                      : "bg-slate-50 border-slate-200/80"
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center space-x-2">
                      {(n.type === "soil" || n.type === "fertilizer") && (
                        <span className="px-2 py-0.5 bg-emerald-700 text-white font-extrabold text-[10px] rounded uppercase tracking-wider">
                          {language === "te" ? "నేల పోషణ అలర్ట్" : "Soil Advisory"}
                        </span>
                      )}
                      <p className="font-bold text-slate-900">{language === "te" ? n.titleTe : n.title}</p>
                    </div>

                    <p className="text-slate-700 leading-relaxed">{language === "te" ? n.messageTe : n.message}</p>

                    {n.soilTypeTag && (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="bg-white border border-emerald-300 text-emerald-900 text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-2xs">
                          🏷️ {n.soilTypeTag}
                        </span>
                        {n.fertilizerDose && (
                          <span className="bg-amber-100 text-amber-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md">
                            💊 {n.fertilizerDose}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-2 shrink-0">
                    <span className="text-[10px] bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded font-medium whitespace-nowrap">
                      {n.timestamp}
                    </span>

                    {n.actionableQuery && (
                      <button
                        onClick={() => {
                          if (onQuickAiQuery) onQuickAiQuery(n.actionableQuery!);
                          else if (onAssistantPrompt) onAssistantPrompt(n.actionableQuery!);
                          setActiveTab("ai-assistant");
                        }}
                        className="px-2.5 py-1 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-[10px] rounded-lg shadow-xs transition flex items-center space-x-1 cursor-pointer"
                      >
                        <Bot className="w-3 h-3 text-amber-300" />
                        <span>{language === "te" ? "AI ని సలహా అడుగు" : "Ask AI Advice"}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Quick Actions Sidebar (4 cols sticky) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-slate-900 text-sm flex items-center space-x-2">
                <Zap className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>{language === "te" ? "⚡ త్వరిత చర్యలు (Quick Actions)" : "⚡ Quick Actions Toolbar"}</span>
              </h3>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                1-Tap Access
              </span>
            </div>

            <div className="space-y-2">
              {/* Action 1: Calculate Fertilizer */}
              <button
                onClick={() => setActiveTab("smart-farming")}
                className="w-full text-left p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold group-hover:scale-110 transition shadow-2xs">
                    <Sprout className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 transition">
                      {language === "te" ? "ఎరువుల మోతాదు లెక్కించు" : "Calculate Fertilizer"}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {language === "te" ? "నేల మరియు పంట ఆధారంగా" : "Soil & crop recommendation"}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition" />
              </button>

              {/* Action 2: Check Market Price */}
              <button
                onClick={() => setActiveTab("market")}
                className="w-full text-left p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold group-hover:scale-110 transition shadow-2xs">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-teal-800 transition">
                      {language === "te" ? "మార్కెట్ ధరలు తనిఖీ చేయి" : "Check Market Price"}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {language === "te" ? "AP & TS మండి రేట్లు" : "Live AP & TS mandi rates"}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition" />
              </button>

              {/* Action 3: Scan Crop Disease */}
              <button
                onClick={() => setActiveTab("crop-disease")}
                className="w-full text-left p-3 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 transition flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold group-hover:scale-110 transition shadow-2xs">
                    <Scan className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-amber-800 transition">
                      {language === "te" ? "పంట వ్యాధిని స్కాన్ చేయి" : "Scan Crop Disease"}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {language === "te" ? "ఫోటో అప్‌లోడ్ & AI విశ్లేషణ" : "AI leaf image diagnosis"}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition" />
              </button>

              {/* Action 4: AI Voice Assistant */}
              <button
                onClick={() => setActiveTab("ai-assistant")}
                className="w-full text-left p-3 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 transition flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold group-hover:scale-110 transition shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-sky-800 transition">
                      {language === "te" ? "AI వాయిస్ సహాయకుడు" : "AI Voice Assistant"}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {language === "te" ? "మాట్లాడి ప్రశ్నలు అడగండి" : "Ask questions in Telugu/English"}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-0.5 transition" />
              </button>

              {/* Action 5: Weather Forecast */}
              <button
                onClick={() => setActiveTab("weather")}
                className="w-full text-left p-3 rounded-2xl bg-slate-50 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-300 transition flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold group-hover:scale-110 transition shadow-2xs">
                    <CloudSun className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-cyan-800 transition">
                      {language === "te" ? "వాతావరణ అంచనా" : "Weather Forecast"}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {language === "te" ? "వర్షాలు & ఉష్ణోగ్రత వివరాలు" : "Rainfall & temperature updates"}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-0.5 transition" />
              </button>

              {/* Action 6: Financial Calculators */}
              <button
                onClick={() => setActiveTab("financial")}
                className="w-full text-left p-3 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 transition flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold group-hover:scale-110 transition shadow-2xs">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-800 transition">
                      {language === "te" ? "వ్యవసాయ లెక్కలు & లోన్" : "Farm Calculators & Loan"}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {language === "te" ? "లాభాలు & వడ్డీ అంచనాలు" : "Profit & interest estimation"}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition" />
              </button>

              {/* Action 7: Emergency SOS */}
              <button
                onClick={() => {
                  if (onTriggerSOS) onTriggerSOS();
                  else setActiveTab("emergency");
                }}
                className="w-full text-left p-3 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 hover:border-rose-300 transition flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold group-hover:scale-110 transition shadow-2xs">
                    <AlertTriangle className="w-4 h-4 text-amber-200" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-rose-900 group-hover:text-rose-950 transition">
                      {language === "te" ? "అత్యవసర SOS సైరన్" : "Emergency SOS Alert"}
                    </p>
                    <p className="text-[10px] text-rose-700">
                      {language === "te" ? "కుటుంబానికి GPS లొకేషన్" : "Siren & family SMS dispatch"}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-rose-400 group-hover:text-rose-600 group-hover:translate-x-0.5 transition" />
              </button>
            </div>

            {/* Quick Weather & Mandi Summary Widget in Sidebar */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="bg-emerald-900 text-white p-3.5 rounded-2xl space-y-2 shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center space-x-1.5">
                    <Sprout className="w-3.5 h-3.5 text-emerald-300" />
                    <span>{farmer.district} Farm Status</span>
                  </span>
                  <span className="text-[10px] bg-emerald-800 px-2 py-0.5 rounded text-amber-300 font-mono">
                    Active Season
                  </span>
                </div>
                <div className="text-xs text-emerald-100 leading-snug">
                  {language === "te" 
                    ? "నేల రకం: " + farmer.soilType + " | భూమి: " + farmer.landAreaAcres + " ఎకరాలు"
                    : "Soil: " + farmer.soilType + " | Area: " + farmer.landAreaAcres + " Acres"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
