import re

with open("src/components/AgriStore.tsx", "r") as f:
    content = f.read()

# Update state variables
content = content.replace(
    'const [paymentMethod, setPaymentMethod] = useState<"cod" | "upi">("cod");',
    'const [paymentMethod, setPaymentMethod] = useState<"cod" | "upi" | "card">("cod");\n  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });'
)

# Update reset
content = content.replace(
    'setPaymentMethod("cod");\n      setUpiRef("");',
    'setPaymentMethod("cod");\n      setUpiRef("");\n      setCardDetails({ number: "", expiry: "", cvv: "" });'
)

# Update Payment UI section
payment_ui_old = """                    <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition ${paymentMethod === "upi" ? "border-emerald-500 bg-emerald-50" : "border-slate-200"}`}>
                      <input type="radio" name="payment" value="upi" checked={paymentMethod === "upi"} onChange={() => setPaymentMethod("upi")} className="w-5 h-5 text-emerald-600 focus:ring-emerald-500" />
                      <span className="ml-3 font-medium text-slate-800">{language === "te" ? "UPI ఆన్‌లైన్ పేమెంట్ (Google Pay/PhonePe)" : "UPI Online Payment (GPay/PhonePe)"}</span>
                    </label>
                  </div>

                  {paymentMethod === "upi" && (
                    <div className="mt-6 p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                      <div className="text-center">
                        <div className="inline-block p-2 bg-white border-2 border-slate-300 rounded-xl mb-3 shadow-sm">
                          <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent("upi://pay?pa=channamallulokesh@ybl&pn=CHANNAMALLU LOKESH&am=" + cartTotal + "&cu=INR")}`} alt="UPI QR Scanner" className="w-40 h-40" />
                        </div>
                        <p className="font-bold text-slate-800">Scan QR Code or Use UPI ID</p>
                        <p className="text-purple-700 font-mono font-bold bg-purple-100 py-1 px-3 rounded-lg inline-block mt-1 border border-purple-200">channamallulokesh@ybl</p>
                      </div>
                      <div className="text-left mt-2 border-t border-slate-200 pt-4">
                        <label className="block text-sm font-medium text-slate-700 mb-1">{language === "te" ? "లావాదేవీ సంఖ్య (UTR / Txn ID)" : "Transaction Reference ID (UTR)"}</label>
                        <input 
                          type="text" 
                          value={upiRef} 
                          onChange={e => setUpiRef(e.target.value)} 
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none" 
                          placeholder="Enter 12-digit UTR number" 
                        />
                      </div>
                    </div>
                  )}"""

