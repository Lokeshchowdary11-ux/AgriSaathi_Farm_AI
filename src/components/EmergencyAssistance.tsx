import React, { useState, useEffect, useRef } from "react";
import { Language, FarmerProfile, EmergencyLog } from "../types";
import { sampleEmergencyLogs, defaultFarmerProfile } from "../data/mockData";
import {
  AlertTriangle,
  Volume2,
  VolumeX,
  PhoneCall,
  MapPin,
  Send,
  ShieldAlert,
  History,
  CheckCircle2,
  Activity,
  Zap,
  RotateCcw,
  BellRing,
  Smartphone,
  ShieldCheck,
  AlertCircle,
  MessageSquare,
  Radio,
  Share2,
  Lightbulb
} from "lucide-react";

interface EmergencyAssistanceProps {
  language: Language;
  farmer?: FarmerProfile;
  onTriggerSOS: () => void;
}

export const EmergencyAssistance: React.FC<EmergencyAssistanceProps> = ({
  language,
  farmer: initialFarmer,
  onTriggerSOS
}) => {
  const farmer = initialFarmer || defaultFarmerProfile;
  const [sirenPlaying, setSirenPlaying] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);

  const [alertDispatched, setAlertDispatched] = useState(false);
  const [lastDispatchedReason, setLastDispatchedReason] = useState<string>("");
  const [emergencyLogs, setEmergencyLogs] = useState<EmergencyLog[]>(sampleEmergencyLogs);

  const [contacts, setContacts] = useState([
    { id: "ec1", name: farmer.emergencyContact1.name, phone: farmer.emergencyContact1.phone, relation: farmer.emergencyContact1.relation, priority: 1, action: "Automated Phone Call" },
    { id: "ec2", name: farmer.emergencyContact2.name, phone: farmer.emergencyContact2.phone, relation: farmer.emergencyContact2.relation, priority: 2, action: "Fallback Phone Call" },
    ...(farmer.emergencyContact3?.name ? [{ id: "ec3", name: farmer.emergencyContact3.name, phone: farmer.emergencyContact3.phone, relation: farmer.emergencyContact3.relation, priority: 3, action: "Fallback Phone Call" }] : [])
  ]);

  const handleUpdatePriority = (id: string, newPriority: number) => {
    setContacts(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, priority: newPriority, action: newPriority === 1 ? "Automated Phone Call" : "Fallback Phone Call" };
      } else if (c.priority === newPriority) {
        const fallbackPriority = c.priority === 1 ? 2 : 1;
        return { ...c, priority: fallbackPriority, action: fallbackPriority === 1 ? "Automated Phone Call" : "Fallback Phone Call" };
      }
      return c;
    }));
  };

  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyingContact, setVerifyingContact] = useState<{ id: string; name: string; phone: string } | null>(null);
  const [verifyStep, setVerifyStep] = useState<"SENDING" | "ENTER_CODE" | "SUCCESS">("SENDING");
  const [testCode, setTestCode] = useState("4829");
  const [enteredCode, setEnteredCode] = useState("");
  const [verifiedMap, setVerifiedMap] = useState<Record<string, boolean>>({ ec1: true });
  const [verifyError, setVerifyError] = useState("");

  const startNumberVerification = (contact: { id: string; name: string; phone: string }) => {
    setVerifyingContact(contact);
    setVerifyStep("SENDING");
    setEnteredCode("");
    setVerifyError("");
    setShowVerifyModal(true);
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setTestCode(code);

    setTimeout(() => {
      setVerifyStep("ENTER_CODE");
    }, 1500);
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredCode.trim() === testCode) {
      if (verifyingContact) {
        setVerifiedMap(prev => ({ ...prev, [verifyingContact.id]: true }));
      }
      setVerifyStep("SUCCESS");
      setTimeout(() => {
        setShowVerifyModal(false);
      }, 2000);
    } else {
      setVerifyError(language === "te" ? "తప్పు కోడ్. దయచేసి మళ్లీ ప్రయత్నించండి." : "Invalid test verification code. Please try again.");
    }
  };

  const [gpsLocation, setGpsLocation] = useState(farmer.farmLocation || "16.3067° N, 80.4365° E (Pedakakani)");
  const [strobeActive, setStrobeActive] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("/api/emergency/history");
        const data = await response.json();
        if (data && data.history && data.history.length > 0) {
          const serverLogs = data.history.map((log: any) => ({
            id: log.callSid || log.id || `server-log-${Date.now()}`,
            timestamp: log.initiatedAt ? new Date(log.initiatedAt).toLocaleString() : new Date().toLocaleString(),
            locationName: farmer.village + " Farm Plot",
            latLng: gpsLocation,
            contactsAlerted: log.contactCalled ? [`${log.contactCalled.name} (${log.contactCalled.phone})`] : log.contactsAttempted?.map((c: any) => `${c.name} (${c.phone})`) || [],
            status: log.status || "Unknown",
            notes: log.status === 'simulated_success' ? "Simulated API Dispatch (Missing Twilio Keys)" : `Twilio Call Status: ${log.status}`,
          }));
          
          setEmergencyLogs(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const newLogs = serverLogs.filter((l: any) => !existingIds.has(l.id));
            return [...newLogs, ...prev];
          });
        }
      } catch (e) {
        console.error("Failed to fetch emergency history", e);
      }
    };
    
    fetchHistory();
    const interval = setInterval(fetchHistory, 5000);
    return () => clearInterval(interval);
  }, [farmer.village, gpsLocation]);

  // Simulated Call & SMS States
  const [activeCallTarget, setActiveCallTarget] = useState<{ name: string; phone: string; relation?: string } | null>(null);
  const [callStatus, setCallStatus] = useState<"CONNECTING" | "CONNECTED" | "ENDED">("CONNECTING");
  const [callTimer, setCallTimer] = useState(0);
  const [smsToast, setSmsToast] = useState<{ name: string; phone: string } | null>(null);

  const startSimulatedCall = (contact: { name: string; phone: string; relation?: string }) => {
    setActiveCallTarget(contact);
    setCallStatus("CONNECTING");
    setCallTimer(0);
    // Also try opening tel: link
    try {
      window.open(`tel:${contact.phone}`, '_self');
    } catch (e) {
      // fallback
    }
    setTimeout(() => {
      setCallStatus("CONNECTED");
    }, 1800);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeCallTarget && callStatus === "CONNECTED") {
      interval = setInterval(() => {
        setCallTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeCallTarget, callStatus]);

  const triggerSimulatedSms = (contact: { name: string; phone: string }) => {
    setSmsToast(contact);
    try {
      window.open(`sms:${contact.phone}?body=${encodeURIComponent(sosText)}`, '_self');
    } catch (e) {
      // fallback
    }
    setTimeout(() => {
      setSmsToast(null);
    }, 4500);
  };

  const toggleStrobeAndVibration = () => {
    if (!strobeActive) {
      setStrobeActive(true);
      if (typeof window !== "undefined" && navigator.vibrate) {
        navigator.vibrate([500, 200, 500, 200, 500]);
      }
    } else {
      setStrobeActive(false);
      if (typeof window !== "undefined" && navigator.vibrate) {
        navigator.vibrate(0);
      }
    }
  };

  // Automatic Fall Detection States
  const [isFallDetectionActive, setIsFallDetectionActive] = useState(true);
  const [fallModalOpen, setFallModalOpen] = useState(false);
  const [fallCountdown, setFallCountdown] = useState(10);
  const [fallReason, setFallReason] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Emergency Message Preview
  const generateEmergencyMessage = (customNote?: string) => {
    const note = customNote ? ` (${customNote})` : "";
    return language === "te"
      ? `🚨 అత్యవసర సహాయ సంకేతం (SOS): రైతు ${farmer.fullName} గారు పొలంలో ప్రమాదంలో ఉన్నారు!${note} ప్రాంతం: ${gpsLocation}. ఫోన్: ${farmer.mobileNumber}. వెంటనే సంప్రదించండి! కాంటాక్ట్‌లు: 1) ${farmer.emergencyContact1.name} (${farmer.emergencyContact1.phone}), 2) ${farmer.emergencyContact2.name} (${farmer.emergencyContact2.phone}).`
      : `🚨 EMERGENCY SOS ALERT: Farmer ${farmer.fullName} needs immediate emergency assistance at farm location: ${gpsLocation}.${note} Phone: ${farmer.mobileNumber}. Alerted Contacts: 1) ${farmer.emergencyContact1.name} (${farmer.emergencyContact1.phone}), 2) ${farmer.emergencyContact2.name} (${farmer.emergencyContact2.phone}).`;
  };

  const [sosText, setSosText] = useState(generateEmergencyMessage());

  // Listen to device motion for real fall detection on mobile browsers
  useEffect(() => {
    if (!isFallDetectionActive) return;

    let lastTime = 0;
    const handleMotion = (event: DeviceMotionEvent) => {
      const now = Date.now();
      if (now - lastTime < 500) return; // limit check frequency

      const acc = event.accelerationIncludingGravity;
      if (acc && acc.x !== null && acc.y !== null && acc.z !== null) {
        const totalAcc = Math.sqrt(acc.x * acc.x + acc.y * acc.y + acc.z * acc.z);
        // Standard threshold for sudden fall/impact (~25 m/s²)
        if (totalAcc > 25 && !fallModalOpen) {
          lastTime = now;
          triggerFallAlert(
            language === "te"
              ? "ఫోన్ యాక్సిలెరోమీటర్ సెన్సార్ పతనాన్ని గుర్తించింది (Impact Detected > 25m/s²)"
              : "Sudden acceleration impact fall detected by motion sensor (>25m/s²)"
          );
        }
      }
    };

    if (window.DeviceMotionEvent) {
      window.addEventListener("devicemotion", handleMotion);
    }

    return () => {
      if (window.DeviceMotionEvent) {
        window.removeEventListener("devicemotion", handleMotion);
      }
    };
  }, [isFallDetectionActive, fallModalOpen, language]);

  // Handle countdown when Fall Modal is active
  useEffect(() => {
    if (fallModalOpen && fallCountdown > 0) {
      timerRef.current = setTimeout(() => {
        setFallCountdown((prev) => prev - 1);
      }, 1000);
    } else if (fallModalOpen && fallCountdown === 0) {
      // Auto Send SOS!
      handleAutoSendSOS();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [fallModalOpen, fallCountdown]);

  // Trigger Fall Alert overlay
  const triggerFallAlert = (reason: string) => {
    setFallReason(reason);
    setFallCountdown(10);
    setFallModalOpen(true);
    startSirenSound();
  };

  // Start siren sound programmatically
  const startSirenSound = () => {
    if (sirenPlaying) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(800, ctx.currentTime);

      let high = true;
      const interval = setInterval(() => {
        if (!ctx || ctx.state === "closed") {
          clearInterval(interval);
          return;
        }
        osc.frequency.setValueAtTime(high ? 1200 : 600, ctx.currentTime);
        high = !high;
      }, 250);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      setAudioCtx(ctx);
      setOscillator(osc);
      setSirenPlaying(true);
    } catch (e) {
      console.error("Audio synth error:", e);
    }
  };

  const stopSirenSound = () => {
    if (oscillator) {
      try {
        oscillator.stop();
        oscillator.disconnect();
      } catch (e) {}
    }
    setSirenPlaying(false);
    setOscillator(null);
  };

  // Web Audio Synthesized Alarm Siren Toggle
  const toggleSiren = () => {
    if (sirenPlaying) {
      stopSirenSound();
    } else {
      startSirenSound();
    }
  };

  const cancelFallAlert = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setFallModalOpen(false);
    stopSirenSound();
  };

  const handleAutoSendSOS = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setFallModalOpen(false);
    handleDispatchAlert("FALL_AUTO", fallReason || "Automatic Fall Impact Triggered");
  };

  const handleDispatchAlert = async (type: "MANUAL" | "FALL_AUTO" = "MANUAL", reasonDetails?: string) => {
    onTriggerSOS();
    startSirenSound();
    setAlertDispatched(true);
    setLastDispatchedReason(
      reasonDetails || (language === "te" ? "రైతు రెడ్ బటన్ ద్వారా పంపిన SOS" : "Manual Red Panic Button Trigger")
    );

    const primaryContact = contacts.find(c => c.priority === 1) || contacts[0];
    const otherContacts = contacts.filter(c => c.id !== primaryContact?.id);

    try {
      const response = await fetch("/api/emergency/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          farmerName: farmer.fullName || "Farmer",
          contacts: contacts.map(c => ({ name: c.name, phone: c.phone }))
        })
      });
      const data = await response.json();
      console.log("Twilio Dispatch Response:", data);
    } catch (e) {
      console.error("Error dispatching Twilio call:", e);
    }

    const newLog: EmergencyLog = {
      id: `sos-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      locationName: farmer.village + " Farm Plot",
      latLng: gpsLocation,
      contactsAlerted: contacts.map(c => `${c.name} (${c.phone}) [Priority ${c.priority}: ${c.action}]`),
      status: type === "FALL_AUTO" ? "Auto-Fall Dispatched" : "Triggered",
      notes:
        type === "FALL_AUTO"
          ? `AUTOMATIC FALL DETECTED: ${reasonDetails || "Farmer fell down in the field"}. Primary contact (${primaryContact?.name}) received automated phone call; other contacts received SMS alerts.`
          : `SOS triggered: Automated phone call placed to primary contact (${primaryContact?.name} - ${primaryContact?.phone}); SMS alerts dispatched to ${otherContacts.map(c => c.name).join(", ")}.`,
    };

    setEmergencyLogs((prev) => [newLog, ...prev]);

    setTimeout(() => {
      setAlertDispatched(false);
    }, 5000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 text-slate-900">
      {/* Header Banner */}
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white shadow-xs flex items-center justify-center animate-pulse">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-rose-950">
              {language === "te" ? "🚨 రైతు అత్యవసర రక్షణ (Emergency SOS)" : "🚨 Farmer Emergency Safety & Assistance System"}
            </h1>
            <p className="text-xs text-rose-700">
              {language === "te"
                ? "పాము కాటు, పడిపోవడం, కరెంట్ షాక్ సమయాల్లో సైరన్ మోగించడం & కుటుంబానికి రక్షణ మెసేజ్."
                : "Instant siren, automatic fall protection, GPS emergency message, SMS contact dispatch, & quick helplines."}
            </p>
          </div>
        </div>

        <button
          onClick={toggleSiren}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition cursor-pointer ${
            sirenPlaying
              ? "bg-rose-600 text-white animate-pulse"
              : "bg-white border border-rose-200 text-rose-700 hover:bg-rose-100"
          }`}
        >
          {sirenPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-rose-600" />}
          <span>
            {sirenPlaying
              ? language === "te"
                ? "సైరన్ ఆపు (Stop Siren)"
                : "Stop Siren Sound"
              : language === "te"
              ? "సైరన్ శబ్దం ప్లే చేయి"
              : "Play Loud Siren"}
          </span>
        </button>
      </div>

      {/* Automatic Fall Protection & Motion Sensor Card */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-amber-200/80 pb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-sm font-bold text-amber-950">
                  {language === "te"
                    ? "🤖 స్వయంచాలక పతనం & ప్రమాద రక్షణ (Automatic Fall & Slip Sensor)"
                    : "🤖 Automatic Fall Detection & Safety Monitor"}
                </h2>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    isFallDetectionActive
                      ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                      : "bg-slate-100 text-slate-600 border-slate-300"
                  }`}
                >
                  {isFallDetectionActive
                    ? language === "te"
                      ? "🟢 సెన్సార్ ప్రారంభించబడింది"
                      : "🟢 Sensor Active"
                    : language === "te"
                    ? "⚪ నిలిపివేయబడింది"
                    : "⚪ Disabled"}
                </span>
              </div>
              <p className="text-xs text-amber-800 mt-0.5">
                {language === "te"
                  ? "పొలంలో రైతు పడిపోయినప్పుడు లేదా ప్రమాదానికి గురైనప్పుడు, ఫోన్ సెన్సార్ ద్వారా గుర్తించి స్వయంచాలకంగా SOS పంపుతుంది."
                  : "If a farmer slips or collapses in the field, mobile motion sensors auto-detect impact & dispatch emergency alerts."}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 self-end sm:self-auto">
            <button
              onClick={() => setIsFallDetectionActive(!isFallDetectionActive)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                isFallDetectionActive
                  ? "bg-emerald-700 text-white border-emerald-800"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
            >
              {isFallDetectionActive
                ? language === "te"
                  ? "ఆన్ (Protection ON)"
                  : "Protection ON"
                : language === "te"
                ? "ఆఫ్ (Protection OFF)"
                : "Protection OFF"}
            </button>

            <button
              onClick={() =>
                triggerFallAlert(
                  language === "te"
                    ? "రైతు పడిపోవడం సిమ్యులేషన్ పరీక్ష (Simulated Fall Impact)"
                    : "Simulated Fall Impact Test Triggered"
                )
              }
              className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center space-x-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{language === "te" ? "💥 పడిపోవడం టెస్ట్ చేయండి" : "💥 Test Fall Simulation"}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-white p-3 rounded-xl border border-amber-200/60 flex items-center space-x-2.5">
            <Smartphone className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="font-bold text-slate-900 block">
                {language === "te" ? "మోషన్ సెన్సార్లు" : "Motion Accelerometer"}
              </span>
              <span className="text-[11px] text-slate-500">
                {language === "te" ? "పతనం స్పర్శగ్రహి >25m/s²" : "Monitors 3-axis g-force impact"}
              </span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-amber-200/60 flex items-center space-x-2.5">
            <BellRing className="w-5 h-5 text-rose-600 shrink-0" />
            <div>
              <span className="font-bold text-slate-900 block">
                {language === "te" ? "10 సెకన్ల టైమర్" : "10s Safety Timer"}
              </span>
              <span className="text-[11px] text-slate-500">
                {language === "te" ? "రద్దు చేసుకోవడానికి సమయం" : "Allows cancelling false alarms"}
              </span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-amber-200/60 flex items-center space-x-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold text-slate-900 block">
                {language === "te" ? "స్వయంచాలక సందేశం" : "Automatic Dispatch"}
              </span>
              <span className="text-[11px] text-slate-500">
                {language === "te" ? "కుటుంబం & 108కి GPS వెళ్తుంది" : "Auto sends GPS & family SMS"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact Priorities & Automated Dispatch Settings */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                {language === "te" ? "📞 అత్యవసర కాంటాక్ట్ ప్రాధాన్యతలు & డిస్పాచ్ సెట్టింగ్‌లు" : "📞 Emergency Contact Priorities & Automated Dispatch"}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === "te"
                  ? "ప్రైమరీ కాంటాక్ట్ (ప్రాధాన్యత 1) కు ఫోన్ కాల్ వెళ్తుంది. వారు వెంటనే స్పందించకపోతే, సిస్టమ్ ఆటోమేటిక్‌గా ప్రాధాన్యత 2 కు కాల్ చేస్తుంది."
                  : "Primary contact (Priority 1) receives an automated phone call. If there is no immediate response, the system automatically calls Priority 2, then Priority 3."}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-extrabold bg-rose-100 text-rose-800 px-3 py-1 rounded-full border border-rose-300">
            {language === "te" ? "కస్టమ్ ప్రాధాన్యతలు యాక్టివ్" : "Custom Priority Rule Active"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-4 rounded-xl border transition space-y-3 ${
                contact.priority === 1
                  ? "bg-rose-50/70 border-rose-300 shadow-2xs"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">{contact.name}</span>
                  <span className="text-[10px] text-slate-500 font-medium">{contact.relation} • {contact.phone}</span>
                </div>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${
                    contact.priority === 1
                      ? "bg-rose-600 text-white border-rose-700"
                      : "bg-slate-200 text-slate-700 border-slate-300"
                  }`}
                >
                  Priority {contact.priority}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex flex-col space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium flex items-center space-x-1">
                    {contact.priority === 1 ? (
                      <>
                        <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
                        <span className="font-bold text-rose-900">Auto Phone Call</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="font-bold text-emerald-800">Fallback Phone Call</span>
                      </>
                    )}
                  </span>

                  <select
                    value={contact.priority}
                    onChange={(e) => handleUpdatePriority(contact.id, Number(e.target.value))}
                    className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 focus:ring-1 focus:ring-rose-500 cursor-pointer"
                  >
                    <option value={1}>Priority 1 (Phone Call)</option>
                    <option value={2}>Priority 2 (Fallback Phone Call)</option>
                    {contacts.length > 2 && <option value={3}>Priority 3 (Fallback Phone Call)</option>}
                  </select>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-200/40">
                  {verifiedMap[contact.id] ? (
                    <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{language === "te" ? "ధృవీకరించబడింది ✓" : "Verified Active ✓"}</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => startNumberVerification(contact)}
                      className="inline-flex items-center space-x-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 rounded-md border border-indigo-200 transition cursor-pointer"
                    >
                      <Smartphone className="w-3 h-3 text-indigo-600" />
                      <span>{language === "te" ? "వెరిఫై చేయి" : "Verify"}</span>
                    </button>
                  )}

                  <div className="flex items-center space-x-1.5">
                    <button
                      type="button"
                      onClick={() => startSimulatedCall(contact)}
                      className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] rounded-lg shadow-2xs transition flex items-center space-x-1 cursor-pointer"
                      title="Direct Phone Call"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>Call</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerSimulatedSms(contact)}
                      className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-lg shadow-2xs transition flex items-center space-x-1 cursor-pointer"
                      title="Direct SMS"
                    >
                      <Send className="w-3 h-3" />
                      <span>SMS</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Large Emergency SOS Action Zone */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-10 shadow-xs text-center space-y-6 relative overflow-hidden">
        <div className="max-w-xl mx-auto space-y-4">
          <button
            onClick={() => handleDispatchAlert("MANUAL")}
            className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-black text-2xl sm:text-3xl shadow-lg border-4 border-rose-100 flex flex-col items-center justify-center mx-auto transition transform active:scale-95 cursor-pointer"
          >
            <ShieldAlert className="w-10 h-10 sm:w-12 sm:h-12 mb-1" />
            <span>SOS</span>
            <span className="text-[10px] font-medium opacity-90">
              {language === "te" ? "నొక్కండి" : "PRESS HERE"}
            </span>
          </button>

          {alertDispatched && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs sm:text-sm font-bold text-emerald-900 animate-fade-in flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                {language === "te"
                  ? `🚨 అత్యవసర సమాచార సందేశం (SOS) కుటుంబ సభ్యులకు పంపబడింది! (${lastDispatchedReason})`
                  : `🚨 Emergency SOS alert dispatched to family contacts! (${lastDispatchedReason})`}
              </span>
            </div>
          )}

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            {language === "te"
              ? "ఈ రెడ్ బటన్ నొక్కితే లేదా పడిపోయినట్లు సెన్సార్ గుర్తిస్తే తక్షణమే మీ కుటుంబానికి GPS లొకేషన్ పంపబడుతుంది."
              : "Pressing SOS or falling down automatically dispatches your GPS farm location & emergency message to your family."}
          </p>
        </div>

        {/* Emergency Message Preview & Edit */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-2">
              <Send className="w-4 h-4 text-emerald-600" />
              <span>{language === "te" ? "అత్యవసర సందేశ ప్రవచనం (Generated Emergency SMS)" : "Generated Emergency SOS Message"}</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Auto-generated GPS</span>
          </div>

          <textarea
            value={sosText}
            onChange={(e) => setSosText(e.target.value)}
            rows={3}
            className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 leading-relaxed"
          />

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-slate-600">
                <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span>{language === "te" ? "మల్టీ-ఛానల్ డిస్పాచ్:" : "Multi-Channel Dispatch:"}</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(sosText)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleDispatchAlert("MANUAL", "WhatsApp Auto-Queue SOS")}
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition shadow-2xs flex items-center space-x-1.5 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{language === "te" ? "📲 వాట్సాప్ ద్వారా SOS పంపు" : "📲 Send SOS via WhatsApp"}</span>
              </a>

              <button
                onClick={() => handleDispatchAlert("MANUAL", "SMS Gateway SOS")}
                className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-xl text-xs transition shadow-xs flex items-center space-x-1.5 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{language === "te" ? "సందేశం పంపు (Send SMS Alert)" : "Dispatch SMS Alert"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Case: Network Signal / SMS Not Coming Fallback Card */}
      <div className="bg-amber-500/10 border-2 border-amber-500/40 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-amber-300/60 pb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-amber-950 flex items-center space-x-2">
                <span>
                  {language === "te"
                    ? "⚡ ఎస్‌ఎంఎస్ / నెట్‌వర్క్ రాకపోయినా అత్యవసర రక్షణ (No Signal / SMS Delay Fallbacks)"
                    : "⚡ Emergency Case: Network Delay / SMS Not Coming?"}
                </span>
              </h3>
              <p className="text-xs text-amber-900 font-medium mt-0.5">
                {language === "te"
                  ? "పొలాల్లో సిగ్నల్ తక్కువగా ఉన్నా లేదా SMS డెలివరీ ఆలస్యమైనా, ఈ ప్రత్యామ్నాయ మార్గాలు 100% ఉపయోగపడతాయి:"
                  : "If cellular tower signal is weak or SMS notifications are stuck, use these 100% fail-safe direct channels:"}
              </p>
            </div>
          </div>

          <span className="text-[10px] font-extrabold bg-amber-200 text-amber-950 px-3 py-1 rounded-full border border-amber-400">
            {language === "te" ? "ఆఫ్‌లైన్ సిద్ధంగా ఉంది (Offline Ready)" : "Offline Fail-Safe Ready"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Method 1: Direct WhatsApp Dispatch */}
          <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs">
              <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{language === "te" ? "1. వాట్సాప్ క్యూయింగ్ (WhatsApp Queue)" : "1. WhatsApp Auto-Queue"}</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              {language === "te"
                ? "నెట్‌వర్క్ రాగానే వాట్సాప్ స్వయంచాలకంగా SOS సందేశాన్ని బంధువులకు మరియు హెల్ప్‌లైన్‌కు పంపుతుంది."
                : "WhatsApp automatically holds & dispatches pre-filled GPS alerts the moment Wi-Fi or mobile signal reconnects."}
            </p>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(sosText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition flex items-center justify-center space-x-1.5 cursor-pointer block text-center"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{language === "te" ? "వాట్సాప్ SOS పంపు" : "Launch WhatsApp SOS"}</span>
            </a>
          </div>

          {/* Method 2: Direct GSM Voice Calls */}
          <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-rose-800 font-bold text-xs">
              <PhoneCall className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{language === "te" ? "2. డెమో వాయిస్ కాల్స్ (Direct Phone Dial)" : "2. Direct GSM Phone Calls"}</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              {language === "te"
                ? "డేటా నెట్‌వర్క్ లేకపోయినా బేసిక్ మొబైల్ వాయిస్ కాల్స్ (108 & ఫ్యామిలీ) తక్షణమే కనెక్ట్ అవుతాయి."
                : "Basic GSM phone calls work on voice towers without needing internet data or SMS messaging servers."}
            </p>
            <div className="grid grid-cols-2 gap-1.5 pt-0.5">
              <a
                href="tel:108"
                className="py-1.5 px-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-900 text-[11px] font-bold rounded-lg transition text-center cursor-pointer block"
              >
                📞 Call 108
              </a>
              <a
                href={`tel:${farmer.emergencyContact1.phone}`}
                className="py-1.5 px-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-950 text-[11px] font-bold rounded-lg transition text-center cursor-pointer block truncate"
              >
                📞 {farmer.emergencyContact1.name || "Family 1"}
              </a>
            </div>
          </div>

          {/* Method 3: Offline Siren Sound & Visual Strobe */}
          <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs">
              <Volume2 className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{language === "te" ? "3. పొలం సైరన్ & స్ట్రోబ్ లైట్" : "3. Local Field Siren & Strobe"}</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              {language === "te"
                ? "ఏ నెట్‌వర్క్ లేకపోయినా ఫోన్ ద్వారా పెద్ద శబ్దంతో సైరన్ మరియు వెలుగు ప్రసరింపచేసి పక్క రైతులకు తెలియజేయవచ్చు."
                : "Plays loud dual-tone siren & flashes screen beacon offline to alert farmers in nearby fields."}
            </p>
            <div className="flex gap-1.5 pt-0.5">
              <button
                type="button"
                onClick={toggleSiren}
                className={`flex-1 py-1.5 px-2 text-[11px] font-bold rounded-lg transition cursor-pointer ${
                  sirenPlaying
                    ? "bg-rose-600 text-white animate-pulse"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                }`}
              >
                {sirenPlaying ? "🔊 Stop Siren" : "🔊 Play Loud Siren"}
              </button>
              <button
                type="button"
                onClick={toggleStrobeAndVibration}
                className={`flex-1 py-1.5 px-2 text-[11px] font-bold rounded-lg transition cursor-pointer ${
                  strobeActive
                    ? "bg-amber-600 text-white animate-pulse"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                }`}
              >
                {strobeActive ? "⚡ Strobe ON" : "⚡ Strobe Beacon"}
              </button>
            </div>
          </div>
        </div>

        {/* Visual Strobe Banner if Strobe Active */}
        {strobeActive && (
          <div className="bg-rose-600 text-white p-4 rounded-xl border-2 border-white animate-pulse text-center space-y-1">
            <div className="flex items-center justify-center space-x-2 font-black text-sm uppercase tracking-wider">
              <Zap className="w-5 h-5 text-yellow-300 animate-bounce" />
              <span>{language === "te" ? "🚨 పొలంలో అత్యవసర వెలుగు & వైబ్రేషన్ యాక్టివ్" : "🚨 EMERGENCY OPTICAL BEACON & VIBRATION ACTIVE"}</span>
            </div>
            <p className="text-xs text-rose-100">
              {language === "te"
                ? "చీకటి పొలంలో పక్కన ఉన్న రైతులకు మీ లొకేషన్ తెలియడానికి ఈ వెలుగు & వైబ్రేషన్ మోగుతోంది."
                : "Flashing bright beacon and vibrating to alert neighboring farmers in dark fields."}
            </p>
            <button
              onClick={toggleStrobeAndVibration}
              className="mt-2 px-4 py-1.5 bg-white text-rose-900 font-extrabold text-xs rounded-lg hover:bg-rose-50 transition cursor-pointer"
            >
              Turn Off Strobe Beacon
            </button>
          </div>
        )}
      </div>

      {/* Emergency Helpline Toll-Free Grid */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-2">
          <PhoneCall className="w-4 h-4 text-emerald-600" />
          <span>{language === "te" ? "ముఖ్యమైన ఉచిత అత్యవసర నంబర్లు (Toll-Free Helplines)" : "Emergency Govt & Medical Call Helplines"}</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <a
            href="tel:108"
            className="p-4 bg-slate-50 border border-slate-200 hover:border-emerald-600 rounded-xl text-center block transition space-y-1 cursor-pointer"
          >
            <span className="text-xs font-bold text-slate-700 block">Ambulance (అంబులెన్స్)</span>
            <span className="text-lg font-black text-rose-600">108</span>
          </a>

          <a
            href="tel:18001801551"
            className="p-4 bg-slate-50 border border-slate-200 hover:border-emerald-600 rounded-xl text-center block transition space-y-1 cursor-pointer"
          >
            <span className="text-xs font-bold text-slate-700 block">Kisan Call Center</span>
            <span className="text-base font-black text-emerald-700">1800-180-1551</span>
          </a>

          <a
            href="tel:100"
            className="p-4 bg-slate-50 border border-slate-200 hover:border-emerald-600 rounded-xl text-center block transition space-y-1 cursor-pointer"
          >
            <span className="text-xs font-bold text-slate-700 block">Police (పోలీస్)</span>
            <span className="text-lg font-black text-rose-600">100</span>
          </a>

          <a
            href="tel:101"
            className="p-4 bg-slate-50 border border-slate-200 hover:border-emerald-600 rounded-xl text-center block transition space-y-1 cursor-pointer"
          >
            <span className="text-xs font-bold text-slate-700 block">Fire Station (ఫైర్)</span>
            <span className="text-lg font-black text-rose-600">101</span>
          </a>
        </div>
      </div>

      {/* Emergency Logs History */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-2">
          <History className="w-4 h-4 text-emerald-600" />
          <span>{language === "te" ? "అత్యవసర హెచ్చరికల లాగ్ (Emergency History Log)" : "Emergency SOS Log History"}</span>
        </h3>

        <div className="space-y-2">
          {emergencyLogs.map((log) => (
            <div
              key={log.id}
              className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-900">{log.locationName}</span>
                  <span className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded font-bold">
                    {log.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Alerted: {log.contactsAlerted.join(", ")}</p>
                {log.notes && <p className="text-[10px] text-amber-800 font-medium mt-1">{log.notes}</p>}
              </div>

              <span className="text-[11px] text-slate-500 font-mono whitespace-nowrap">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Fall Alert Countdown Overlay Modal */}
      {fallModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white border-4 border-rose-600 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center space-y-6 shadow-2xl relative overflow-hidden animate-bounce-subtle">
            {/* Top flashing emergency bar */}
            <div className="bg-rose-600 text-white py-2 px-4 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 flex items-center justify-center space-x-2 font-black text-xs sm:text-sm uppercase tracking-wider animate-pulse">
              <AlertTriangle className="w-5 h-5" />
              <span>
                {language === "te"
                  ? "⚠️ పతనం / కింద పడిపోవడం గుర్తించబడింది!"
                  : "⚠️ EMERGENCY: FALL IMPACT DETECTED!"}
              </span>
            </div>

            <div className="pt-2 space-y-2">
              <div className="w-20 h-20 rounded-full bg-rose-100 border-4 border-rose-500 text-rose-600 mx-auto flex items-center justify-center shadow-inner animate-pulse">
                <BellRing className="w-10 h-10" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-rose-950">
                {language === "te" ? "స్వయంచాలక అత్యవసర అలారం" : "Automatic Emergency Dispatch"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {language === "te"
                  ? `మీ ఫోన్ సెన్సార్లు పతనాన్ని గుర్తించాయి: "${fallReason}". త్వరలో మీ కుటుంబసభ్యులకు GPS లొకేషన్ తో కూడిన ఎస్‌ఓఎస్ పంపబడుతుంది.`
                  : `Mobile sensors detected a fall event: "${fallReason}". Emergency GPS alert will be sent automatically.`}
              </p>
            </div>

            {/* Live Countdown Circle */}
            <div className="py-2">
              <div className="w-28 h-28 rounded-full bg-rose-600 text-white mx-auto flex flex-col items-center justify-center shadow-lg border-4 border-rose-200 animate-pulse">
                <span className="text-4xl font-black font-mono tracking-tight">{fallCountdown}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">
                  {language === "te" ? "సెకన్లు" : "Seconds"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={cancelFallAlert}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl transition shadow-md flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>
                  {language === "te"
                    ? "నేను క్షేమంగా ఉన్నాను - అలారం రద్దు చేయి (CANCEL)"
                    : "I AM OK - CANCEL SOS ALARM"}
                </span>
              </button>

              <button
                type="button"
                onClick={handleAutoSendSOS}
                className="w-full py-3 bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs sm:text-sm rounded-2xl transition shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>
                  {language === "te"
                    ? "ఆగకుండా వెంటనే ఎస్‌ఓఎస్ పంపు (SEND SOS NOW)"
                    : "SEND SOS IMMEDIATELY NOW"}
                </span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400">
              {language === "te"
                ? "ఒకవేళ మీరు రద్దు చేయకపోతే, టైమర్ 0కి చేరిన వెంటనే అలర్ట్ మెసేజ్ పంపబడుతుంది."
                : "If uncancelled, emergency SMS dispatch triggers automatically when timer reaches zero."}
            </p>
          </div>
        </div>
      )}

      {/* Test Code Verification Modal */}
      {showVerifyModal && verifyingContact && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-40 h-40 bg-emerald-50 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {language === "te" ? "ఫోన్ నెంబర్ వెరిఫికేషన్ (టెస్ట్ కోడ్)" : "Emergency Number Verification"}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {verifyingContact.name} ({verifyingContact.phone})
                </p>
              </div>
            </div>

            {verifyStep === "SENDING" && (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm font-bold text-slate-700">
                  {language === "te"
                    ? "ప్రైమరీ కాంటాక్ట్ నెంబర్‌కు SMS టెస్ట్ కోడ్ పంపబడుతోంది..."
                    : "Sending secure 4-digit verification SMS test code to " + verifyingContact.phone + "..."}
                </p>
                <span className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-mono font-bold inline-block border border-emerald-200">
                  Simulated Gateway: AP/TS AgriSecure
                </span>
              </div>
            )}

            {verifyStep === "ENTER_CODE" && (
              <form onSubmit={handleVerifySubmit} className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2 text-xs text-amber-900">
                  <div className="font-bold flex items-center space-x-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{language === "te" ? "టెస్ట్ కోడ్ (డెమో ప్రయోజనం కొరకు):" : "Simulation Demo Test Code Sent:"}</span>
                  </div>
                  <div className="text-lg font-black tracking-widest text-center py-1 bg-white rounded-xl border border-amber-300 font-mono text-emerald-700">
                    {testCode}
                  </div>
                  <p className="text-[11px] text-slate-600 text-center">
                    {language === "te"
                      ? "పైన కనిపించే 4-అంకెల కోడ్‌ను కింద నమోదు చేసి నెంబర్ యాక్టివ్ అని నిర్ధారించండి."
                      : "Enter this 4-digit security code below to confirm this number is active and ready for automated SOS dispatch."}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    {language === "te" ? "వెరిఫికేషన్ కోడ్ నమోదు చేయండి" : "Enter 4-Digit Verification Code"}
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    value={enteredCode}
                    onChange={(e) => setEnteredCode(e.target.value)}
                    placeholder="e.g. 4829"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-center text-xl font-black font-mono tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    autoFocus
                  />
                </div>

                {verifyError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-800 text-center">
                    {verifyError}
                  </div>
                )}

                <div className="flex items-center space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowVerifyModal(false)}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
                  >
                    {language === "te" ? "రద్దు చేయి" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition shadow-md cursor-pointer"
                  >
                    {language === "te" ? "కోడ్ నిర్ధారించు (Verify)" : "Verify Code"}
                  </button>
                </div>
              </form>
            )}

            {verifyStep === "SUCCESS" && (
              <div className="py-6 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border-4 border-emerald-500 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-black text-slate-900">
                  {language === "te" ? "నెంబర్ విజయవంతంగా వెరిఫై చేయబడింది!" : "Number Successfully Verified & Active!"}
                </h4>
                <p className="text-xs text-slate-600">
                  {language === "te"
                    ? `${verifyingContact.name} ఫోన్ నెంబర్ యాక్టివ్‌గా ఉంది. అత్యవసర సమయంలో ఆటోమేటిక్ కాల్/SMS వెళుతుంది.`
                    : `${verifyingContact.name}'s phone (${verifyingContact.phone}) is confirmed valid and connected for emergency priority dispatch.`}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Simulated VoIP Call Overlay Modal */}
      {activeCallTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-8 text-center text-white space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-rose-950/40 to-slate-900/90 pointer-events-none" />

            <div className="relative z-10 space-y-3">
              <div className="w-20 h-20 rounded-full bg-rose-600/30 border-2 border-rose-500 flex items-center justify-center mx-auto animate-pulse">
                <PhoneCall className="w-8 h-8 text-rose-400" />
              </div>
              <div>
                <span className="text-xs text-rose-400 font-bold uppercase tracking-wider block">
                  {language === "te" ? "అత్యవసర వాయిస్ కాల్ (Emergency VoIP)" : "Emergency Secure Voice Call"}
                </span>
                <h3 className="text-2xl font-black mt-1 text-white">{activeCallTarget.name}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{activeCallTarget.phone}</p>
              </div>

              <div className="py-2">
                {callStatus === "CONNECTING" ? (
                  <p className="text-xs text-amber-400 font-medium animate-pulse">
                    {language === "te" ? "కాల్ కనెక్ట్ అవుతోంది..." : "Connecting secure line..."}
                  </p>
                ) : (
                  <div className="space-y-1">
                    <p className="text-xs text-emerald-400 font-bold flex items-center justify-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>{language === "te" ? "కాల్ కనెక్ట్ అయింది" : "Call Connected"}</span>
                    </p>
                    <p className="text-lg font-mono font-bold tracking-wider">
                      {Math.floor(callTimer / 60).toString().padStart(2, '0')}:{(callTimer % 60).toString().padStart(2, '0')}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-slate-800 flex items-center justify-center space-x-4">
              <button
                onClick={() => setActiveCallTarget(null)}
                className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg transition transform active:scale-95 cursor-pointer"
                title="End Call"
              >
                <PhoneCall className="w-6 h-6 rotate-135" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SMS Dispatched Toast */}
      {smsToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500/50 text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 animate-bounce">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-emerald-400">
              {language === "te" ? "అత్యవసర SMS విజయవంతంగా పంపబడింది!" : "Emergency SMS Dispatched!"}
            </p>
            <p className="text-[11px] text-slate-300">
              {smsToast.name} ({smsToast.phone})
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
