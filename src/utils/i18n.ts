import { Language } from "../types";

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी", flag: "🇮🇳" },
  { code: "en", name: "English", nativeName: "English", flag: "🌐" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇮🇳" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
];

export const translations: Record<string, Record<Language, string>> = {
  // Navigation
  dashboard: {
    en: "Dashboard",
    te: "డాష్‌బోర్డ్",
    hi: "डैशबोर्ड",
    ta: "டாஷ்போர்டு",
    kn: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    ml: "ഡാഷ്‌ബോർഡ്",
    mr: "डॅशबोर्ड",
    bn: "ড্যাশবোর্ড",
    gu: "ડેશબોર્ડ",
    pa: "ਡੈਸ਼ਬੋਰਡ",
  },
  aiAssistant: {
    en: "AI Assistant",
    te: "AI సహాయకుడు",
    hi: "एआई सहायक",
    ta: "AI உதவியாளர்",
    kn: "AI ಸಹಾಯಕ",
    ml: "AI സഹായി",
    mr: "AI सहाय्यक",
    bn: "এআই সহকারী",
    gu: "AI મદદગાર",
    pa: "AI ਸਹਾਇਕ",
  },
  cropDisease: {
    en: "Crop Disease AI",
    te: "పంట వ్యాధులు",
    hi: "फसल रोग निदान",
    ta: "பயிர் நோய் AI",
    kn: "ಬೆಳೆ ರೋಗ ಪತ್ತೆ",
    ml: "വിള രോഗങ്ങൾ",
    mr: "पिकांचे आजार",
    bn: "ফসল রোগ নিরাময়",
    gu: "પાક રોગ નિદાન",
    pa: "ਫ਼ਸਲ ਦੀਆਂ ਬੀਮਾਰੀਆਂ",
  },
  smartFarming: {
    en: "Smart Farming",
    te: "స్మార్ట్ సాగు",
    hi: "स्मार्ट खेती",
    ta: "ஸ்மார்ட் விவசாயம்",
    kn: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ",
    ml: "സ്മാർട്ട് ഫാർമിംഗ്",
    mr: "स्मार्ट शेती",
    bn: "স্মার্ট কৃষি",
    gu: "સ્માર્ટ ખેતી",
    pa: "ਸਮਾਰਟ ਖੇਤੀ",
  },
  weather: {
    en: "Weather Radar",
    te: "వాతావరణం",
    hi: "मौसम पूर्वानुमान",
    ta: "வானிலை முன்னறிவிப்பு",
    kn: "ಹವಾಮಾನ",
    ml: "കാലാവസ്ഥ",
    mr: "हवामान",
    bn: "আবহাওয়া",
    gu: "હવામાન",
    pa: "ਮੌਸਮ",
  },
  market: {
    en: "Mandi Market",
    te: "మార్కెట్ ధరలు",
    hi: "मंडी भाव",
    ta: "சந்தை விலைகள்",
    kn: "ಮಾರುಕಟ್ಟೆ ದರ",
    ml: "മാർക്കറ്റ് വിലകൾ",
    mr: "बाजार भाव",
    bn: "বাজার দর",
    gu: "મંડી ભાવ",
    pa: "ਮੰਡੀ ਦੇ ਭਾਅ",
  },
  calculators: {
    en: "Calculators",
    te: "ఆర్థిక లెక్కలు",
    hi: "कृषि कैलकुलेटर",
    ta: "கணக்கீடுகள்",
    kn: "ಲೆಕ್ಕಾಚಾರಗಳು",
    ml: "കാൽക്കുലേറ്ററുകൾ",
    mr: "कॅल्क्युलेटर",
    bn: "ক্যালকুলেটর",
    gu: "કેલ્ક્યુલેટર",
    pa: "ਕੈਲਕੂਲੇਟਰ",
  },
  emergency: {
    en: "Emergency SOS",
    te: "సహాయక SOS",
    hi: "आपत्कालीन SOS",
    ta: "அவசர SOS",
    kn: "ತುರ್ತು SOS",
    ml: "അടിയന്തിര SOS",
    mr: "आणीबाणी SOS",
    bn: "জরুরি SOS",
    gu: "ઇમરજન્સી SOS",
    pa: "ਐਮਰਜੈਂਸੀ SOS",
  },
  agriStore: {
    en: "Agri Store",
    te: "వ్యవసాయ స్టోర్",
    hi: "कृषि स्टोर",
    ta: "வேளாண் கடை",
    kn: "ಕೃಷಿ ಅಂಗಡಿ",
    ml: "കാർഷിക സ്റ്റോർ",
    mr: "कृषी स्टोअर",
    bn: "कृषि स्टोर",
    gu: "કૃષિ સ્ટોર",
    pa: "कृषि स्टोर",
  },
  showcase3d: {
    en: "3D Showcase",
    te: "3D ప్రదర్శన",
    hi: "3D मॉडल प्रदर्शनी",
    ta: "3D காட்சி",
    kn: "3D ಪ್ರದರ್ಶನ",
    ml: "3D ഷോകേസ്",
    mr: "3D मॉडेल",
    bn: "3D প্রদর্শনী",
    gu: "3D ડિસ્પ્લે",
    pa: "3D ਪ੍ਰਦਰਸ਼ਨੀ",
  },
  profile: {
    en: "Farmer Profile",
    te: "రైతు ప్రొఫైల్",
    hi: "किसान प्रोफाइल",
    ta: "உழவர் சுயவிவரம்",
    kn: "ರೈತ ಪ್ರೊಫೈಲ್",
    ml: "കർഷക പ്രൊഫൈൽ",
    mr: "शेतकरी प्रोफाइल",
    bn: "কৃষক প্রোফাইল",
    gu: "ખેડૂત પ્રોફાઇલ",
    pa: "ਕਿਸਾਨ ਪ੍ਰੋਫਾਈਲ",
  },

  // App Tagline
  tagline: {
    en: "Smart Farmer Assistance & Safety Ecosystem",
    te: "స్మార్ట్ రైతు సహాయం & భద్రతా వ్యవస్థ",
    hi: "स्मार्ट किसान सहायता और सुरक्षा प्रणाली",
    ta: "ஸ்மார்ட் உழவர் உதவி & பாதுகாப்பு திட்டம்",
    kn: "ಸ್ಮಾರ್ಟ್ ರೈತ ನೆರವು ಮತ್ತು ಸುರಕ್ಷತೆ",
    ml: "സ്മാർട്ട് കർഷക സഹായവും സുരക്ഷയും",
    mr: "स्मार्ट शेतकरी मदत व सुरक्षा यंत्रणा",
    bn: "স্মার্ট কৃষক সহায়তা ও সুরক্ষা ব্যবস্থা",
    gu: "સ્માર્ટ ખેડૂત સહાય અને સુરક્ષા સિસ્ટમ",
    pa: "ਸਮਾਰਟ ਕਿਸਾਨ ਸਹਾਇਤਾ ਅਤੇ ਸੁਰੱਖਿਆ",
  },

  // Greetings
  welcomeGreeting: {
    en: "Namaste",
    te: "నమస్తే",
    hi: "नमस्ते",
    ta: "வணக்கம்",
    kn: "ನಮಸ್ಕಾರ",
    ml: "നമസ്കാരം",
    mr: "नमस्कार",
    bn: "নমস্কার",
    gu: "નમસ્તે",
    pa: "ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ",
  },

  // Dashboard Common Phrases
  quickAiAsk: {
    en: "Ask AI Assistant anything about crops, pests, fertilizers...",
    te: "పంటలు, పురుగుల మందులు, ఎరువుల వివరాలు AI ని అడగండి...",
    hi: "फसलों, कीटों, उर्वरकों के बारे में एआई से पूछें...",
    ta: "பயிர்கள், பூச்சிக்கொல்லிகள் பற்றி AI இடம் கேளுங்கள்...",
    kn: "ಬೆಳೆಗಳು, ಕೀಟಗಳು, ಗೊಬ್ಬರಗಳ ಬಗ್ಗೆ AI ಗೆ ಕೇಳಿ...",
    ml: "വിളകൾ, കീടങ്ങൾ, വളങ്ങൾ എന്നിവയെക്കുറിച്ച് AIയോട് ചോദിക്കുക...",
    mr: "पिके, कीटकनाशके, खतांबद्दल AI ला विचारा...",
    bn: "ফসল, কীটনাশক, সার সম্পর্কে এআই-কে জিজ্ঞাসা করুন...",
    gu: "પાક, જંતુનાશકો, ખાતરો વિશે AI ને પૂછો...",
    pa: "ਫ਼ਸਲਾਂ, ਕੀੜੇਮਾਰ ਦਵਾਈਆਂ ਬਾਰੇ AI ਤੋਂ ਪੁੱਛੋ...",
  },
  emergencyAlert: {
    en: "EMERGENCY SOS ACTIVE",
    te: "అత్యవసర SOS ప్రారంభమైంది",
    hi: "आपत्कालीन SOS सक्रिय है",
    ta: "அவசர SOS செயல்படுகிறது",
    kn: "ತುರ್ತು SOS ಸಕ್ರಿಯವಾಗಿದೆ",
    ml: "അടിയന്തിര SOS സജീവമാണ്",
    mr: "आणीबाणी SOS सक्रिय आहे",
    bn: "জরুরি SOS সক্রিয় রয়েছে",
    gu: "ઇમરજન્સી SOS સક્રિય છે",
    pa: "ਐਮਰਜੈਂਸੀ SOS ਚਾਲੂ ਹੈ",
  },
  soundSiren: {
    en: "Sound Alarm Siren",
    te: "సైరన్ సౌండ్ ప్లే చేయి",
    hi: "साइर अलार्म बजाएं",
    ta: "சைரன் ஒலி எழுப்பு",
    kn: "ಸೈರನ್ ಸೌಂಡ್ ಚಾಲನೆ",
    ml: "സൈറൺ അലാറം പ്ലേ ചെയ്യുക",
    mr: "सायरेन अलार्म वाजवा",
    bn: "সাইরেন অ্যালার্ম বাজান",
    gu: "સાઇરન અવાજ ચાલુ કરો",
    pa: "ਸਾਇਰਨ ਅਲਾਰਮ ਵਜਾਓ",
  },
  stopSiren: {
    en: "Stop Alarm Siren",
    te: "సైరన్ ఆపివేయి",
    hi: "साइरन बंद करें",
    ta: "சைரன் நிறுத்து",
    kn: "ಸೈರನ್ ನಿಲ್ಲಿಸಿ",
    ml: "സൈറൺ നിർത്തുക",
    mr: "सायरेन बंद करा",
    bn: "সাইরেন বন্ধ করুন",
    gu: "સાઇરન બંધ કરો",
    pa: "ਸਾਇਰਨ ਬੰਦ ਕਰੋ",
  },
  loginBtn: {
    en: "Sign In",
    te: "లాగిన్",
    hi: "साइन इन",
    ta: "உள்நுழைவு",
    kn: "ಸೈನ್ ಇನ್",
    ml: "ലോഗിൻ",
    mr: "लॉगिन",
    bn: "সাইন ইন",
    gu: "સાઇન ઇન",
    pa: "ਸਾਈਨ ਇਨ",
  },
  registerBtn: {
    en: "Register Farmer Profile",
    te: "రైతు రిజిస్ట్రేషన్",
    hi: "किसान पंजीकरण",
    ta: "விவசாயி பதிவு",
    kn: "ರೈತ ನೋಂದಣಿ",
    ml: "കർഷക രജിസ്ട്രേഷൻ",
    mr: "शेतकरी नोंदणी",
    bn: "কৃষক নিবন্ধন",
    gu: "ખેડૂત રજીસ્ટ્રેશન",
    pa: "ਕਿਸਾਨ ਰਜਿਸਟ੍ਰੇਸ਼ਨ",
  },
  selectLanguage: {
    en: "Language / భాష",
    te: "భాష ఎంచుకోండి",
    hi: "भाषा चुनें",
    ta: "மொழியைத் தேர்ந்தெடுக்கவும்",
    kn: "ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    ml: "ഭാഷ തിരഞ്ഞെടുക്കുക",
    mr: "भाषा निवडा",
    bn: "ভাষা নির্বাচন করুন",
    gu: "ભાષા પસંદ કરો",
    pa: "ਭਾਸ਼ਾ ਚੁਣੋ",
  }
};

export function t(key: string, lang: Language, fallbackText?: string): string {
  if (translations[key] && translations[key][lang]) {
    return translations[key][lang];
  }
  if (translations[key] && translations[key]["en"]) {
    return translations[key]["en"];
  }
  return fallbackText || key;
}

export function getLanguageName(lang: Language): string {
  const match = LANGUAGES.find((l) => l.code === lang);
  return match ? match.nativeName : lang;
}
