import re

with open("src/components/AgriStore.tsx", "r") as f:
    content = f.read()

# State
content = content.replace(
    'const [upiRef, setUpiRef] = useState("");',
    'const [upiRef, setUpiRef] = useState("");\n  const [userUpiId, setUserUpiId] = useState("");'
)

# Reset state
content = content.replace(
    'setUpiRef("");\n      setCardDetails',
    'setUpiRef("");\n      setUserUpiId("");\n      setCardDetails'
)

# UI
upi_old = """                      <div className="text-left mt-2 border-t border-purple-900/50 pt-5">
                        <label className="block text-sm font-medium text-slate-300 mb-2">{language === "te" ? "లావాదేవీ సంఖ్య (UTR / Txn ID)" : "Transaction Reference ID (UTR)"}</label>
                        <input 
                          type="text" 
                          value={upiRef} 
                          onChange={e => setUpiRef(e.target.value)} 
                          className="w-full px-4 py-3.5 rounded-xl bg-purple-950/40 border border-purple-700/50 focus:ring-2 focus:ring-purple-500 outline-none text-white placeholder-slate-500 shadow-inner" 
                          placeholder="Enter 12-digit UTR number" 
                        />
                      </div>"""

upi_new = """                      <div className="flex items-center gap-4 my-2">
                        <div className="h-px bg-purple-900/50 flex-1"></div>
                        <span className="text-slate-400 text-sm font-medium">{language === "te" ? "లేదా" : "OR"}</span>
                        <div className="h-px bg-purple-900/50 flex-1"></div>
                      </div>

                      <div className="text-left mt-2 pt-2">
                        <label className="block text-sm font-medium text-slate-300 mb-2">{language === "te" ? "మీ UPI ID నమోదు చేయండి" : "Enter your UPI ID"}</label>
                        <input 
                          type="text" 
                          value={userUpiId} 
                          onChange={e => setUserUpiId(e.target.value)} 
                          className="w-full px-4 py-3.5 rounded-xl bg-purple-950/40 border border-purple-700/50 focus:ring-2 focus:ring-purple-500 outline-none text-white placeholder-slate-500 shadow-inner mb-4" 
                          placeholder="e.g. mobile@upi" 
                        />
                        <label className="block text-sm font-medium text-slate-300 mb-2">{language === "te" ? "లావాదేవీ సంఖ్య (UTR / Txn ID)" : "Transaction Reference ID (UTR)"}</label>
                        <input 
                          type="text" 
                          value={upiRef} 
                          onChange={e => setUpiRef(e.target.value)} 
                          className="w-full px-4 py-3.5 rounded-xl bg-purple-950/40 border border-purple-700/50 focus:ring-2 focus:ring-purple-500 outline-none text-white placeholder-slate-500 shadow-inner" 
                          placeholder="Enter 12-digit UTR number" 
                        />
                      </div>"""

content = content.replace(upi_old, upi_new)

# Validation
val_old = """                        if (paymentMethod === "upi" && !upiRef) {
                          alert(language === "te" ? "దయచేసి UPI లావాదేవీ సంఖ్య (UTR) నమోదు చేయండి" : "Please enter UPI transaction UTR ID");
                          return;
                        }"""

val_new = """                        if (paymentMethod === "upi" && !upiRef && !userUpiId) {
                          alert(language === "te" ? "దయచేసి UPI ID లేదా UTR నమోదు చేయండి" : "Please enter your UPI ID or UTR number");
                          return;
                        }"""

content = content.replace(val_old, val_new)

with open("src/components/AgriStore.tsx", "w") as f:
    f.write(content)
