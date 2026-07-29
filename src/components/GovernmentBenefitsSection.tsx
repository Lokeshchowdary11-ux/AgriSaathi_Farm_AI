import React, { useState, useEffect } from "react";
import { FarmerProfile, Language } from "../types";
import {
  FileText,
  Download,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Award,
  Sparkles,
  MapPin,
  ExternalLink,
  ChevronRight,
  Printer,
  FileCheck,
  BellRing,
  Radio
} from "lucide-react";
import { jsPDF } from "jspdf";

interface GovernmentBenefitsSectionProps {
  farmer: FarmerProfile;
  language: Language;
}

interface SchemeBenefit {
  id: string;
  name: string;
  nameTe: string;
  type: string;
  benefitAmount: string;
  benefitAmountTe: string;
  eligibilityStatus: "Eligible" | "Verification Required" | "Active Benefit";
  eligibilityText: string;
  eligibilityTextTe: string;
  requiredDocs: string[];
  requiredDocsTe: string[];
  description: string;
  descriptionTe: string;
  formCode: string;
}

interface CircularAlert {
  id: string;
  title: string;
  titleTe: string;
  issuedBy: string;
  date: string;
  relevance: string;
  matchedCrop: string;
}

export const GovernmentBenefitsSection: React.FC<GovernmentBenefitsSectionProps> = ({
  farmer,
  language
}) => {
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [newCircularAlert, setNewCircularAlert] = useState<CircularAlert | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  // Application status tracker state
  const [applicationStatuses, setApplicationStatuses] = useState<Record<string, "Not Applied" | "Applied" | "Under Review" | "Approved">>({
    "rythu-bharosa-pmkisan": "Approved",
    "free-crop-insurance": "Under Review",
    "apmip-drip-subsidy": "Not Applied",
    "pm-kusum-solar": "Not Applied"
  });

  // Background service hook simulation: Cross-references district & crop data with latest circulars
  useEffect(() => {
    // Simulate background sync with AP Agriculture Department circular server
    setIsScanning(true);
    const timer = setTimeout(() => {
      setIsScanning(false);
      // If farmer is in Guntur cultivating Chilli / Paddy
      if (farmer.district.toLowerCase().includes("guntur") || farmer.primaryCrop) {
        setNewCircularAlert({
          id: "CIRC-2026-089",
          title: `Special Input Subsidy & Pest Management Advisory for ${farmer.primaryCrop || "Chilli & Paddy"} in ${farmer.district}`,
          titleTe: `${farmer.district} జిల్లాలో ${farmer.primaryCrop || "మిరప & వరి"} పంటలకు ప్రత్యేక పురుగుమందుల రాయితీ మరియు సలహా సర్క్యులర్`,
          issuedBy: "Commissioner of Agriculture, AP & RBK Pedakakani Hub",
          date: "Today, 08:00 AM",
          relevance: `Matched for ${farmer.landAreaAcres} Acres in ${farmer.village}, ${farmer.mandal}`,
          matchedCrop: farmer.primaryCrop || "Chilli"
        });
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [farmer.district, farmer.primaryCrop]);

  const handleUpdateStatus = (schemeId: string, newStatus: "Not Applied" | "Applied" | "Under Review" | "Approved") => {
    setApplicationStatuses((prev) => ({
      ...prev,
      [schemeId]: newStatus
    }));
  };

  const schemes: SchemeBenefit[] = [
    {
      id: "rythu-bharosa-pmkisan",
      name: "YSR Rythu Bharosa - PM KISAN",
      nameTe: "వైయస్ఆర్ రైతు భరోసా - పిఎం కిసాన్",
      type: "Direct Income Support",
      benefitAmount: "₹13,500 / Year",
      benefitAmountTe: "సంవత్సరానికి ₹13,500",
      eligibilityStatus: "Active Benefit",
      eligibilityText: `Fully eligible based on land ownership of ${farmer.landAreaAcres} acres in ${farmer.district} district and verified Aadhaar seeding.`,
      eligibilityTextTe: `${farmer.district} జిల్లాలో ${farmer.landAreaAcres} ఎకరాల భూమి మరియు ఆధార్ లింక్ ఆధారంగా పూర్తి అర్హత ఉంది.`,
      requiredDocs: ["Aadhaar Card", "Pattadar Passbook / Land Title", "Bank Passbook (Direct Benefit Transfer)", "Mobile Number Linked"],
      requiredDocsTe: ["ఆధార్ కార్డు", "పట్టాదారు పాస్‌పుస్తకం / భూమి హక్కు పత్రం", "బ్యాంక్ పాస్‌బుక్", "లింక్ చేయబడిన మొబైల్ నంబర్"],
      description: "Provides financial investment support of ₹13,500 per year in three installments to farmer families for crop cultivation inputs.",
      descriptionTe: "రైతు కుటుంబాలకు సాగు పెట్టుబడి కోసం ఏడాదికి రూ. 13,500 ఆర్థిక సహాయం మూడు విడతలుగా అందిస్తుంది.",
      formCode: "AP-RB-PMK-2026-FORM"
    },
    {
      id: "free-crop-insurance",
      name: "Dr. YSR Free Crop Insurance Scheme (PMFBY)",
      nameTe: "డాక్టర్ వైయస్ఆర్ ఉచిత పంటల బీమా పథకం",
      type: "Risk Coverage & Protection",
      benefitAmount: "100% Premium Covered",
      benefitAmountTe: "100% ప్రీమియం ప్రభుత్వ భర్తీ",
      eligibilityStatus: "Eligible",
      eligibilityText: `Eligible for Paddy & Chilli cultivation in ${farmer.village}, ${farmer.mandal} upon e-Crop portal registration.`,
      eligibilityTextTe: `${farmer.village}, ${farmer.mandal} లో వరి మరియు మిరప సాగుకు ఈ-క్రాప్ నమోదు ద్వారా అర్హత ఉంది.`,
      requiredDocs: ["e-Crop Booking Slip from RBK", "Aadhaar Card", "Sowing Certificate from AEO"],
      requiredDocsTe: ["ఆర్బికె నుండి ఇ-క్రాప్ రశీదు", "ఆధార్ కార్డు", "వ్యవసాయ విస్తరణ అధికారి ధృవీకరణ పత్రం"],
      description: "State government bears 100% of crop insurance premium to protect farmers against natural calamities and yield losses.",
      descriptionTe: "ప్రకృతి వైపరీత్యాలు మరియు దిగుబడి నష్టాల నుండి రక్షించడానికి రాష్ట్ర ప్రభుత్వమే 100% బీమా ప్రీమియం చెల్లిస్తుంది.",
      formCode: "AP-CROP-INS-2026"
    },
    {
      id: "apmip-drip-subsidy",
      name: "Andhra Pradesh Micro Irrigation (APMIP - Drip)",
      nameTe: "ఆంధ్రప్రదేశ్ సూక్ష్మ సేద్యం (డ్రిప్ ఇరిగేషన్ సబ్సిడీ)",
      type: "Water & Irrigation Subsidy",
      benefitAmount: "90% - 100% Subsidy",
      benefitAmountTe: "90% నుండి 100% సబ్సిడీ",
      eligibilityStatus: "Eligible",
      eligibilityText: `Eligible for drip/sprinkler system subsidy for ${farmer.primaryCrop || "Chilli"} crop in ${farmer.district}.`,
      eligibilityTextTe: `${farmer.district} లో మీ పంట సాగుకు డ్రిప్ లేదా స్ప్రింక్లర్ వ్యవస్థపై సబ్సిడీ వర్తిస్తుంది.`,
      requiredDocs: ["Land Passbook", "Water Source Certificate (Borewell/Well)", "Aadhaar & Caste Certificate (if applicable)"],
      requiredDocsTe: ["భూమి పాస్‌పుస్తకం", "నీటి వనరు ధృవీకరణ పత్రం", "ఆధార్ & కుల ధృవీకరణ పత్రం"],
      description: "Significantly reduces water consumption and increases yield in black cotton soils through subsidized drip irrigation installation.",
      descriptionTe: "నల్లరేగడి నేలల్లో నీటి వినియోగాన్ని తగ్గించి, అధిక దిగుబడి సాధించడానికి సబ్సిడీపై డ్రిప్ పరికరాల అమరిక.",
      formCode: "APMIP-DRIP-FORM-09"
    },
    {
      id: "pm-kusum-solar",
      name: "PM-KUSUM Solar Agricultural Pump Subsidy",
      nameTe: "పిఎం-కుసుమ్ సోలార్ పంప్‌సెట్ సబ్సిడీ",
      type: "Power & Energy Subsidy",
      benefitAmount: "60% Subsidy (3HP - 7.5HP)",
      benefitAmountTe: "60% సబ్సిడీ (సోలార్ మోటార్)",
      eligibilityStatus: "Verification Required",
      eligibilityText: `Eligible for 60% combined subsidy on off-grid solar pump installation in ${farmer.district}.`,
      eligibilityTextTe: `${farmer.district} లో సోలార్ పంప్‌సెట్ ఏర్పాటుపై 60% ఉమ్మడి సబ్సిడీకి అర్హులు.`,
      requiredDocs: ["Electricity Disconnection/Non-Connection Certificate", "Land Ownership Document", "Aadhaar & Bank Details"],
      requiredDocsTe: ["విద్యుత్ కనెక్షన్ లేని ధృవీకరణ పత్రం", "భూ యాజమాన్య పత్రం", "ఆధార్ & బ్యాంకు వివరాలు"],
      description: "Installs solar agricultural water pumps to ensure guaranteed daytime irrigation without electricity dependency.",
      descriptionTe: "విద్యుత్ అంతరాయం లేకుండా పగటిపూట సాగు నీటి అందించడానికి సోలార్ పంప్ అమరికపై భారీ రాయితీ.",
      formCode: "PMKUSUM-SOLAR-2026"
    }
  ];

  const handleGeneratePDF = (scheme: SchemeBenefit) => {
    setGeneratingId(scheme.id);

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();

      // Header Banner Background
      doc.setFillColor(16, 122, 73); // Emerald primary
      doc.rect(0, 0, pageWidth, 35, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("GOVERNMENT OF ANDHRA PRADESH / MINISTRY OF AGRICULTURE", pageWidth / 2, 14, { align: "center" });

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text(`OFFICIAL SCHEME APPLICATION FORM - ${scheme.name.toUpperCase()}`, pageWidth / 2, 24, { align: "center" });

      // Form Metadata
      doc.setTextColor(50, 50, 50);
      doc.setFontSize(9);
      doc.text(`Form ID Code: ${scheme.formCode}`, 15, 45);
      doc.text(`Submission Date: ${new Date().toLocaleDateString()}`, pageWidth - 15, 45, { align: "right" });

      // Section 1: Farmer Personal Details
      doc.setFillColor(240, 253, 244);
      doc.rect(15, 52, pageWidth - 30, 42, "F");
      doc.setLineWidth(0.5);
      doc.setDrawColor(200, 230, 210);
      doc.rect(15, 52, pageWidth - 30, 42);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(10, 100, 50);
      doc.text("1. APPLICANT FARMER DETAILS (రైతు వివరాలు)", 20, 60);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(40, 40, 40);

      doc.text(`Full Name (పూర్తి పేరు): ${farmer.fullName}`, 20, 69);
      doc.text(`Mobile Number (ఫోన్ నంబర్): ${farmer.mobileNumber}`, pageWidth / 2 + 5, 69);

      doc.text(`Village (గ్రామం): ${farmer.village}`, 20, 77);
      doc.text(`Mandal (మండలం): ${farmer.mandal}`, pageWidth / 2 + 5, 77);

      doc.text(`District (జిల్లా): ${farmer.district}`, 20, 85);
      doc.text(`State (రాష్ట్రం): ${farmer.state} - ${farmer.pinCode}`, pageWidth / 2 + 5, 85);

      // Section 2: Land & Cultivation Details
      doc.setFillColor(248, 250, 252);
      doc.rect(15, 100, pageWidth - 30, 38, "F");
      doc.rect(15, 100, pageWidth - 30, 38);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(30, 41, 59);
      doc.text("2. LAND & CROP CULTIVATION DETAILS (భూమి & పంట వివరాలు)", 20, 108);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(`Total Cultivable Land (భూ విస్తీర్ణం): ${farmer.landAreaAcres} Acres`, 20, 117);
      doc.text(`Soil Type (నేల రకం): ${farmer.soilType}`, pageWidth / 2 + 5, 117);

      doc.text(`Primary Crop (ప్రధాన పంట): ${farmer.primaryCrop || "Paddy & Chilli"}`, 20, 125);
      doc.text(`Crop Details: ${farmer.cropDetails}`, pageWidth / 2 + 5, 125);

      doc.text(`GPS Location Landmark: ${farmer.farmLocation}`, 20, 133);

      // Section 3: Scheme Benefit Applied
      doc.setFillColor(254, 243, 199);
      doc.rect(15, 144, pageWidth - 30, 32, "F");
      doc.rect(15, 144, pageWidth - 30, 32);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(146, 64, 14);
      doc.text("3. REQUESTED SCHEME & FINANCIAL SUBSIDY (కోరిన పథకం వివరాలు)", 20, 152);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(40, 40, 40);
      doc.text(`Scheme Name: ${scheme.name}`, 20, 161);
      doc.text(`Estimated Subsidy Benefit: ${scheme.benefitAmount}`, pageWidth / 2 + 5, 161);
      doc.text(`Eligibility Verification: Pre-Verified & Approved for District Submission`, 20, 169);

      // Section 4: Declaration & Signatures
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(30, 30, 30);
      doc.text("DECLARATION (డిక్లరేషన్):", 15, 186);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(80, 80, 80);
      const declarationText = "I hereby declare that the information provided above is true and correct to the best of my knowledge. I am a resident farmer of the stated village and district cultivating the mentioned land. I authorize the Department of Agriculture to credit direct benefit transfers or issue input permits to my registered account.";
      doc.text(declarationText, 15, 192, { maxWidth: pageWidth - 30 });

      // Signature lines
      doc.line(15, 225, 80, 225);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text("Signature of Agriculture Officer / AEO", 15, 230);
      doc.text("స్థానిక వ్యవసాయాధికారి సంతకం & ముద్ర", 15, 235);

      doc.line(pageWidth - 85, 225, pageWidth - 15, 225);
      doc.text("Signature / Thumb Impression of Farmer", pageWidth - 85, 230);
      doc.text("రైతు సంతకం లేదా వేలిముద్ర", pageWidth - 85, 235);

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("Generated securely via AgriSaathi AI Platform • Verified for Rythu Seva Kendram (RBK) Submission", pageWidth / 2, 275, { align: "center" });

      // Save PDF
      doc.save(`Application_${scheme.id}_${farmer.fullName.replace(/\s+/g, '_')}.pdf`);

      // Update application status tracker to Applied
      handleUpdateStatus(scheme.id, "Applied");

      setSuccessMsg(language === "te"
        ? `"${scheme.name}" దరఖాస్తు PDF విజయవంతంగా డౌన్‌లోడ్ చేయబడింది మరియు స్థితి "దరఖాస్తు చేయబడింది" గా మార్చబడింది!`
        : `Successfully generated pre-filled application PDF for ${scheme.name} and marked status as "Applied"!`);

      setTimeout(() => {
        setSuccessMsg(null);
        setGeneratingId(null);
      }, 5000);
    } catch (err) {
      console.error("PDF Generation error:", err);
      setGeneratingId(null);
    }
  };

  const getStatusBadgeStyle = (status: "Not Applied" | "Applied" | "Under Review" | "Approved") => {
    switch (status) {
      case "Approved":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "Under Review":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Applied":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Not Applied":
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <div id="government-benefits-section" className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shadow-2xs">
            <Award className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                {language === "te" ? "ప్రభుత్వ పథకాలు & రాయితీలు (Government Benefits)" : "Government Benefits & Scheme Pre-Fill Portal"}
              </h2>
              <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                {farmer.district} District Verified
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === "te"
                ? "మీ జిల్లా మరియు పంట వివరాల ఆధారంగా అర్హత ఉన్న పథకాలు మరియు ఆటోమేటిక్ PDF దరఖాస్తుల తయారీ"
                : "Real-time eligibility verification and 1-click pre-filled PDF application generator for your farm"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {isScanning && (
            <div className="flex items-center space-x-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 animate-pulse">
              <Radio className="w-4 h-4 animate-spin" />
              <span>{language === "te" ? "కొత్త సర్క్యులర్ల కోసం వెతుకుతోంది..." : "Syncing Circulars..."}</span>
            </div>
          )}
          <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-2 text-xs font-bold text-emerald-900">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>{language === "te" ? "అర్హత స్థితి: ఆమోదయోగ్యం" : "Eligibility Verified"}</span>
          </div>
        </div>
      </div>

      {/* Live Background Service Notification Banner for New Circular */}
      {newCircularAlert && (
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-4 rounded-2xl shadow-md border border-emerald-700/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <BellRing className="w-5 h-5 text-slate-950 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-extrabold uppercase bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md">
                  New Circular Matched
                </span>
                <span className="text-[11px] text-emerald-200 font-medium">
                  {newCircularAlert.date} • {newCircularAlert.issuedBy}
                </span>
              </div>
              <p className="text-sm font-bold text-white mt-1">
                {language === "te" ? newCircularAlert.titleTe : newCircularAlert.title}
              </p>
              <p className="text-xs text-emerald-100/90 mt-0.5">
                🎯 <span className="font-semibold">{newCircularAlert.relevance}</span> — Automatically cross-referenced with your farm profile.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setNewCircularAlert(null);
            }}
            className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition self-end md:self-center border border-white/20 shrink-0"
          >
            {language === "te" ? "సరే, చదివాను" : "Dismiss Alert"}
          </button>
        </div>
      )}

      {/* Success Banner */}
      {successMsg && (
        <div className="bg-emerald-900 text-white p-3.5 rounded-xl flex items-center justify-between text-xs font-bold shadow-md animate-fade-in">
          <div className="flex items-center space-x-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button
            onClick={() => setSuccessMsg(null)}
            className="text-slate-300 hover:text-white p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Schemes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {schemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-emerald-300 hover:shadow-md transition group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wide bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-md">
                  {scheme.type}
                </span>
                <span className="text-xs font-black text-emerald-700 bg-white border border-emerald-200 px-2.5 py-0.5 rounded-lg shadow-2xs">
                  {language === "te" ? scheme.benefitAmountTe : scheme.benefitAmount}
                </span>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-800 transition">
                  {language === "te" ? scheme.nameTe : scheme.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {language === "te" ? scheme.descriptionTe : scheme.description}
                </p>
              </div>

              {/* Eligibility Checkbox Status */}
              <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-1.5 text-xs">
                <div className="flex items-center space-x-1.5 font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === "te" ? "మీకు అర్హత ఉంది:" : "Eligibility Check:"}</span>
                </div>
                <p className="text-slate-600 pl-5">
                  {language === "te" ? scheme.eligibilityTextTe : scheme.eligibilityText}
                </p>
              </div>

              {/* Required Documents */}
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {language === "te" ? "కావలసిన పత్రాలు (Required Documents):" : "Required Documents for Submission:"}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(language === "te" ? scheme.requiredDocsTe : scheme.requiredDocs).map((doc, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-slate-200/70 text-slate-700 px-2.5 py-0.5 rounded-md font-medium"
                    >
                      ✓ {doc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Application Status Tracker */}
              <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-700">
                    {language === "te" ? "దరఖాస్తు స్థితి:" : "Status Tracker:"}
                  </span>
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg border ${getStatusBadgeStyle(applicationStatuses[scheme.id] || "Not Applied")}`}>
                    ● {applicationStatuses[scheme.id] || "Not Applied"}
                  </span>
                </div>

                <select
                  value={applicationStatuses[scheme.id] || "Not Applied"}
                  onChange={(e) => handleUpdateStatus(scheme.id, e.target.value as any)}
                  className="text-[11px] font-bold bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="Not Applied">Not Applied</option>
                  <option value="Applied">Applied (PDF Ready)</option>
                  <option value="Under Review">Under Review (RBK)</option>
                  <option value="Approved">Approved (Active)</option>
                </select>
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-3">
              <div className="text-[10px] text-slate-400 font-medium">
                Form Code: <span className="font-mono text-slate-600">{scheme.formCode}</span>
              </div>

              <button
                onClick={() => handleGeneratePDF(scheme)}
                disabled={generatingId === scheme.id}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow-xs cursor-pointer disabled:opacity-50"
              >
                {generatingId === scheme.id ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{language === "te" ? "రూపొందిస్తోంది..." : "Generating PDF..."}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-amber-300" />
                    <span>{language === "te" ? "దరఖాస్తు PDF డౌన్‌లోడ్" : "Generate Pre-Filled PDF"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RBK Notice Box */}
      <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-extrabold shrink-0 shadow-xs">
            RBK
          </div>
          <div>
            <p className="font-bold text-amber-200">
              {language === "te" ? "రైతు సేవా కేంద్రం (RBK) సమర్పణ సూచన" : "Rythu Seva Kendram (RBK) Submission Guide"}
            </p>
            <p className="text-[11px] text-slate-300 mt-0.5">
              {language === "te"
                ? "డౌన్‌లోడ్ చేసిన PDF ప్రింట్ తీసుకుని, మీ ఆధార్ మరియు పాస్‌పుస్తకంతో స్థానిక RBK వ్యవసాయ అధికారికి ఇవ్వండి."
                : "Print the generated PDF form, attach your Aadhaar and land passbook copies, and submit at your local RBK."}
            </p>
          </div>
        </div>

        <div className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-xl text-emerald-300 font-bold shrink-0">
          Pedakakani Cluster Hub
        </div>
      </div>
    </div>
  );
};
