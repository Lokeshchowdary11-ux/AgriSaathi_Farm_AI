import re

with open("src/components/AgriStore.tsx", "r") as f:
    content = f.read()

# Add more products
more_products = """
  {
    id: "prod-9",
    name: "Zinc Sulphate 33%",
    nameTe: "జింక్ సల్ఫేట్ 33%",
    category: "Fertilizer",
    price: 450,
    unit: "5 kg bag",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1628183204781-a9dc2db5a3d5?w=500&auto=format&fit=crop&q=60",
    description: "Crucial for plant enzyme systems, prevents yellowing of leaves.",
    descriptionTe: "మొక్కల ఎంజైమ్ వ్యవస్థలకు కీలకం, ఆకులు పసుపు రంగులోకి మారకుండా చేస్తుంది.",
  },
  {
    id: "prod-10",
    name: "Imidacloprid 17.8% SL",
    nameTe: "ఇమిడాక్లోప్రిడ్ 17.8% SL (పురుగుమందు)",
    category: "Pesticide",
    price: 380,
    unit: "250 ml",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=500&auto=format&fit=crop&q=60",
    description: "Effective systemic insecticide for sucking pests like aphids, jassids, and whiteflies.",
    descriptionTe: "రసం పీల్చే పురుగులైన పేనుబంక, పచ్చదోమ మరియు తెల్లదోమల నివారణకు సమర్థవంతమైన పురుగుమందు.",
  },
  {
    id: "prod-11",
    name: "Solar Insect Light Trap",
    nameTe: "సోలార్ ఇన్సెక్ట్ లైట్ ట్రాప్ (పురుగుల వల)",
    category: "Equipment",
    price: 1850,
    unit: "1 Piece",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1509391366360-12808b1a41f6?w=500&auto=format&fit=crop&q=60",
    description: "Eco-friendly pest management. Automatically turns on at night to trap flying insects.",
    descriptionTe: "పర్యావరణ అనుకూల పురుగుల నివారణ. రాత్రి పూట స్వయంచాలకంగా ఆన్ అయ్యి ఎగిరే పురుగులను ఆకర్షిస్తుంది.",
  },
  {
    id: "prod-12",
    name: "Tomato Seeds (Arka Rakshak)",
    nameTe: "టమాటా విత్తనాలు (అర్క రక్షక్)",
    category: "Seeds",
    price: 650,
    unit: "10 gm",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=500&auto=format&fit=crop&q=60",
    description: "High yielding hybrid tomato seeds with triple disease resistance.",
    descriptionTe: "మూడు రకాల తెగుళ్లను తట్టుకునే, అధిక దిగుబడినిచ్చే హైబ్రిడ్ టమాటా విత్తనాలు.",
  }
];
"""
content = content.replace("];\n\nexport function AgriStore", more_products + "\nexport function AgriStore")

# Modify states
states_replace = """  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "address" | "payment" | "success">("cart");
  const [address, setAddress] = useState({ name: "", phone: "", address: "", pincode: "" });
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "upi">("cod");
  const [upiRef, setUpiRef] = useState("");"""
content = re.sub(r'  const \[cart, setCart\].*?\n.*?setOrderPlaced\(false\);\n', states_replace + '\n', content, flags=re.DOTALL)

# Add handleCheckout modification
handle_checkout = """
  const handleCheckout = () => {
    setCheckoutStep("success");
    setCart([]);
    setTimeout(() => {
      setCheckoutStep("cart");
      setShowCart(false);
      setAddress({ name: "", phone: "", address: "", pincode: "" });
      setPaymentMethod("cod");
      setUpiRef("");
    }, 4000);
  };
"""
content = content.replace(states_replace, states_replace + "\n" + handle_checkout)

