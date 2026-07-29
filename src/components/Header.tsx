import React, { useState } from "react";
import { Language, FarmerProfile, NotificationItem } from "../types";
import { defaultFarmerProfile } from "../data/mockData";
import { LANGUAGES, t, getLanguageName } from "../utils/i18n";
import {
  Sprout,
  Languages,
  UserCheck,
  Bell,
  AlertTriangle,
  ChevronDown,
  Menu,
  X,
  PhoneCall,
  ShieldCheck,
  Globe,
  LogOut,
  LogIn
} from "lucide-react";

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  farmer?: FarmerProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAuth?: () => void;
  onOpenProfile?: () => void;
  onTriggerSOS?: () => void;
  notifications?: NotificationItem[];
  onMarkNotificationRead?: (id: string) => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  farmer: initialFarmer,
  activeTab,
  setActiveTab,
  onOpenAuth,
  onOpenProfile,
  onTriggerSOS,
  notifications = [],
  onMarkNotificationRead,
  isLoggedIn = true,
  onLogout
}) => {
  const farmer = initialFarmer || defaultFarmerProfile;
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const safeNotifs = notifications || [];
  const unreadCount = safeNotifs.filter((n) => !n.read).length;

  const navItems = [
    { id: "dashboard", label: t("dashboard", language), icon: "📊" },
    { id: "ai-assistant", label: t("aiAssistant", language), icon: "🤖" },
    { id: "crop-disease", label: t("cropDisease", language), icon: "📷" },
    { id: "smart-farming", label: t("smartFarming", language), icon: "🌱" },
    { id: "weather", label: t("weather", language), icon: "🌦" },
    { id: "market", label: t("market", language), icon: "💰" },
    { id: "financial", label: t("calculators", language), icon: "📏" },
    { id: "emergency", label: t("emergency", language), icon: "🚨" },
    { id: "agri-store", label: t("agriStore", language), icon: "🛒" },
    { id: "3d-showcase", label: t("showcase3d", language), icon: "📦" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md text-slate-900 border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side: Hamburger menu + Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 border border-slate-200 xl:hidden text-slate-700 hover:bg-slate-200 cursor-pointer shadow-2xs"
              title="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab("dashboard")}>
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white shadow-xs flex items-center justify-center">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-xl tracking-tight text-slate-900 font-sans">
                    AgriSaathi
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-full uppercase tracking-wider">
                    AI Ecosystem
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 -mt-0.5 hidden sm:block">
                  {t("tagline", language)} • <span className="text-emerald-700 font-medium">By Lokesh Channamallu for AP & TS Farmers</span>
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all duration-150 flex items-center space-x-1.5 ${
                    isActive
                      ? "bg-emerald-700 text-white font-semibold shadow-xs shadow-emerald-700/20"
                      : "text-slate-600 hover:text-emerald-700 hover:bg-slate-100 font-medium"
                  }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Multi-Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowLangMenu(!showLangMenu);
                  setShowNotifs(false);
                  setShowProfileMenu(false);
                }}
                className="px-2.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition flex items-center space-x-1.5 cursor-pointer shadow-xs"
                title="Select Language / భాష ఎంచుకోండి"
              >
                <Globe className="w-4 h-4 text-emerald-600" />
                <span className="font-bold">{getLanguageName(language)}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 py-2 divide-y divide-slate-100 animate-fade-in">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>{t("selectLanguage", language)}</span>
                    <Globe className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="max-h-64 overflow-y-auto py-1">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setShowLangMenu(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition cursor-pointer ${
                          language === lang.code
                            ? "bg-emerald-50 text-emerald-800 font-bold border-l-2 border-emerald-600"
                            : "text-slate-700 hover:bg-slate-50 font-medium"
                        }`}
                      >
                        <span className="flex items-center space-x-2">
                          <span>{lang.flag}</span>
                          <span>{lang.nativeName}</span>
                        </span>
                        <span className="text-[10px] text-slate-400">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Emergency SOS Quick Trigger */}
            <button
              onClick={onTriggerSOS}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-xs transition duration-150 flex items-center space-x-1.5 animate-pulse"
            >
              <AlertTriangle className="w-4 h-4 text-amber-200" />
              <span className="hidden sm:inline">SOS</span>
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifs(!showNotifs)}
                className="p-2 rounded-lg bg-slate-100 border border-slate-200 hover:bg-slate-200 transition relative text-slate-700"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center border border-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifs && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden text-slate-900">
                  <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      {language === "te" ? "రైతు సూచనలు & హెచ్చరికలు" : "Farmer Notifications"}
                    </span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                      {unreadCount} {language === "te" ? "కొత్తవి" : "New"}
                    </span>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {safeNotifs.length === 0 ? (
                      <p className="p-4 text-xs text-center text-slate-500">
                        {language === "te" ? "సూచనలు ఏవీ లేవు" : "No notifications right now."}
                      </p>
                    ) : (
                      safeNotifs.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => onMarkNotificationRead?.(n.id)}
                          className={`p-3 text-xs cursor-pointer hover:bg-slate-50 transition space-y-1 ${
                            !n.read ? "bg-emerald-50/60 font-semibold border-l-2 border-emerald-600" : "opacity-80"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-emerald-900 font-bold flex items-center space-x-1">
                              {(n.type === "soil" || n.type === "fertilizer") && <span className="text-emerald-600">🌱</span>}
                              <span>{language === "te" ? n.titleTe : n.title}</span>
                            </span>
                            <span className="text-[10px] text-slate-400 shrink-0 ml-1">{n.timestamp}</span>
                          </div>
                          <p className="text-slate-600 text-[11px] leading-relaxed">
                            {language === "te" ? n.messageTe : n.message}
                          </p>
                          {n.soilTypeTag && (
                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                                🏷️ {n.soilTypeTag}
                              </span>
                              {n.fertilizerDose && (
                                <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded">
                                  💊 {n.fertilizerDose}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu / Auth Button */}
            <div className="relative">
              {!isLoggedIn ? (
                <button
                  onClick={onOpenAuth}
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-xs cursor-pointer"
                >
                  <LogIn className="w-4 h-4 text-amber-300" />
                  <span>{language === "te" ? "ల్యాగిన్ / నమోదు" : "Login / Register"}</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 p-1.5 rounded-lg bg-slate-100 border border-slate-200 hover:bg-slate-200 transition cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                    {farmer.fullName.charAt(0)}
                  </div>
                  <span className="text-xs font-medium text-slate-800 hidden md:inline max-w-[100px] truncate">
                    {farmer.fullName}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden md:inline" />
                </button>
              )}

              {showProfileMenu && isLoggedIn && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden text-xs text-slate-800">
                  <div className="p-3 bg-slate-50 border-b border-slate-200">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-slate-900 truncate">{farmer.fullName}</p>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold uppercase">Active</span>
                    </div>
                    <p className="text-[11px] text-emerald-700 truncate mt-0.5">
                      {farmer.village}, {farmer.district}, {farmer.state}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      🌾 {farmer.landAreaAcres} Acres | {farmer.soilType}
                    </p>
                  </div>
                  <div className="p-1 space-y-0.5">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        if (onOpenProfile) onOpenProfile();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition flex items-center space-x-2 font-medium cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4 text-emerald-600" />
                      <span>{language === "te" ? "రైతు ప్రొఫైల్ వివరాలు" : "View / Edit Profile"}</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        if (onOpenAuth) onOpenAuth();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition flex items-center space-x-2 font-medium cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-slate-500" />
                      <span>{language === "te" ? "ఖాతా మార్చండి (Switch Account)" : "Switch Account"}</span>
                    </button>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        if (onLogout) onLogout();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-rose-700 hover:bg-rose-50 transition flex items-center space-x-2 font-bold cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-600" />
                      <span>{language === "te" ? "లాగౌట్ (నిష్క్రమించు)" : "Log Out"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center space-x-2 ${
                activeTab === item.id
                  ? "bg-emerald-700 text-white font-semibold"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
