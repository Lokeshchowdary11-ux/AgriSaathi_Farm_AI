import re

with open("src/components/AgriStore.tsx", "r") as f:
    content = f.read()

upi_old = """                  {paymentMethod === "upi" && (
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
                      
                      <div className="flex items-center gap-4 my-2">
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
                      </div>
                    </div>
                  )}"""

upi_new = """                  {paymentMethod === "upi" && (
                    <div className="mt-6 bg-[#f4f7fa] border border-slate-200 rounded-3xl overflow-hidden shadow-md">
                      {/* Top Header */}
                      <div className="pt-8 pb-4 text-center">
                        <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
                          Channamallu Lokesh 
                          <span className="bg-[#00baf2] text-white p-0.5 rounded-full">
                            <Check className="w-4 h-4" />
                          </span>
                        </h3>
                      </div>

                      {/* Card Content */}
                      <div className="px-6 pb-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border-[6px] border-[#00baf2]">
                          <div className="flex justify-center items-center mb-6">
                            <span className="text-[#002970] font-bold text-2xl tracking-tight mr-1">Paytm</span>
                            <span className="text-red-500 text-xl mx-1">❤</span>
                            <span className="text-slate-800 font-bold text-2xl italic">UPI</span>
                          </div>
                          
                          <div className="flex justify-center mb-6">
                            <img 
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("upi://pay?pa=9392121229@ptyes&pn=Channamallu Lokesh&am=" + cartTotal + "&cu=INR")}`} 
                              alt="Paytm UPI QR" 
                              className="w-56 h-56" 
                            />
                          </div>
                        </div>

                        {/* Bottom Blue Section of Card */}
                        <div className="bg-[#002970] -mt-8 pt-10 pb-4 rounded-b-2xl flex justify-center text-white">
                          <div className="bg-white text-slate-800 px-6 py-2 rounded-full font-medium text-lg flex items-center gap-2 shadow-sm">
                            <span className="text-green-500">▶</span> 9392121229@ptyes
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="bg-slate-100 py-3 text-center border-t border-slate-200 text-sm font-medium text-slate-600 flex justify-center items-center gap-2">
                        Scan with any UPI app 
                        <span className="text-[#002970] font-bold">Paytm</span>
                        <span className="w-5 h-5 bg-purple-700 text-white rounded-full flex items-center justify-center text-[10px] font-bold">पे</span>
                        <span className="text-green-600 font-bold italic">BHIM</span>
                      </div>

                      {/* Input Section */}
                      <div className="p-6 bg-white border-t border-slate-200">
                        <div className="flex items-center gap-4 my-2 mb-6">
                          <div className="h-px bg-slate-200 flex-1"></div>
                          <span className="text-slate-400 text-sm font-medium">{language === "te" ? "లేదా" : "OR"}</span>
                          <div className="h-px bg-slate-200 flex-1"></div>
                        </div>

                        <div className="text-left">
                          <label className="block text-sm font-medium text-slate-700 mb-2">{language === "te" ? "మీ UPI ID నమోదు చేయండి" : "Enter your UPI ID"}</label>
                          <input 
                            type="text" 
                            value={userUpiId} 
                            onChange={e => setUserUpiId(e.target.value)} 
                            className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#00baf2] outline-none text-slate-800 mb-4 bg-slate-50" 
                            placeholder="e.g. mobile@upi" 
                          />
                          <label className="block text-sm font-medium text-slate-700 mb-2">{language === "te" ? "లావాదేవీ సంఖ్య (UTR / Txn ID)" : "Transaction Reference ID (UTR)"}</label>
                          <input 
                            type="text" 
                            value={upiRef} 
                            onChange={e => setUpiRef(e.target.value)} 
                            className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#00baf2] outline-none text-slate-800 bg-slate-50" 
                            placeholder="Enter 12-digit UTR number" 
                          />
                        </div>
                      </div>
                    </div>
                  )}"""

content = content.replace(upi_old, upi_new)

with open("src/components/AgriStore.tsx", "w") as f:
    f.write(content)
