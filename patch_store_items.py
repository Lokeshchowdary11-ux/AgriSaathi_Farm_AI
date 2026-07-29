import re

with open("src/components/AgriStore.tsx", "r") as f:
    content = f.read()

more_products = """
  {
    id: "prod-13",
    name: "Roundup Herbicide (Glyphosate 41% SL)",
    nameTe: "రౌండప్ కలుపు నివారణ (గ్లైఫోసేట్ 41% SL)",
    category: "Pesticide",
    price: 450,
    unit: "1 Liter",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1593352216443-c045b84c8be2?w=500&auto=format&fit=crop&q=60",
    description: "Non-selective systemic herbicide for effective weed control.",
    descriptionTe: "కలుపు మొక్కలను సమూలంగా నాశనం చేసే శక్తివంతమైన హెర్బిసైడ్.",
  },
  {
    id: "prod-14",
    name: "Coragen Insecticide",
    nameTe: "కోరాజెన్ పురుగుమందు",
    category: "Pesticide",
    price: 1850,
    unit: "150 ml",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=500&auto=format&fit=crop&q=60",
    description: "Advanced insecticide for long-lasting protection against stem borer and leaf folder.",
    descriptionTe: "కాండం తొలుచు మరియు ఆకు ముడత పురుగుల నివారణకు అత్యుత్తమ పురుగుమందు.",
  },
  {
    id: "prod-15",
    name: "MOP (Muriate of Potash)",
    nameTe: "పొటాష్ ఎరువు (MOP)",
    category: "Fertilizer",
    price: 1700,
    unit: "50 kg bag",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1628183204781-a9dc2db5a3d5?w=500&auto=format&fit=crop&q=60",
    description: "Improves crop quality, disease resistance, and water retention.",
    descriptionTe: "పంట నాణ్యత, తెగుళ్ల నిరోధకత మరియు నీటి నిల్వ సామర్థ్యాన్ని పెంచుతుంది.",
  },
  {
    id: "prod-16",
    name: "Chilli Seeds (Tejaswini)",
    nameTe: "మిరప విత్తనాలు (తేజస్విని)",
    category: "Seeds",
    price: 450,
    unit: "10 gm",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1616421063628-98448a3e743a?w=500&auto=format&fit=crop&q=60",
    description: "High pungent, dual-purpose (green and red) hybrid chilli seeds.",
    descriptionTe: "అధిక కారం, పచ్చి మరియు ఎండు మిరప కోసం అనువైన హైబ్రిడ్ విత్తనాలు.",
  },
  {
    id: "prod-17",
    name: "Heavy Duty Tarpaulin Sheet",
    nameTe: "టార్పాలిన్ కవర్ (24x30 ft)",
    category: "Equipment",
    price: 1250,
    unit: "24x30 ft",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=500&auto=format&fit=crop&q=60",
    description: "Waterproof tarpaulin for protecting crops and fertilizers from rain.",
    descriptionTe: "వర్షం నుండి పంటలు మరియు ఎరువులను రక్షించడానికి వాటర్‌ప్రూఫ్ టార్పాలిన్.",
  },
  {
    id: "prod-18",
    name: "Drip Irrigation Kit",
    nameTe: "డ్రిప్ ఇరిగేషన్ కిట్ (1 ఎకరం)",
    category: "Equipment",
    price: 15000,
    unit: "1 Acre Kit",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1598466619623-289552d4b9b9?w=500&auto=format&fit=crop&q=60",
    description: "Complete drip irrigation kit for 1 acre. Saves water and improves yield.",
    descriptionTe: "1 ఎకరం పొలానికి పూర్తి డ్రిప్ ఇరిగేషన్ కిట్. నీటిని ఆదా చేసి దిగుబడిని పెంచుతుంది.",
  }
];
"""
content = content.replace("];\n\nexport function AgriStore", more_products + "\nexport function AgriStore")

# Replace QR Code UI
qr_ui_old = """                  {paymentMethod === "upi" && (
                    <div className="mt-6 p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                      <div className="text-center">
                        <div className="inline-block p-2 bg-white border-2 border-slate-300 rounded-xl mb-3 shadow-sm">
                          <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=agrisaathi@ybl%26pn=AgriSaathiStore%26am=${cartTotal}%26cu=INR`} alt="UPI QR" className="w-32 h-32" />
                        </div>
                        <p className="font-bold text-slate-800">Scan QR Code or Use UPI ID</p>
                        <p className="text-emerald-700 font-mono font-bold bg-emerald-100 py-1 px-3 rounded-lg inline-block mt-1 border border-emerald-200">agrisaathi@ybl</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{language === "te" ? "లావాదేవీ సంఖ్య (UTR / Txn ID)" : "Transaction Reference ID (UTR)"}</label>
                        <input type="text" value={upiRef} onChange={e => setUpiRef(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Enter 12-digit UTR number" />
                      </div>
                    </div>
                  )}"""

qr_ui_new = """                  {paymentMethod === "upi" && (
                    <div className="mt-6 p-6 bg-[#0f0b18] border border-purple-900/30 rounded-2xl space-y-4 text-center text-white relative overflow-hidden">
                      {/* PhonePe Header */}
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          पे
                        </div>
                        <span className="font-bold text-xl">PhonePe</span>
                      </div>
                      <p className="text-purple-400 font-bold tracking-widest text-sm uppercase">ACCEPTED HERE</p>
                      <p className="text-slate-300 text-sm mb-4">Scan & Pay Using PhonePe App</p>

                      <div className="inline-block p-3 bg-white rounded-xl mb-2 relative">
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=0&data=upi://pay?pa=channamallulokesh@ybl%26pn=CHANNAMALLU%20LOKESH%26am=${cartTotal}%26cu=INR`} 
                          alt="PhonePe UPI QR" 
                          className="w-48 h-48 rounded-lg" 
                        />
                        {/* Center PhonePe Logo Overlay */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-black rounded-full border-4 border-white flex items-center justify-center">
                          <span className="text-white font-bold text-xl">पे</span>
                        </div>
                      </div>
                      
                      <p className="font-bold text-lg tracking-wider mt-2 mb-6">CHANNAMALLU LOKESH</p>
                      <p className="text-purple-400 font-mono text-sm bg-purple-900/30 py-1 px-3 rounded-full inline-block mb-4 border border-purple-800/50">channamallulokesh@ybl</p>
                      
                      <div className="text-left mt-2 border-t border-purple-900/50 pt-4">
                        <label className="block text-sm font-medium text-slate-300 mb-1">{language === "te" ? "లావాదేవీ సంఖ్య (UTR / Txn ID)" : "Transaction Reference ID (UTR)"}</label>
                        <input 
                          type="text" 
                          value={upiRef} 
                          onChange={e => setUpiRef(e.target.value)} 
                          className="w-full px-4 py-3 rounded-xl bg-purple-900/20 border border-purple-700/50 focus:ring-2 focus:ring-purple-500 outline-none text-white placeholder-slate-500" 
                          placeholder="Enter 12-digit UTR number" 
                        />
                      </div>
                    </div>
                  )}"""

content = content.replace(qr_ui_old, qr_ui_new)

with open("src/components/AgriStore.tsx", "w") as f:
    f.write(content)