payment_ui_new = """                    <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition ${paymentMethod === "upi" ? "border-emerald-500 bg-emerald-50" : "border-slate-200"}`}>
                      <input type="radio" name="payment" value="upi" checked={paymentMethod === "upi"} onChange={() => setPaymentMethod("upi")} className="w-5 h-5 text-emerald-600 focus:ring-emerald-500" />
                      <span className="ml-3 font-medium text-slate-800">{language === "te" ? "UPI ఆన్‌లైన్ పేమెంట్ (Google Pay/PhonePe)" : "UPI Online Payment (GPay/PhonePe)"}</span>
                    </label>

                    <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition ${paymentMethod === "card" ? "border-emerald-500 bg-emerald-50" : "border-slate-200"}`}>
                      <input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} className="w-5 h-5 text-emerald-600 focus:ring-emerald-500" />
                      <span className="ml-3 font-medium text-slate-800">{language === "te" ? "డెబిట్ / క్రెడిట్ కార్డ్" : "Debit / Credit Card"}</span>
                    </label>
                  </div>

                  {paymentMethod === "upi" && (
                    <div className="mt-6 p-6 bg-[#0f0b18] border border-purple-900/30 rounded-2xl space-y-4 text-center text-white relative overflow-hidden shadow-lg shadow-purple-900/20">
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
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent("upi://pay?pa=channamallulokesh@ybl&pn=CHANNAMALLU LOKESH&am=" + cartTotal + "&cu=INR")}`} 
                          alt="PhonePe UPI QR" 
                          className="w-48 h-48 rounded-lg" 
                        />
                        {/* Center PhonePe Logo Overlay */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-black rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-xl">पे</span>
                        </div>
                      </div>
                      
                      <p className="font-bold text-lg tracking-wider mt-2 mb-6">CHANNAMALLU LOKESH</p>
                      <p className="text-purple-400 font-mono text-sm bg-purple-900/40 py-1.5 px-4 rounded-full inline-block mb-4 border border-purple-800/60 shadow-inner">channamallulokesh@ybl</p>
                      
                      <div className="text-left mt-2 border-t border-purple-900/50 pt-5">
                        <label className="block text-sm font-medium text-slate-300 mb-2">{language === "te" ? "లావాదేవీ సంఖ్య (UTR / Txn ID)" : "Transaction Reference ID (UTR)"}</label>
                        <input 
                          type="text" 
                          value={upiRef} 
                          onChange={e => setUpiRef(e.target.value)} 
                          className="w-full px-4 py-3.5 rounded-xl bg-purple-950/40 border border-purple-700/50 focus:ring-2 focus:ring-purple-500 outline-none text-white placeholder-slate-500 shadow-inner" 
                          placeholder="Enter 12-digit UTR number" 
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="mt-6 p-5 bg-white border border-slate-200 rounded-xl space-y-4 shadow-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex -space-x-2">
                          <div className="w-8 h-8 rounded-full bg-red-500/80 mix-blend-multiply"></div>
                          <div className="w-8 h-8 rounded-full bg-yellow-500/80 mix-blend-multiply"></div>
                        </div>
                        <span className="font-bold text-slate-700 ml-2">Card Details</span>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{language === "te" ? "కార్డ్ నంబర్" : "Card Number"}</label>
                        <input 
                          type="text" 
                          value={cardDetails.number}
                          onChange={e => setCardDetails({...cardDetails, number: e.target.value.replace(/\D/g, '').slice(0, 16)})}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none" 
                          placeholder="0000 0000 0000 0000" 
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">{language === "te" ? "గడువు తేదీ" : "Expiry (MM/YY)"}</label>
                          <input 
                            type="text" 
                            value={cardDetails.expiry}
                            onChange={e => setCardDetails({...cardDetails, expiry: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none" 
                            placeholder="MM/YY" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">CVV</label>
                          <input 
                            type="password" 
                            value={cardDetails.cvv}
                            onChange={e => setCardDetails({...cardDetails, cvv: e.target.value.replace(/\D/g, '').slice(0, 3)})}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none" 
                            placeholder="123" 
                          />
                        </div>
                      </div>
                    </div>
                  )}"""

content = content.replace(payment_ui_old, payment_ui_new)

# Update validation
validation_old = """                        if (paymentMethod === "upi" && !upiRef) {
                          alert(language === "te" ? "దయచేసి UPI లావాదేవీ సంఖ్య (UTR) నమోదు చేయండి" : "Please enter UPI transaction UTR ID");
                          return;
                        }
                        handleCheckout();"""

validation_new = """                        if (paymentMethod === "upi" && !upiRef) {
                          alert(language === "te" ? "దయచేసి UPI లావాదేవీ సంఖ్య (UTR) నమోదు చేయండి" : "Please enter UPI transaction UTR ID");
                          return;
                        }
                        if (paymentMethod === "card" && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)) {
                          alert(language === "te" ? "దయచేసి కార్డ్ వివరాలను నమోదు చేయండి" : "Please enter all card details");
                          return;
                        }
                        handleCheckout();"""

content = content.replace(validation_old, validation_new)

with open("src/components/AgriStore.tsx", "w") as f:
    f.write(content)

