import React, { useState, useEffect } from "react";
import { FarmerProfile, Language, EmergencyContact } from "../types";
import { defaultFarmerProfile } from "../data/mockData";
import {
  locationHierarchy,
  getStates,
  getDistricts,
  getMandals,
  getVillages,
  VillageInfo
} from "../data/locationData";
import { X, UserPlus, LogIn, Lock, Phone, MapPin, Sprout, ShieldAlert, CheckCircle2, Mail, KeyRound, AlertCircle, ArrowLeft, RotateCcw, Zap, PhoneCall, MessageSquare } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currentProfile?: FarmerProfile;
  onSaveProfile?: (updated: FarmerProfile) => void;
  onLoginSuccess?: (updated: FarmerProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  language,
  currentProfile,
  onSaveProfile,
  onLoginSuccess
}) => {
  const profile = currentProfile || defaultFarmerProfile;
  const [mode, setMode] = useState<"login" | "register" | "forgot">("register");

  // Login state
  const [loginPhone, setLoginPhone] = useState(profile.mobileNumber || "9848012345");
  const [loginPassword, setLoginPassword] = useState("farmer123");

  // Registration state
  const [fullName, setFullName] = useState(profile.fullName || "");
  const [age, setAge] = useState<string | number>(profile.age || 35);
  const [gender, setGender] = useState<"Male" | "Female" | "Other">(profile.gender || "Male");
  const [mobileNumber, setMobileNumber] = useState(profile.mobileNumber || "9848012345");
  const [email, setEmail] = useState(profile.email || "");
  const [password, setPassword] = useState("farmer123");
  const [confirmPassword, setConfirmPassword] = useState("farmer123");
  const [village, setVillage] = useState(profile.village || "");
  const [mandal, setMandal] = useState(profile.mandal || "");
  const [district, setDistrict] = useState(profile.district || "");
  const [state, setState] = useState(profile.state || "");
  const [pinCode, setPinCode] = useState(profile.pinCode || "");
  const [farmLocation, setFarmLocation] = useState(profile.farmLocation || "");
  const [landAreaAcres, setLandAreaAcres] = useState<number>(profile.landAreaAcres || 1);
  const [soilType, setSoilType] = useState<FarmerProfile["soilType"]>(profile.soilType || "Black Cotton Soil");
  const [cropDetails, setCropDetails] = useState(profile.cropDetails || "");

  // Emergency Contacts
  const [ec1Name, setEc1Name] = useState(profile.emergencyContact1?.name || "");
  const [ec1Phone, setEc1Phone] = useState(profile.emergencyContact1?.phone || "");
  const [ec1Relation, setEc1Relation] = useState(profile.emergencyContact1?.relation || "");

  const [ec2Name, setEc2Name] = useState(profile.emergencyContact2?.name || "");
  const [ec2Phone, setEc2Phone] = useState(profile.emergencyContact2?.phone || "");
  const [ec2Relation, setEc2Relation] = useState(profile.emergencyContact2?.relation || "");

  const [ec3Name, setEc3Name] = useState(profile.emergencyContact3?.name || "");
  const [ec3Phone, setEc3Phone] = useState(profile.emergencyContact3?.phone || "");
  const [ec3Relation, setEc3Relation] = useState(profile.emergencyContact3?.relation || "");

  // Forgot Password state
  const [forgotTarget, setForgotTarget] = useState("");
  const [forgotStep, setForgotStep] = useState<1 | 2>(1);
  const [otpInput, setOtpInput] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("1234");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  // Location dropdown cascading state
  const statesList = getStates();
  const availableDistricts = getDistricts(state);
  const availableMandals = getMandals(state, district);
  const availableVillages = getVillages(state, district, mandal);

  const handleStateChange = (newSt: string) => {
    setState(newSt);
    const dists = getDistricts(newSt);
    const newDist = dists.length > 0 ? dists[0] : "";
    setDistrict(newDist);
    const mnds = getMandals(newSt, newDist);
    const newMnd = mnds.length > 0 ? mnds[0] : "";
    setMandal(newMnd);
    const vills = getVillages(newSt, newDist, newMnd);
    if (vills.length > 0) {
      setVillage(vills[0].name);
      setPinCode(vills[0].pincode);
    }
  };

  const handleDistrictChange = (newDist: string) => {
    setDistrict(newDist);
    const mnds = getMandals(state, newDist);
    const newMnd = mnds.length > 0 ? mnds[0] : "";
    setMandal(newMnd);
    const vills = getVillages(state, newDist, newMnd);
    if (vills.length > 0) {
      setVillage(vills[0].name);
      setPinCode(vills[0].pincode);
    }
  };

  const handleMandalChange = (newMnd: string) => {
    setMandal(newMnd);
    const vills = getVillages(state, district, newMnd);
    if (vills.length > 0) {
      setVillage(vills[0].name);
      setPinCode(vills[0].pincode);
    }
  };

  const handleVillageChange = (vName: string) => {
    setVillage(vName);
    const found = availableVillages.find((v) => v.name === vName);
    if (found && found.pincode) {
      setPinCode(found.pincode);
    }
  };

  const notifySave = (updated: FarmerProfile) => {
    if (onSaveProfile) onSaveProfile(updated);
    if (onLoginSuccess) onLoginSuccess(updated);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: FarmerProfile = {
      ...profile,
      mobileNumber: loginPhone,
      isLoggedIn: true,
    };
    notifySave(updated);
    setSuccessMsg(language === "te" ? "ల్యాగిన్ విజయవంతమైంది!" : "Login Successful!");
    setTimeout(() => {
      setSuccessMsg("");
      onClose();
    }, 800);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg(
        language === "te"
          ? "పాస్‌వర్డ్ మరియు కన్‌ఫర్మ్ పాస్‌వర్డ్ సరిపోలలేదు!"
          : "Password and Confirm Password do not match!"
      );
      return;
    }

    const updatedProfile: FarmerProfile = {
      fullName,
      age: Number(age) || 35,
      gender,
      mobileNumber,
      email,
      village,
      mandal,
      district,
      state,
      pinCode,
      farmLocation,
      landAreaAcres: Number(landAreaAcres) || 1,
      soilType,
      cropDetails,
      emergencyContact1: {
        id: "ec1",
        name: ec1Name || "Emergency Contact 1",
        phone: ec1Phone || "9440188223",
        relation: ec1Relation || "Family",
        isMandatory: true,
      },
      emergencyContact2: {
        id: "ec2",
        name: ec2Name || "Emergency Contact 2",
        phone: ec2Phone || "9848122334",
        relation: ec2Relation || "Relative",
        isMandatory: true,
      },
      emergencyContact3: ec3Name
        ? {
            id: "ec3",
            name: ec3Name,
            phone: ec3Phone,
            relation: ec3Relation,
            isMandatory: false,
          }
        : undefined,
      isLoggedIn: false,
    };

    if (onSaveProfile) onSaveProfile(updatedProfile);
    setLoginPhone(mobileNumber);
    setLoginPassword(password);

    setSuccessMsg(
      language === "te"
        ? "రిజిస్ట్రేషన్ విజయవంతమైంది! దయచేసి మీ మొబైల్ మరియు పాస్‌వర్డ్‌తో లాగిన్ అవ్వండి."
        : "Registration Successful! Please sign in with your mobile number and password."
    );
    setTimeout(() => {
      setSuccessMsg("");
      setMode("login");
    }, 1000);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!forgotTarget.trim()) {
      setErrorMsg(
        language === "te"
          ? "దయచేసి మీ ఈమెయిల్ లేదా మొబైల్ నంబర్ నమోదు చేయండి."
          : "Please enter your registered Email or Mobile Number."
      );
      return;
    }

    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setForgotStep(2);
    setSuccessMsg(
      language === "te"
        ? `ఓటీపీ సఫలంగా పంపబడింది! (డెమో OTP పిన్: ${code})`
        : `OTP sent successfully! (Demo verification code: ${code})`
    );
  };

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (otpInput.trim() !== generatedOtp && otpInput.trim() !== "1234") {
      setErrorMsg(
        language === "te"
          ? "చెల్లని ఓటీపీ పిన్! సరైన ఓటీపీని నమోదు చేయండి."
          : "Invalid OTP! Please enter the correct verification code."
      );
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMsg(
        language === "te"
          ? "కొత్త పాస్‌వర్డ్‌లు సరిపోలలేదు!"
          : "New passwords do not match!"
      );
      return;
    }

    if (!newPassword || newPassword.length < 4) {
      setErrorMsg(
        language === "te"
          ? "పాస్‌వర్డ్ కనీసం 4 అక్షరాలు ఉండాలి."
          : "Password must be at least 4 characters long."
      );
      return;
    }

    setLoginPassword(newPassword);
    setPassword(newPassword);
    setConfirmPassword(newPassword);

    setSuccessMsg(
      language === "te"
        ? "పాస్‌వర్డ్ విజయవంతంగా మార్చబడింది! లాగిన్ ద్వారా ప్రవేశించండి."
        : "Password updated successfully! You can now sign in with your new password."
    );

    setTimeout(() => {
      setMode("login");
      setForgotStep(1);
      setForgotTarget("");
      setOtpInput("");
      setNewPassword("");
      setConfirmNewPassword("");
      setErrorMsg("");
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto text-slate-900 my-8">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 sm:p-5 flex items-center justify-between z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {mode === "register"
                  ? language === "te"
                    ? "👨‍🌾 రైతు వివరాల నమోదు (Registration)"
                    : "👨‍🌾 Farmer Registration & Profile Setup"
                  : mode === "login"
                  ? language === "te"
                    ? "🔐 రైతు లాగిన్ (Login)"
                    : "🔐 Farmer Portal Login"
                  : language === "te"
                  ? "🔑 పాస్‌వర్డ్ పునరుద్ధరణ (Forgot Password)"
                  : "🔑 Password Recovery"}
              </h2>
              <p className="text-xs text-slate-500">
                AgriSaathi AI - Smart Farmer Assistance & Safety
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setErrorMsg("");
              setSuccessMsg("");
            }}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition cursor-pointer ${
              mode === "register"
                ? "bg-white text-emerald-700 border-b-2 border-emerald-600 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>{language === "te" ? "కొత్త నమోదు (Register)" : "Register Profile"}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setErrorMsg("");
              setSuccessMsg("");
            }}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition cursor-pointer ${
              mode === "login"
                ? "bg-white text-emerald-700 border-b-2 border-emerald-600 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>{language === "te" ? "లాగిన్ (Login)" : "Sign In"}</span>
          </button>
          {mode === "forgot" && (
            <button
              type="button"
              className="flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 bg-white text-amber-700 border-b-2 border-amber-500 shadow-xs"
            >
              <KeyRound className="w-4 h-4" />
              <span>{language === "te" ? "పాస్‌వర్డ్ మార్పు" : "Forgot Password"}</span>
            </button>
          )}
        </div>

        {/* Success & Error Alerts */}
        {successMsg && (
          <div className="m-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-2 text-emerald-900 text-xs sm:text-sm animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-bold">{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="m-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center space-x-2 text-rose-900 text-xs sm:text-sm animate-fade-in">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span className="font-bold">{errorMsg}</span>
          </div>
        )}

        {/* Body Form */}
        <div className="p-4 sm:p-6 space-y-6">
          {mode === "login" ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4 max-w-md mx-auto py-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === "te" ? "మొబైల్ నంబర్ (Mobile Number)" : "Mobile Number"}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    placeholder="9848012345"
                    className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    {language === "te" ? "పాస్‌వర్డ్ (Password)" : "Password"}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("forgot");
                      setForgotStep(1);
                      setErrorMsg("");
                      setSuccessMsg("");
                    }}
                    className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                  >
                    {language === "te" ? "పాస్‌వర్డ్ మరిచిపోయారా?" : "Forgot Password?"}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl transition text-sm shadow-xs mt-4 cursor-pointer"
              >
                {language === "te" ? "ప్రవేశించండి (Login)" : "Sign In to Account"}
              </button>
            </form>
          ) : mode === "forgot" ? (
            /* Forgot Password Form */
            <div className="max-w-md mx-auto py-2 space-y-4">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className="inline-flex items-center space-x-1.5 text-xs text-slate-600 hover:text-emerald-700 font-semibold cursor-pointer mb-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{language === "te" ? "తిరిగి లాగిన్‌కు వెళ్ళండి" : "Back to Sign In"}</span>
              </button>

              {forgotStep === 1 ? (
                <form onSubmit={handleSendOtp} className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm border-b border-slate-200 pb-2">
                    <KeyRound className="w-5 h-5 text-emerald-600" />
                    <span>{language === "te" ? "పాస్‌వర్డ్ పునరుద్ధరణ (Enter Email or Mobile)" : "Reset Password via Mobile / Email"}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {language === "te"
                      ? "మీ ఖాతాతో నమోదైన ఈమెయిల్ ఐడీ లేదా మొబైల్ నంబర్‌ను ఇక్కడ ఇవ్వండి. మేము భద్రతా ఓటీపీ పంపుతాము."
                      : "Enter your registered Email address or Mobile Number. We will send you a verification OTP to reset your password."}
                  </p>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {language === "te" ? "మొబైల్ నంబర్ / ఈమెయిల్ ఐడీ *" : "Mobile Number / Email ID *"}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={forgotTarget}
                        onChange={(e) => setForgotTarget(e.target.value)}
                        placeholder={language === "te" ? "ఉదా: 9848012345 లేదా farmer@gmail.com" : "e.g. 9848012345 or farmer@gmail.com"}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl transition text-xs sm:text-sm shadow-xs cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>{language === "te" ? "ఓటీపీ కోడ్ పంపండి (Send Verification OTP)" : "Send Verification OTP"}</span>
                  </button>
                </form>
              ) : (
                <form onSubmit={handleResetPasswordSubmit} className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm border-b border-slate-200 pb-2">
                    <ShieldAlert className="w-5 h-5 text-emerald-600" />
                    <span>{language === "te" ? "ఓటీపీ మరియు కొత్త పాస్‌వర్డ్" : "Verify OTP & Set New Password"}</span>
                  </div>

                  <div className="bg-emerald-100/60 p-2.5 rounded-xl border border-emerald-300 text-[11px] text-emerald-900 font-medium flex items-center justify-between">
                    <span>
                      {language === "te"
                        ? `పంపిన ప్రాంతం: ${forgotTarget}`
                        : `Verification code dispatched to: ${forgotTarget}`}
                    </span>
                    <span className="font-mono font-bold bg-emerald-800 text-white px-2 py-0.5 rounded text-[10px]">
                      OTP: {generatedOtp || "1234"}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-slate-700">
                        {language === "te" ? "4-అంకెల ఓటీపీ పిన్ (4-Digit OTP) *" : "4-Digit OTP Code *"}
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const code = Math.floor(1000 + Math.random() * 9000).toString();
                          setGeneratedOtp(code);
                          setSuccessMsg(
                            language === "te"
                              ? `మళ్ళీ ఓటీపీ పంపబడింది! (డెమో OTP: ${code})`
                              : `New OTP re-sent! (Demo verification code: ${code})`
                          );
                        }}
                        className="text-[11px] text-emerald-700 font-bold hover:underline flex items-center space-x-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>{language === "te" ? "మళ్ళీ పంపు (Resend)" : "Resend OTP"}</span>
                      </button>
                    </div>

                    <input
                      type="text"
                      maxLength={6}
                      required
                      placeholder="e.g. 1234"
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-center text-base font-bold tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>

                  {/* OTP Emergency Fallback Card for Low Network */}
                  <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 text-xs space-y-2">
                    <div className="flex items-center space-x-1.5 text-amber-900 font-bold">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>
                        {language === "te"
                          ? "⚡ ఓటీపీ మెసేజ్ రావట్లేదా? (Network Delay?)"
                          : "⚡ OTP SMS Delayed / Not Arriving?"}
                      </span>
                    </div>

                    <p className="text-[11px] text-amber-800 leading-snug">
                      {language === "te"
                        ? "నెట్‌వర్క్ సిగ్నల్ బలహీనంగా ఉంటే, ఉచిత అత్యవసర ఎమర్జెన్సీ కోడ్ 1234 ఉపయోగించి వెంటనే పాస్‌వర్డ్ మార్చుకోవచ్చు."
                        : "If mobile network is weak, use the instant Emergency Master Code 1234 to reset your password immediately without waiting."}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setOtpInput("1234")}
                        className="px-2.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] rounded-lg transition shadow-2xs flex items-center space-x-1 cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>{language === "te" ? "1234 కోడ్‌ని స్వయంచాలకంగా పూరించు" : "Auto-Fill Emergency Code (1234)"}</span>
                      </button>

                      <a
                        href="tel:18001801551"
                        className="px-2.5 py-1.5 bg-white border border-amber-300 hover:bg-amber-100 text-amber-900 font-semibold text-[11px] rounded-lg transition flex items-center space-x-1 cursor-pointer"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-amber-700" />
                        <span>{language === "te" ? "ఉచిత సహాయం 1800-180-1551" : "Helpline 1800-180-1551"}</span>
                      </a>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {language === "te" ? "కొత్త పాస్‌వర్డ్ (New Password) *" : "New Password *"}
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {language === "te" ? "కొత్త పాస్‌వర్డ్ సరిచూడండి (Confirm New Password) *" : "Confirm New Password *"}
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl transition text-xs sm:text-sm shadow-xs cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{language === "te" ? "పాస్‌వర్డ్ మార్చండి & లాగిన్ అవ్వండి" : "Update Password & Continue"}</span>
                  </button>
                </form>
              )}
            </div>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              {/* Section 1: Personal Info */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">1</span>
                  <span>{language === "te" ? "వ్యక్తిగత వివరాలు (Personal Information)" : "Personal Information"}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Age *</label>
                    <input
                      type="number"
                      required
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Gender *</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    >
                      <option value="Male">Male (పురుషుడు)</option>
                      <option value="Female">Female (స్త్రీ)</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Account Password *</label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Confirm Password * (కన్‌ఫర్మ్ పాస్‌వర్డ్)</label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Address & Location (Dropdown Selectors for State, District, Mandal, Village) */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>{language === "te" ? "ప్రాంత ఎంపిక (State, District, Mandal & Village Dropdowns)" : "Location & Address Dropdowns"}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {/* 1. State Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">State (రాష్ట్రం) *</label>
                    <select
                      value={state}
                      onChange={(e) => handleStateChange(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    >
                      <option value="">-- Select State --</option>
                      {statesList.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                      {!statesList.includes(state) && state && (
                        <option value={state}>{state}</option>
                      )}
                    </select>
                  </div>

                  {/* 2. District Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">District (జిల్లా) *</label>
                    <select
                      value={district}
                      onChange={(e) => handleDistrictChange(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    >
                      <option value="">-- Select District --</option>
                      {availableDistricts.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                      {!availableDistricts.includes(district) && district && (
                        <option value={district}>{district}</option>
                      )}
                    </select>
                  </div>

                  {/* 3. Mandal Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Mandal (మండలం) *</label>
                    <select
                      value={mandal}
                      onChange={(e) => handleMandalChange(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    >
                      <option value="">-- Select Mandal --</option>
                      {availableMandals.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                      {!availableMandals.includes(mandal) && mandal && (
                        <option value={mandal}>{mandal}</option>
                      )}
                    </select>
                  </div>

                  {/* 4. Village Dropdown & Custom Field */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Village (గ్రామం) *</label>
                    <select
                      value={village}
                      onChange={(e) => handleVillageChange(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none mb-1.5"
                    >
                      <option value="">-- Select Village --</option>
                      {availableVillages.map((v) => (
                        <option key={v.name} value={v.name}>
                          {v.name}
                        </option>
                      ))}
                      {village && !availableVillages.some((v) => v.name === village) && (
                        <option value={village}>{village}</option>
                      )}
                    </select>
                    <input
                      type="text"
                      placeholder="Or type village name..."
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  {/* 5. PIN Code */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">PIN Code *</label>
                    <input
                      type="text"
                      required
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  {/* 6. Farm Location */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Farm Landmark / GPS</label>
                    <input
                      type="text"
                      value={farmLocation}
                      onChange={(e) => setFarmLocation(e.target.value)}
                      placeholder="e.g. Near Canal Water Tank"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Farm & Crop Details */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <Sprout className="w-4 h-4 text-emerald-600" />
                  <span>{language === "te" ? "పొలం & పంట వివరాలు (Farm & Crop Details)" : "Farm & Crop Details"}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Land Area (Acres) *</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={landAreaAcres}
                      onChange={(e) => setLandAreaAcres(parseFloat(e.target.value) || 1)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Soil Type (నేల రకం) *</label>
                    <select
                      value={soilType}
                      onChange={(e) => setSoilType(e.target.value as any)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    >
                      <option value="Black Cotton Soil">Black Cotton Soil (నల్లరేగడి నేల)</option>
                      <option value="Red Loamy Soil">Red Loamy Soil (ఎర్ర నేల)</option>
                      <option value="Sandy Loam">Sandy Loam (ఇసుక నేల)</option>
                      <option value="Clay Soil">Clay Soil (బంకమన్ను నేల)</option>
                      <option value="Alluvial Soil">Alluvial Soil (ఒండ్రు నేల)</option>
                      <option value="Laterite Soil">Laterite Soil (లేటరైట్ నేల)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Crop Details (పంటలు) *</label>
                    <input
                      type="text"
                      required
                      value={cropDetails}
                      onChange={(e) => setCropDetails(e.target.value)}
                      placeholder="e.g. Paddy, Cotton, Red Chilli"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Emergency Contacts (Mandatory 1 & 2) */}
              <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-200 space-y-4">
                <h3 className="text-sm font-bold text-rose-900 flex items-center space-x-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>
                    {language === "te"
                      ? "అత్యవసర సమాచార నంబర్లు (Emergency Contacts - mandatory 1 & 2)"
                      : "Emergency Safety Contacts (Mandatory Contact 1 & 2)"}
                  </span>
                </h3>

                {/* Contact 1 */}
                <div className="bg-white p-3 rounded-lg border border-rose-200 space-y-2">
                  <span className="text-xs font-bold text-rose-700">Contact 1 (Mandatory - ప్రధాన నంబరు) *</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Name (పేరు)"
                      value={ec1Name}
                      onChange={(e) => setEc1Name(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone (ఫోన్ నంబర్)"
                      value={ec1Phone}
                      onChange={(e) => setEc1Phone(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    />
                    <input
                      type="text"
                      placeholder="Relation (సంబంధం e.g. Brother)"
                      value={ec1Relation}
                      onChange={(e) => setEc1Relation(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                {/* Contact 2 */}
                <div className="bg-white p-3 rounded-lg border border-rose-200 space-y-2">
                  <span className="text-xs font-bold text-rose-700">Contact 2 (Mandatory - రెండవ నంబరు) *</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Name (పేరు)"
                      value={ec2Name}
                      onChange={(e) => setEc2Name(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone (ఫోన్ నంబర్)"
                      value={ec2Phone}
                      onChange={(e) => setEc2Phone(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    />
                    <input
                      type="text"
                      placeholder="Relation (సంబంధం e.g. Spouse)"
                      value={ec2Relation}
                      onChange={(e) => setEc2Relation(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                {/* Contact 3 Optional */}
                <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-700">Contact 3 (Optional - మూడవ నంబరు)</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Name (పేరు)"
                      value={ec3Name}
                      onChange={(e) => setEc3Name(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    />
                    <input
                      type="tel"
                      placeholder="Phone (ఫోన్ నంబర్)"
                      value={ec3Phone}
                      onChange={(e) => setEc3Phone(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    />
                    <input
                      type="text"
                      placeholder="Relation (e.g. Village Sarpanch)"
                      value={ec3Relation}
                      onChange={(e) => setEc3Relation(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-xs transition text-sm flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Sprout className="w-5 h-5" />
                  <span>
                    {language === "te"
                      ? "రైతు ప్రొఫైల్ భద్రపరచు (Save Registration)"
                      : "Save Farmer Profile & Complete Setup"}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
