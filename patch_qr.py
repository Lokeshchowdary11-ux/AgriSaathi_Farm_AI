import re

with open("src/components/AgriStore.tsx", "r") as f:
    content = f.read()

qr_ui_old = """                  {paymentMethod === "upi" && (
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

qr_ui_new = """                  {paymentMethod === "upi" && (
                    <div className="mt-6 p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                      <div className="text-center">
                        <div className="inline-block p-2 bg-white border-2 border-slate-300 rounded-xl mb-3 shadow-sm">
                          <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=channamallulokesh@ybl%26pn=CHANNAMALLU%20LOKESH%26am=${cartTotal}%26cu=INR`} alt="UPI QR Scanner" className="w-40 h-40" />
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

content = content.replace(qr_ui_old, qr_ui_new)

with open("src/components/AgriStore.tsx", "w") as f:
    f.write(content)
