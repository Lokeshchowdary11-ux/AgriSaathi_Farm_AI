import re

with open("src/components/AgriStore.tsx", "r") as f:
    content = f.read()

upi_old = """                  {paymentMethod === "upi" && (
                    <div className="mt-6 p-5 bg-[#1a1a1a] border border-slate-800 rounded-xl space-y-4">
                      <div className="text-center">
                        <p className="text-slate-300 mb-4">{language === "te" ? "క్రింద ఉన్న QR కోడ్‌ని స్కాన్ చేయండి లేదా UPI ID కి పంపండి" : "Scan the QR code below or use UPI ID"}</p>
                        
                        <div className="flex justify-center mb-4">
                          {/* We will try to load the user's uploaded scanner, otherwise fallback to the generated QR code */}
                          <img 
                            src="/scanner.jpg" 
                            alt="UPI QR Scanner" 
                            className="max-w-full h-auto rounded-lg shadow-lg border border-slate-700 max-h-96 object-contain bg-black" 
                            onError={(e) => { 
                              e.currentTarget.onerror = null; 
                              e.currentTarget.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent("upi://pay?pa=channamallulokesh@ybl&pn=CHANNAMALLU LOKESH")}`;
                            }} 
                          />
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

upi_new = """                  {paymentMethod === "upi" && (
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
                  )}"""

content = content.replace(upi_old, upi_new)

with open("src/components/AgriStore.tsx", "w") as f:
    f.write(content)
