import React from "react";
import { FarmerProfile, Language } from "../types";
import { defaultFarmerProfile } from "../data/mockData";
import { UserCheck, MapPin, Phone, ShieldAlert, Sprout, Edit3, ArrowLeft, LogOut } from "lucide-react";
import { GovernmentBenefitsSection } from "./GovernmentBenefitsSection";

interface FarmerProfileViewProps {
  farmer?: FarmerProfile;
  language: Language;
  onEditProfile: () => void;
  onBackToDashboard: () => void;
  onLogout?: () => void;
}

export const FarmerProfileView: React.FC<FarmerProfileViewProps> = ({
  farmer: initialFarmer,
  language,
  onEditProfile,
  onBackToDashboard,
  onLogout
}) => {
  const farmer = initialFarmer || defaultFarmerProfile;
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 text-slate-900">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToDashboard}
          className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center space-x-2 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-600" />
          <span>{language === "te" ? "డాష్‌బోర్డ్‌కు తిరిగి వెళ్ళు" : "Back to Dashboard"}</span>
        </button>

        <div className="flex items-center space-x-2">
          {onLogout && (
            <button
              onClick={onLogout}
              className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-rose-600" />
              <span>{language === "te" ? "లాగౌట్" : "Log Out"}</span>
            </button>
          )}

          <button
            onClick={onEditProfile}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 transition shadow-xs cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>{language === "te" ? "ప్రొఫైల్ సవరించు (Edit Profile)" : "Edit Profile"}</span>
          </button>
        </div>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs p-6 sm:p-8 space-y-8 text-slate-900">
        {/* Profile Card Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-2xl shadow-xs">
              {farmer.fullName.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{farmer.fullName}</h1>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                {farmer.gender}, {farmer.age} {language === "te" ? "సంవత్సరాలు" : "Years"} | {farmer.mobileNumber}
              </p>
              <p className="text-xs text-slate-500 flex items-center space-x-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {farmer.village}, {farmer.mandal}, {farmer.district}, {farmer.state} - {farmer.pinCode}
                </span>
              </p>
            </div>
          </div>
          <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-right">
            <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-bold">
              {language === "te" ? "పొలం వైశాల్యం" : "Land Area"}
            </span>
            <span className="text-xl font-bold text-emerald-700">{farmer.landAreaAcres} Acres</span>
          </div>
        </div>

        {/* 3 Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Farm & Soil Details */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-2">
              <Sprout className="w-4 h-4 text-emerald-600" />
              <span>{language === "te" ? "వ్యవసాయ & మట్టి వివరాలు" : "Farm & Soil Information"}</span>
            </h3>
            <div className="space-y-2 text-xs divide-y divide-slate-200/80">
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Soil Type (మట్టి రకం):</span>
                <span className="font-bold text-slate-900">{farmer.soilType}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Crop Details (పంటలు):</span>
                <span className="font-bold text-emerald-700">{farmer.cropDetails}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Primary Calendar Crop:</span>
                <span className="font-bold text-slate-900">{farmer.primaryCrop || "Chilli (మిరప)"}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Sowing Date (నాటిన తేది):</span>
                <span className="font-bold text-amber-800">{farmer.cropSowingDate || "2026-06-15"}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Farm GPS Landmark:</span>
                <span className="font-medium text-slate-800 truncate max-w-[140px]">{farmer.farmLocation}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Contact & Account */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-2">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>{language === "te" ? "ఖాతా & సమాచారం" : "Account & Contact"}</span>
            </h3>
            <div className="space-y-2 text-xs divide-y divide-slate-200/80">
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Mobile (ఫోన్):</span>
                <span className="font-bold text-slate-900">{farmer.mobileNumber}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Email:</span>
                <span className="font-medium text-slate-800">{farmer.email || "N/A"}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold text-emerald-700 flex items-center space-x-1">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Verified Farmer</span>
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Emergency Safety Contacts */}
          <div className="bg-rose-50/50 p-5 rounded-xl border border-rose-200 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>{language === "te" ? "అత్యవసర కాంటాక్ట్‌లు" : "Emergency Safety Contacts"}</span>
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-white border border-rose-200 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-900">{farmer.emergencyContact1.name}</p>
                  <p className="text-[10px] text-rose-700">{farmer.emergencyContact1.relation} (Contact 1)</p>
                </div>
                <span className="font-bold text-rose-700">{farmer.emergencyContact1.phone}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-rose-200 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-900">{farmer.emergencyContact2.name}</p>
                  <p className="text-[10px] text-rose-700">{farmer.emergencyContact2.relation} (Contact 2)</p>
                </div>
                <span className="font-bold text-rose-700">{farmer.emergencyContact2.phone}</span>
              </div>

              {farmer.emergencyContact3?.name && (
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-900">{farmer.emergencyContact3.name}</p>
                    <p className="text-[10px] text-slate-500">{farmer.emergencyContact3.relation} (Optional)</p>
                  </div>
                  <span className="font-bold text-slate-800">{farmer.emergencyContact3.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Government Benefits & PDF Application Generator Section */}
        <GovernmentBenefitsSection farmer={farmer} language={language} />
      </div>
    </div>
  );
};
