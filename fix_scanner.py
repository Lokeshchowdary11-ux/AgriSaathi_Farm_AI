import re

with open("src/components/AgriStore.tsx", "r") as f:
    content = f.read()

old_block = """{/* We will use a static image for the scanner to avoid technical issues */}
                          {/* User needs to upload their PhonePe QR image to public/scanner.jpg */}
                          <img src="/scanner.jpg" alt="UPI QR Scanner" className="max-w-full h-auto rounded-lg shadow-lg border border-slate-700 max-h-96 object-contain bg-black" onError={(e) => { e.currentTarget.src = "https://placehold.co/400x500/111111/FFFFFF/png?text=Upload+your+PhonePe+QR\\nas+public/scanner.jpg" }} />"""

new_block = """{/* We will try to load the user's uploaded scanner, otherwise fallback to the generated QR code */}
                          <img 
                            src="/scanner.jpg" 
                            alt="UPI QR Scanner" 
                            className="max-w-full h-auto rounded-lg shadow-lg border border-slate-700 max-h-96 object-contain bg-black" 
                            onError={(e) => { 
                              e.currentTarget.onerror = null; 
                              e.currentTarget.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent("upi://pay?pa=channamallulokesh@ybl&pn=CHANNAMALLU LOKESH")}`;
                            }} 
                          />"""

content = content.replace(old_block, new_block)

with open("src/components/AgriStore.tsx", "w") as f:
    f.write(content)
