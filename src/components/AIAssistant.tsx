import React, { useState, useEffect, useRef } from "react";
import { Language, FarmerProfile } from "../types";
import { defaultFarmerProfile } from "../data/mockData";
import { Bot, Send, Mic, MicOff, Volume2, VolumeX, Sparkles, RefreshCw, AlertCircle } from "lucide-react";

interface AIAssistantProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  farmer?: FarmerProfile;
  initialQuery?: string;
}

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  language,
  setLanguage,
  farmer: initialFarmer,
  initialQuery = ""
}) => {
  const farmer = initialFarmer || defaultFarmerProfile;
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "ai",
      text:
        language === "te"
          ? `నమస్కారం ${farmer.fullName} గారూ! నేను అగ్రిసాథి AI రైతు సహాయకుని. మీ పంటల సాగు, క్రిమిసంహారక మందులు, ఎరువుల షెడ్యూల్ మరియు అత్యవసర సహాయం గురించి ఏమైనా అడగండి.`
          : `Namaste ${farmer.fullName}! I am your AgriSaathi AI Agricultural Companion. Ask me anything about crop cultivation, pest control, fertilizer ratios, or emergency guidance.`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [input, setInput] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);
  const [autoSpeak, setAutoSpeak] = useState(true);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialQuery) {
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const getLangTag = (lang: Language): string => {
    const langMap: Record<string, string> = {
      te: "te-IN",
      hi: "hi-IN",
      ta: "ta-IN",
      kn: "kn-IN",
      ml: "ml-IN",
      mr: "mr-IN",
      bn: "bn-IN",
      gu: "gu-IN",
      pa: "pa-IN",
      en: "en-IN"
    };
    return langMap[lang] || "en-IN";
  };

  const speakText = (text: string, msgId: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      if (activeSpeechId === msgId && isSpeaking) {
        setIsSpeaking(false);
        setActiveSpeechId(null);
        return;
      }

      // Remove markdown asterisks or code formatting for cleaner speech synthesis
      const cleanText = text.replace(/[*#_`]/g, "").trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = getLangTag(language);
      utterance.rate = 0.95;

      utterance.onend = () => {
        setIsSpeaking(false);
        setActiveSpeechId(null);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setActiveSpeechId(null);
      };

      setIsSpeaking(true);
      setActiveSpeechId(msgId);
      window.speechSynthesis.speak(utterance);
    }
  };

  const startVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        language === "te"
          ? "మీ బ్రౌజర్‌లో మైక్ ద్వారా మాట్లాడే సౌలభ్యం అందుబాటులో లేదు."
          : "Voice recognition is not supported in this browser. Please type your query."
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = getLangTag(language);
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSend(transcript);
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          language,
          farmerProfile: farmer,
        }),
      });

      const data = await res.json();
      const aiReplyText =
        data.text ||
        data.fallbackText ||
        (language === "te"
          ? "క్షమించండి, మీ ప్రశ్న నమోదు కాలేదు. దయచేసి మళ్ళీ ప్రయత్నించండి."
          : "Sorry, I could not process that request. Please try again.");

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      
      // Auto speak response if enabled
      if (autoSpeak) {
        speakText(aiReplyText, aiMsg.id);
      }
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: "ai",
        text:
          language === "te"
            ? "సాంకేతిక నెట్‌వర్క్ సమస్య వల్ల AI స్పందించలేకపోయింది. వ్యవసాయ ఉచిత హెల్ప్‌లైన్ 1800-180-1551 కు కూడా కాల్ చేయవచ్చు."
            : "Network connection error. You can also dial Kisan Toll-Free helpline 1800-180-1551 for assistance.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    {
      te: "వరిలో అగ్గి తెగులు నివారణ మందులు ఏవి?",
      en: "Best fungicides for Paddy Blast disease?",
    },
    {
      te: "పత్తిలో గులాబీ రంగు పురుగు మందుల షెడ్యూల్?",
      en: "Pesticide schedule for Cotton Pink Bollworm?",
    },
    {
      te: "మిర్చిలో నల్ల తామర పురుగు నివారణ సలహాలు?",
      en: "How to prevent Black Thrips in Chilli crop?",
    },
    {
      te: "పాము కాటు వేస్తే ప్రాథమిక చికిత్స ఏమిటి?",
      en: "First aid steps for snake bite in field?",
    },
    {
      te: "పిఎం-కిసాన్ పథకం డబ్బుల వివరాలు ఎలా చూడాలి?",
      en: "How to check PM-KISAN subsidy installment status?",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 text-slate-900">
      {/* Top Banner & Language Control */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white shadow-xs flex items-center justify-center">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              {language === "te" ? "🤖 అగ్రిసాథి AI రైతు సలహాదారు" : "🤖 AgriSaathi AI Farmer Assistant"}
            </h1>
            <p className="text-xs text-slate-500">
              {language === "te" ? "తెలుగు & ఇంగ్లీష్ వాయిస్ మద్దతు గల స్మార్ట్ సహాయకుడు" : "Bilingual Voice & Text AI Specialist"}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          {/* Voice Auto Read Aloud Toggle */}
          <button
            onClick={() => setAutoSpeak(!autoSpeak)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition flex items-center space-x-1.5 cursor-pointer ${
              autoSpeak
                ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                : "bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200"
            }`}
            title="Toggle Automatic AI Speech Output"
          >
            {autoSpeak ? <Volume2 className="w-4 h-4 text-emerald-600 animate-pulse" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            <span>{autoSpeak ? (language === "te" ? "🔊 వాయిస్ సమాధానాలు: ఆన్" : "🔊 Voice Reply: On") : (language === "te" ? "🔇 వాయిస్ సమాధానాలు: ఆఫ్" : "🔇 Voice Reply: Off")}</span>
          </button>

          <button
            onClick={() => setLanguage(language === "en" ? "te" : "en")}
            className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-200 transition cursor-pointer"
          >
            {language === "en" ? "తెలుగుకి మార్చు" : "Switch to English"}
          </button>
        </div>
      </div>

      {/* Listening Status Banner */}
      {isListening && (
        <div className="bg-rose-50 border border-rose-300 rounded-xl p-3 flex items-center justify-between text-rose-800 text-xs sm:text-sm font-semibold animate-pulse shadow-xs">
          <div className="flex items-center space-x-2">
            <Mic className="w-5 h-5 text-rose-600 animate-bounce" />
            <span>
              {language === "te"
                ? "🎙 మైక్ ప్రారంభమైంది... మీ ప్రశ్న స్పష్టంగా మాట్లాడండి!"
                : "🎙 Listening... Please speak your agricultural query clearly!"}
            </span>
          </div>
          <span className="text-[10px] bg-rose-200 px-2 py-0.5 rounded-full text-rose-900 font-bold">REC</span>
        </div>
      )}

      {/* Quick Prompts */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {quickPrompts.map((p, idx) => {
          const promptText = language === "te" ? p.te : p.en;
          return (
            <button
              key={idx}
              onClick={() => handleSend(promptText)}
              className="px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-full whitespace-nowrap transition flex items-center space-x-1.5 shrink-0 shadow-2xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{promptText}</span>
            </button>
          );
        })}
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-xs h-[calc(100vh-280px)] min-h-[420px] max-h-[680px] flex flex-col justify-between">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m) => {
            const isAi = m.sender === "ai";
            return (
              <div
                key={m.id}
                className={`flex ${isAi ? "justify-start" : "justify-end"} items-end space-x-2`}
              >
                {isAi && (
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 mb-1">
                    <Bot className="w-5 h-5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                    isAi
                      ? "bg-slate-50 border border-slate-200 text-slate-900 rounded-bl-none"
                      : "bg-emerald-700 text-white font-medium rounded-br-none"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{m.text}</div>

                  <div
                    className={`mt-2 pt-1.5 border-t flex items-center justify-between text-[10px] ${
                      isAi ? "border-slate-200 text-slate-400" : "border-emerald-600 text-emerald-100"
                    }`}
                  >
                    <span>{m.timestamp}</span>

                    {isAi && (
                      <button
                        onClick={() => speakText(m.text, m.id)}
                        className="px-2 py-0.5 rounded bg-white hover:bg-slate-100 border border-slate-200 text-emerald-700 font-semibold transition flex items-center space-x-1 cursor-pointer"
                      >
                        {activeSpeechId === m.id && isSpeaking ? (
                          <>
                            <VolumeX className="w-3 h-3 text-rose-600" />
                            <span>{language === "te" ? "ఆపు" : "Stop"}</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3 text-emerald-600" />
                            <span>{language === "te" ? "వినండి" : "Listen"}</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center space-x-2 text-slate-500 text-xs py-2">
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
              <span>{language === "te" ? "అగ్రిసాథి AI ఆలోచిస్తోంది..." : "AgriSaathi AI is generating advice..."}</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Bottom Input Field */}
        <div className="pt-4 border-t border-slate-200 mt-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            {/* Mic Voice Button */}
            <button
              type="button"
              onClick={startVoiceInput}
              className={`p-3 rounded-xl transition flex items-center justify-center cursor-pointer ${
                isListening
                  ? "bg-rose-600 text-white animate-pulse"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
              }`}
              title="Voice Input (మైక్ ద్వార మాట్లాడండి)"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-emerald-600" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                language === "te"
                  ? "ఇక్కడ ప్రశ్నించండి లేదా మైక్ నొక్కి మాట్లాడండి..."
                  : "Type your query or press the mic button to speak..."
              }
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-semibold rounded-xl transition text-xs sm:text-sm flex items-center space-x-1.5 shadow-xs cursor-pointer"
            >
              <span>{language === "te" ? "పంపు" : "Send"}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
