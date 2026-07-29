import re

with open("src/components/AgriStore.tsx", "r") as f:
    content = f.read()

upi_old = """                  {paymentMethod === "upi" && (
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

upi_new = """                  {paymentMethod === "upi" && (
                    <div className="mt-6 p-5 bg-[#1a1a1a] border border-slate-800 rounded-xl space-y-4">
                      <div className="text-center">
                        <p className="text-slate-300 mb-4">{language === "te" ? "క్రింద ఉన్న QR కోడ్‌ని స్కాన్ చేయండి లేదా UPI ID కి పంపండి" : "Scan the QR code below or use UPI ID"}</p>
                        
                        <div className="flex justify-center mb-4">
                          {/* We will use a static image for the scanner to avoid technical issues */}
                          {/* User needs to upload their PhonePe QR image to public/scanner.jpg */}
                          <img src="/scanner.jpg" alt="UPI QR Scanner" className="max-w-full h-auto rounded-lg shadow-lg border border-slate-700 max-h-96 object-contain bg-black" onError={(e) => { e.currentTarget.src = "https://placehold.co/400x500/111111/FFFFFF/png?text=Upload+your+PhonePe+QR\\nas+public/scanner.jpg" }} />
                        </div>

                        <p className="font-bold text-white mb-1">CHANNAMALLU LOKESH</p>
                        <p className="text-purple-400 font-mono font-bold bg-purple-900/30 py-1 px-4 rounded-lg inline-block border border-purple-800">channamallulokesh@ybl</p>
                      </div>
                      <div className="text-left mt-4 border-t border-slate-700 pt-5">
                        <label className="block text-sm font-medium text-slate-300 mb-2">{language === "te" ? "లావాదేవీ సంఖ్య (UTR / Txn ID)" : "Transaction Reference ID (UTR)"}</label>
                        <input 
                          type="text" 
                          value={upiRef} 
                          onChange={e => setUpiRef(e.target.value)} 
                          className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border border-slate-700 focus:ring-2 focus:ring-purple-500 outline-none text-white placeholder-slate-500" 
                          placeholder="Enter 12-digit UTR number" 
                        />
                      </div>
                    </div>
                  )}"""

content = content.replace(upi_old, upi_new)

with open("src/components/AgriStore.tsx", "w") as f:
    f.write(content)
