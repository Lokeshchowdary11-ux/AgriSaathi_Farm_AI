import React, { useState, useEffect } from "react";
import { Language, WeatherDay } from "../types";
import { weather7Days } from "../data/mockData";
import { saveToOfflineCache, getFromOfflineCache, OFFLINE_CACHE_KEYS } from "../utils/offlineCache";
import { CloudSun, CloudRain, Sun, Wind, Droplets, AlertTriangle, ShieldCheck, Calendar, WifiOff, Wifi, CloudDownload } from "lucide-react";

interface WeatherIntelligenceProps {
  language: Language;
}

export const WeatherIntelligence: React.FC<WeatherIntelligenceProps> = ({ language }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [cachedForecast, setCachedForecast] = useState<WeatherDay[]>(weather7Days);
  const [selectedDay, setSelectedDay] = useState<WeatherDay>(weather7Days[0]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Save weather forecast to offline cache for remote field use
    saveToOfflineCache(OFFLINE_CACHE_KEYS.DASHBOARD_WEATHER, weather7Days);

    if (!navigator.onLine) {
      const offlineData = getFromOfflineCache<WeatherDay[]>(OFFLINE_CACHE_KEYS.DASHBOARD_WEATHER, weather7Days);
      if (offlineData && offlineData.length > 0) {
        setCachedForecast(offlineData);
        setSelectedDay(offlineData[0]);
      }
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const getWeatherIcon = (cond: string) => {
    switch (cond) {
      case "Rainy":
      case "Thunderstorm":
        return <CloudRain className="w-8 h-8 text-sky-400" />;
      case "Sunny":
        return <Sun className="w-8 h-8 text-amber-400 animate-spin-slow" />;
      default:
        return <CloudSun className="w-8 h-8 text-amber-300" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 text-slate-900">
      {/* Offline Storage Cache Status Banner */}
      <div className={`px-4 py-2.5 rounded-2xl border flex items-center justify-between text-xs font-bold shadow-2xs ${
        isOnline 
          ? "bg-emerald-50 border-emerald-200 text-emerald-900" 
          : "bg-amber-50 border-amber-300 text-amber-900"
      }`}>
        <div className="flex items-center space-x-2.5">
          {isOnline ? (
            <>
              <Wifi className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>{language === "te" ? "వాతావరణ డేటా ఆన్‌లైన్ సింక్ అయింది" : "Weather Intelligence Online: Synced with Satellite Feed"}</span>
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4 text-amber-600 animate-bounce" />
              <span>
                {language === "te" 
                  ? "📡 ఆఫ్‌లైన్ మోడ్: రిమోట్ ఫీల్డ్ లోకల్ క్యాష్ నుండి వాతావరణ అంచనా లోడ్ చేయబడింది" 
                  : "📡 Offline Mode: Weather forecast loaded from local offline storage cache (No cellular coverage required)"}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-medium opacity-80">
            {language === "te" ? "క్యాష్: సేవ్ చేయబడింది" : "Offline Storage Cached"}
          </span>
          <CloudDownload className="w-4 h-4 text-emerald-700" />
        </div>
      </div>

      {/* Title Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white shadow-xs flex items-center justify-center">
            <CloudSun className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              {language === "te" ? "🌦 వాతావరణ హెచ్చరికలు & సూచనలు (Weather Intelligence)" : "🌦 Weather Intelligence & Farm Precautions"}
            </h1>
            <p className="text-xs text-slate-500">
              {language === "te"
                ? "7 రోజుల వాతావరణ అంచనా, వర్షపు హెచ్చరికలు మరియు వ్యవసాయ పనుల జాగ్రత్తలు."
                : "7-day localized forecast, rainfall probability, temperature shifts, and precautionary farm advice."}
            </p>
          </div>
        </div>
      </div>

      {/* Main Selected Day Highlight Box */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              {getWeatherIcon(selectedDay.condition)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-slate-900">{selectedDay.dayName}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                  {selectedDay.date}
                </span>
              </div>
              <p className="text-sm font-semibold text-emerald-700 mt-1">{selectedDay.condition} Conditions</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Max Temp</span>
              <span className="text-2xl font-bold text-slate-900">{selectedDay.tempMax}°C</span>
            </div>
            <div className="border-l border-slate-200 pl-6">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Min Temp</span>
              <span className="text-2xl font-bold text-slate-600">{selectedDay.tempMin}°C</span>
            </div>
          </div>
        </div>

        {/* 3 Metric Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center space-x-3">
            <CloudRain className="w-6 h-6 text-sky-600" />
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Rain Probability</span>
              <span className="text-sm font-bold text-slate-900">{selectedDay.rainProbability}% Chance</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center space-x-3">
            <Droplets className="w-6 h-6 text-emerald-600" />
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Air Humidity</span>
              <span className="text-sm font-bold text-slate-900">{selectedDay.humidity}%</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center space-x-3">
            <Wind className="w-6 h-6 text-amber-600" />
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Wind Speed</span>
              <span className="text-sm font-bold text-slate-900">{selectedDay.windSpeed} km/h</span>
            </div>
          </div>
        </div>

        {/* Precaution Box */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              {language === "te" ? "రైతుకు వాతావరణ జాగ్రత్తల సూచన" : "Farming Precautionary Advisory"}
            </h4>
            <p className="text-xs sm:text-sm text-amber-950 mt-1 leading-relaxed font-medium">
              {language === "te" ? selectedDay.precautionTe : selectedDay.precaution}
            </p>
          </div>
        </div>
      </div>

      {/* 7-Day Grid Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span>{language === "te" ? "7 రోజుల వాతావరణ అంచనా పట్టిక" : "7-Day Weather Outlook"}</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {cachedForecast.map((d, idx) => {
            const isSelected = selectedDay.date === d.date;
            return (
              <button
                key={idx}
                onClick={() => setSelectedDay(d)}
                className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                  isSelected
                    ? "bg-emerald-700 text-white border-emerald-700 shadow-xs font-bold"
                    : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50"
                }`}
              >
                <span className="text-xs font-bold block">{d.dayName}</span>
                <span className={`text-[10px] block ${isSelected ? "text-emerald-100" : "text-slate-400"}`}>{d.date.slice(5)}</span>
                <div className="my-2">{getWeatherIcon(d.condition)}</div>
                <div className="text-xs font-bold">
                  {d.tempMax}° / {d.tempMin}°
                </div>
                <span className={`text-[10px] mt-1 block ${isSelected ? "text-emerald-100" : "text-slate-500"}`}>💧 {d.rainProbability}%</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