# Change Cart Drawer UI
cart_drawer_replace_start = "{/* Cart Drawer / Modal overlay */}"
cart_drawer_ui = """
      {/* Cart Drawer / Modal overlay */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowCart(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-emerald-50">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <ShoppingCart className="w-7 h-7 text-emerald-600" />
                {checkoutStep === "cart" && (language === "te" ? "మీ కార్ట్" : "Your Cart")}
                {checkoutStep === "address" && (language === "te" ? "డెలివరీ వివరాలు" : "Delivery Details")}
                {checkoutStep === "payment" && (language === "te" ? "చెల్లింపు" : "Payment")}
                {checkoutStep === "success" && (language === "te" ? "విజయం" : "Success")}
              </h2>
              <button onClick={() => setShowCart(false)} className="p-2 text-slate-400 hover:text-slate-700 bg-white rounded-full transition shadow-sm">
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {checkoutStep === "success" ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                  <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-inner">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900">
                    {language === "te" ? "ఆర్డర్ విజయవంతమైంది!" : "Order Placed Successfully!"}
                  </h3>
                  <p className="text-slate-600">
                    {language === "te" 
                      ? "మీ వ్యవసాయ ఉత్పత్తులు త్వరలో డెలివరీ చేయబడతాయి. ధన్యవాదాలు!" 
                      : "Your agricultural supplies will be delivered soon. Thank you!"}
                  </p>
                </div>
              ) : checkoutStep === "address" ? (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-bold text-slate-800 mb-4">{language === "te" ? "డెలివరీ చిరునామా నమోదు చేయండి" : "Enter Delivery Address"}</h3>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{language === "te" ? "పూర్తి పేరు" : "Full Name"}</label>
                    <input type="text" value={address.name} onChange={e => setAddress({...address, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Enter your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{language === "te" ? "ఫోన్ నంబర్" : "Phone Number"}</label>
                    <input type="tel" value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="10-digit mobile number" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{language === "te" ? "పూర్తి చిరునామా (ఊరు/మండలం)" : "Full Address (Village/Mandal)"}</label>
                    <textarea value={address.address} onChange={e => setAddress({...address, address: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Door No, Street, Village..." rows={3}></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{language === "te" ? "పిన్‌కోడ్" : "Pincode"}</label>
                    <input type="text" value={address.pincode} onChange={e => setAddress({...address, pincode: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="e.g. 522001" />
                  </div>
                </div>
              ) : checkoutStep === "payment" ? (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="font-bold text-slate-800 mb-2">{language === "te" ? "చెల్లింపు పద్ధతి ఎంచుకోండి" : "Select Payment Method"}</h3>
                  
                  <div className="space-y-3">
                    <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition ${paymentMethod === "cod" ? "border-emerald-500 bg-emerald-50" : "border-slate-200"}`}>
                      <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} className="w-5 h-5 text-emerald-600 focus:ring-emerald-500" />
                      <span className="ml-3 font-medium text-slate-800">{language === "te" ? "క్యాష్ ఆన్ డెలివరీ (COD)" : "Cash on Delivery (COD)"}</span>
                    </label>
                    
                    <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition ${paymentMethod === "upi" ? "border-emerald-500 bg-emerald-50" : "border-slate-200"}`}>
                      <input type="radio" name="payment" value="upi" checked={paymentMethod === "upi"} onChange={() => setPaymentMethod("upi")} className="w-5 h-5 text-emerald-600 focus:ring-emerald-500" />
                      <span className="ml-3 font-medium text-slate-800">{language === "te" ? "UPI ఆన్‌లైన్ పేమెంట్ (Google Pay/PhonePe)" : "UPI Online Payment (GPay/PhonePe)"}</span>
                    </label>
                  </div>

                  {paymentMethod === "upi" && (
                    <div className="mt-6 p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                      <div className="text-center">
                        <div className="inline-block p-2 bg-white border-2 border-slate-300 rounded-xl mb-3 shadow-sm">
                          <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=agrisaathi@ybl&pn=AgriSaathiStore&cu=INR" alt="UPI QR" className="w-32 h-32" />
                        </div>
                        <p className="font-bold text-slate-800">Scan QR Code or Use UPI ID</p>
                        <p className="text-emerald-700 font-mono font-bold bg-emerald-100 py-1 px-3 rounded-lg inline-block mt-1 border border-emerald-200">agrisaathi@ybl</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{language === "te" ? "లావాదేవీ సంఖ్య (UTR / Txn ID)" : "Transaction Reference ID (UTR)"}</label>
                        <input type="text" value={upiRef} onChange={e => setUpiRef(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Enter 12-digit UTR number" />
                      </div>
                    </div>
                  )}
                </div>
              ) : cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500">
                  <ShoppingCart className="w-24 h-24 text-slate-200 mb-4" />
                  <p className="text-xl font-medium">{language === "te" ? "కార్ట్ ఖాళీగా ఉంది" : "Your cart is empty"}</p>
                  <button 
                    onClick={() => setShowCart(false)}
                    className="mt-6 bg-slate-100 hover:bg-slate-200 text-slate-800 px-6 py-2.5 rounded-full font-bold transition shadow-sm"
                  >
                    {language === "te" ? "ఉత్పత్తులను బ్రౌజ్ చేయండి" : "Browse products"}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-4 border-b border-slate-100 pb-6 group">
                      <img src={item.product.image} alt={item.product.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover bg-slate-100 border border-slate-200 shadow-sm" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-slate-800 line-clamp-2">
                            {language === "te" ? item.product.nameTe : item.product.name}
                          </h4>
                          <div className="text-xs text-slate-500 mt-1">{item.product.unit}</div>
                        </div>
                        <div className="flex items-end justify-between mt-2">
                          <div className="font-black text-slate-900 text-lg">₹{item.product.price}</div>
                          <div className="flex items-center bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-slate-600 hover:bg-slate-200 font-bold transition"
                            >-</button>
                            <div className="w-10 text-center font-bold text-slate-800 text-sm">{item.quantity}</div>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-slate-600 hover:bg-slate-200 font-bold transition"
                            >+</button>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-rose-500 p-2 rounded-lg hover:bg-rose-50 self-start transition opacity-100 sm:opacity-0 group-hover:opacity-100"
                      >
                        <Plus className="w-5 h-5 rotate-45" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {checkoutStep !== "success" && cart.length > 0 && (
              <div className="p-6 border-t border-slate-200 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600 font-medium">{language === "te" ? "మొత్తం (Subtotal):" : "Subtotal:"}</span>
                  <span className="text-lg font-black text-slate-900">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-600 font-medium">{language === "te" ? "డెలివరీ (Delivery):" : "Delivery:"}</span>
                  <span className="text-emerald-600 font-bold">{language === "te" ? "ఉచితం (Free)" : "Free"}</span>
                </div>
                
                {checkoutStep === "cart" && (
                  <button
                    onClick={() => setCheckoutStep("address")}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
                  >
                    {language === "te" ? `కొనసాగించండి (Continue)` : `Continue to Delivery`}
                  </button>
                )}

                {checkoutStep === "address" && (
                  <div className="flex gap-3">
                    <button onClick={() => setCheckoutStep("cart")} className="px-6 py-4 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition">{language === "te" ? "వెనుకకు" : "Back"}</button>
                    <button
                      onClick={() => {
                        if(address.name && address.phone && address.address && address.pincode) {
                          setCheckoutStep("payment");
                        } else {
                          alert(language === "te" ? "దయచేసి అన్ని వివరాలను పూరించండి" : "Please fill all address details");
                        }
                      }}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
                    >
                      {language === "te" ? `కొనసాగించండి (Continue)` : `Continue to Payment`}
                    </button>
                  </div>
                )}

                {checkoutStep === "payment" && (
                  <div className="flex gap-3">
                    <button onClick={() => setCheckoutStep("address")} className="px-6 py-4 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition">{language === "te" ? "వెనుకకు" : "Back"}</button>
                    <button
                      onClick={() => {
                        if (paymentMethod === "upi" && !upiRef) {
                          alert(language === "te" ? "దయచేసి UPI లావాదేవీ సంఖ్య (UTR) నమోదు చేయండి" : "Please enter UPI transaction UTR ID");
                          return;
                        }
                        handleCheckout();
                      }}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
                    >
                      {language === "te" ? `₹${cartTotal} చెల్లించండి (Place Order)` : `Place Order (₹${cartTotal})`}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
"""

content = content[:content.find(cart_drawer_replace_start)] + cart_drawer_ui

with open("src/components/AgriStore.tsx", "w") as f:
    f.write(content)
