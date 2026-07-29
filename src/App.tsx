import React, { useState } from "react";
import { Language, FarmerProfile, ActiveTab, NotificationItem } from "./types";
import { defaultFarmerProfile, initialNotifications } from "./data/mockData";
import { Header } from "./components/Header";
import { AuthModal } from "./components/AuthModal";
import { Dashboard } from "./components/Dashboard";
import { FarmerProfileView } from "./components/FarmerProfileView";
import { AIAssistant } from "./components/AIAssistant";
import { CropDiseaseDetection } from "./components/CropDiseaseDetection";
import { SmartFarming } from "./components/SmartFarming";
import { WeatherIntelligence } from "./components/WeatherIntelligence";
import { EmergencyAssistance } from "./components/EmergencyAssistance";
import { MarketIntelligence } from "./components/MarketIntelligence";
import { FinancialCalculators } from "./components/FinancialCalculators";
import { ThreeDShowcase } from "./components/ThreeDShowcase";
import { AgriStore } from "./components/AgriStore";
import { ShieldAlert, Heart, LogOut, CheckCircle2, X } from "lucide-react";

export function App() {
  const [language, setLanguage] = useState<Language>("te");
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");
  const [farmer, setFarmer] = useState<FarmerProfile>(defaultFarmerProfile);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [logoutMessage, setLogoutMessage] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [assistantQuery, setAssistantQuery] = useState<string>("");
  const [sosBannerActive, setSosBannerActive] = useState<boolean>(false);

  const handleTriggerSOS = () => {
    setSosBannerActive(true);
    setActiveTab("emergency");
    setTimeout(() => {
      setSosBannerActive(false);
    }, 6000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    const msg = language === "te"
      ? "మీరు విజయవంతంగా నిష్క్రమించారు (Logged Out)! కొత్త లాగిన్ వరకు అతిథి మోడ్‌లో ఉన్నారు."
      : "You have logged out successfully! You can browse features or log back in anytime.";
    setLogoutMessage(msg);
    if (activeTab === "profile") {
      setActiveTab("dashboard");
    }
    setTimeout(() => {
      setLogoutMessage(null);
    }, 5000);
  };

  const handleAssistantPrompt = (promptText: string) => {
    setAssistantQuery(promptText);
    setActiveTab("ai-assistant");
  };

  const handleUpdateSowingDetails = (cropKey: string, sowingDate: string) => {
    setFarmer((prev) => ({
      ...prev,
      primaryCrop: cropKey,
      cropSowingDate: sowingDate,
    }));
  };

  const handleAddNotification = (newNotif: NotificationItem) => {
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Main Navigation Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        farmer={farmer}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenProfile={() => setActiveTab("profile")}
        onTriggerSOS={handleTriggerSOS}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
      />

      {/* Logout Toast Notification */}
      {logoutMessage && (
        <div className="bg-slate-900 text-white py-2.5 px-4 text-center font-bold text-xs sm:text-sm flex items-center justify-between max-w-2xl mx-auto w-full my-2 rounded-xl shadow-lg border border-slate-800 animate-fade-in z-50">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{logoutMessage}</span>
          </div>
          <button
            onClick={() => setLogoutMessage(null)}
            className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Emergency Active Banner Notification */}
      {sosBannerActive && (
        <div className="bg-rose-600 text-white py-2.5 px-4 text-center font-bold text-xs sm:text-sm animate-pulse flex items-center justify-center space-x-2 shadow-md sticky top-0 z-50">
          <ShieldAlert className="w-5 h-5 text-amber-200" />
          <span>
            {language === "te"
              ? "🚨 అత్యవసర SOS సంకేతం సక్రియం చేయబడింది! మీ కుటుంబ సభ్యులు & హెల్ప్‌లైన్ కు సందేశం వెళ్ళింది."
              : "🚨 EMERGENCY SOS DISPATCHED! Family contacts & Kisan helpline alerted with your GPS location."}
          </span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === "dashboard" && (
          <Dashboard
            language={language}
            farmer={farmer}
            notifications={notifications}
            setActiveTab={setActiveTab}
            onTriggerSOS={handleTriggerSOS}
            onAssistantPrompt={handleAssistantPrompt}
            onQuickAiQuery={handleAssistantPrompt}
            onUpdateSowingDetails={handleUpdateSowingDetails}
            onAddNotification={handleAddNotification}
          />
        )}

        {(activeTab === "ai-assistant" || activeTab === "ai-chat") && (
          <AIAssistant
            language={language}
            setLanguage={setLanguage}
            farmer={farmer}
            initialQuery={assistantQuery}
          />
        )}

        {activeTab === "crop-disease" && <CropDiseaseDetection language={language} />}

        {activeTab === "smart-farming" && (
          <SmartFarming language={language} farmer={farmer} />
        )}

        {activeTab === "weather" && <WeatherIntelligence language={language} />}

        {activeTab === "emergency" && (
          <EmergencyAssistance
            language={language}
            farmer={farmer}
            onTriggerSOS={handleTriggerSOS}
          />
        )}

        {activeTab === "market" && <MarketIntelligence language={language} />}

        {activeTab === "financial" && (
          <FinancialCalculators language={language} farmer={farmer} />
        )}

        {activeTab === "3d-showcase" && <ThreeDShowcase language={language} />}
        {activeTab === "agri-store" && <AgriStore language={language} />}

        {activeTab === "profile" && (
          <FarmerProfileView
            language={language}
            farmer={farmer}
            onEditProfile={() => setAuthModalOpen(true)}
            onBackToDashboard={() => setActiveTab("dashboard")}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        language={language}
        currentProfile={farmer}
        onSaveProfile={(updatedFarmer) => {
          setFarmer(updatedFarmer);
          setIsLoggedIn(true);
          setLogoutMessage(null);
        }}
        onLoginSuccess={(updatedFarmer) => {
          setFarmer(updatedFarmer);
          setIsLoggedIn(true);
          setLogoutMessage(null);
        }}
      />

      {/* Floating Bottom SOS Emergency Panic Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={handleTriggerSOS}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-xl shadow-rose-600/30 border-2 border-white flex flex-col items-center justify-center transition transform hover:scale-105 active:scale-95 animate-pulse cursor-pointer"
          title="Emergency SOS Panic Button (అత్యవసర బటన్)"
        >
          <ShieldAlert className="w-6 h-6 text-amber-200" />
          <span className="text-[10px] font-bold">SOS</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-center space-x-2 font-medium text-slate-700">
          <span>🌱 AgriSaathi AI • AI-Based Smart Farmer Assistance & Safety Ecosystem</span>
        </div>
        <p className="text-xs font-semibold text-slate-700 flex items-center justify-center space-x-1">
          <span>Designed with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 inline mx-0.5 fill-rose-500" />
          <span>by</span>
          <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">Lokesh Channamallu</span>
          <span>for Farmers across Andhra Pradesh & Telangana</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
