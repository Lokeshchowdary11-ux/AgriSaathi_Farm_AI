import re

with open("src/components/AgriStore.tsx", "r") as f:
    content = f.read()

# Add new icons
content = content.replace(
    "import { ShoppingCart, Leaf, Droplet, Package, Tractor, Search, Filter, Star, Plus, CheckCircle2 } from \"lucide-react\";",
    "import { ShoppingCart, Leaf, Droplet, Package, Tractor, Search, Filter, Star, Plus, CheckCircle2, History, Truck, Clock, MapPin } from \"lucide-react\";"
)

# Add Order interface
order_interface = """
interface Order {
  id: string;
  date: string;
  items: { product: Product; quantity: number }[];
  total: number;
  status: "Processing" | "Shipped" | "Delivered";
}
"""
content = content.replace("interface Product {", order_interface + "\ninterface Product {")

# Add Order state
state_search = '  const [upiRef, setUpiRef] = useState("");'
state_replacement = """  const [upiRef, setUpiRef] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [showOrders, setShowOrders] = useState(false);"""
content = content.replace(state_search, state_replacement)

# Update handleCheckout
handle_checkout_search = """  const handleCheckout = () => {
    setCheckoutStep("success");
    setCart([]);
    setTimeout(() => {
      setCheckoutStep("cart");
      setShowCart(false);
      setAddress({ name: "", phone: "", address: "", pincode: "" });
      setPaymentMethod("cod");
      setUpiRef("");
    }, 4000);
  };"""

handle_checkout_replacement = """  const handleCheckout = () => {
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 1000000)}`,
      date: new Date().toLocaleDateString(),
      items: [...cart],
      total: cartTotal,
      status: "Processing"
    };
    setOrders(prev => [newOrder, ...prev]);

    setCheckoutStep("success");
    setCart([]);
    setTimeout(() => {
      setCheckoutStep("cart");
      setShowCart(false);
      setAddress({ name: "", phone: "", address: "", pincode: "" });
      setPaymentMethod("cod");
      setUpiRef("");
    }, 4000);
  };"""
content = content.replace(handle_checkout_search, handle_checkout_replacement)

# Update Header Buttons
header_buttons_search = """        <button
          onClick={() => setShowCart(true)}
          className="relative bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition flex items-center gap-2 shadow-lg"
        >"""
header_buttons_replacement = """        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowOrders(true)}
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 md:px-6 py-3 rounded-xl font-bold transition flex items-center gap-2 shadow-sm"
          >
            <History className="w-5 h-5" />
            <span className="hidden sm:inline">{language === "te" ? "ఆర్డర్ హిస్టరీ" : "Orders"}</span>
          </button>
          <button
            onClick={() => setShowCart(true)}
            className="relative bg-emerald-600 hover:bg-emerald-700 text-white px-4 md:px-6 py-3 rounded-xl font-bold transition flex items-center gap-2 shadow-lg"
          >"""
content = content.replace(header_buttons_search, header_buttons_replacement)

# Add an extra </div> to close the new div in header
header_buttons_end_search = """            </span>
          )}
        </button>
      </div>"""
header_buttons_end_replacement = """            </span>
          )}
        </button>
        </div>
      </div>"""
content = content.replace(header_buttons_end_search, header_buttons_end_replacement)

# Add Orders Drawer UI
orders_drawer_ui = """
      {/* Orders Drawer / Modal overlay */}
      {showOrders && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowOrders(false)}></div>
          <div className="relative w-full max-w-lg bg-slate-50 h-full shadow-2xl flex flex-col animate-slide-in-right">
            <div className="p-6 border-b border-slate-200 bg-white flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <History className="w-7 h-7 text-emerald-600" />
                {language === "te" ? "మీ ఆర్డర్లు" : "Your Orders"}
              </h2>
              <button onClick={() => setShowOrders(false)} className="p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full transition shadow-sm">
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {orders.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500">
                  <Package className="w-24 h-24 text-slate-200 mb-4" />
                  <p className="text-xl font-medium">{language === "te" ? "ఆర్డర్లు లేవు" : "No orders yet"}</p>
                  <button 
                    onClick={() => {
                      setShowOrders(false);
                    }}
                    className="mt-6 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-6 py-2.5 rounded-full font-bold transition shadow-sm"
                  >
                    {language === "te" ? "షాపింగ్ ప్రారంభించండి" : "Start Shopping"}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                      <div className="p-4 bg-slate-100 border-b border-slate-200 flex flex-wrap justify-between items-center gap-2">
                        <div>
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Order ID</p>
                          <p className="font-mono font-bold text-slate-800">{order.id}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Date</p>
                          <p className="font-bold text-slate-800">{order.date}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Total</p>
                          <p className="font-bold text-emerald-700">₹{order.total}</p>
                        </div>
                      </div>
                      
                      <div className="p-5 border-b border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-slate-800">{language === "te" ? "డెలివరీ స్థితి" : "Delivery Status"}</h4>
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                            order.status === "Delivered" ? "bg-emerald-100 text-emerald-700" :
                            order.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                            "bg-amber-100 text-amber-700"
                          }`}>
                            {order.status === "Processing" && (language === "te" ? "ప్రోసెసింగ్" : "Processing")}
                            {order.status === "Shipped" && (language === "te" ? "రవాణా చేయబడింది" : "Shipped")}
                            {order.status === "Delivered" && (language === "te" ? "డెలివరీ అయింది" : "Delivered")}
                          </span>
                        </div>
                        
                        <div className="relative">
                          <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-200"></div>
                          
                          <div className="relative flex items-start gap-4 mb-4">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${
                              ["Processing", "Shipped", "Delivered"].includes(order.status) ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-400"
                            }`}>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <p className={`font-bold ${["Processing", "Shipped", "Delivered"].includes(order.status) ? "text-slate-800" : "text-slate-400"}`}>
                                {language === "te" ? "ఆర్డర్ ధృవీకరించబడింది" : "Order Confirmed"}
                              </p>
                              <p className="text-xs text-slate-500">Your order has been placed.</p>
                            </div>
                          </div>
                          
                          <div className="relative flex items-start gap-4 mb-4">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${
                              ["Shipped", "Delivered"].includes(order.status) ? "bg-blue-500 text-white" : "bg-slate-200 text-slate-400"
                            }`}>
                              <Truck className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <p className={`font-bold ${["Shipped", "Delivered"].includes(order.status) ? "text-slate-800" : "text-slate-400"}`}>
                                {language === "te" ? "రవాణా చేయబడింది" : "Shipped"}
                              </p>
                              <p className="text-xs text-slate-500">Package is on the way.</p>
                            </div>
                          </div>
                          
                          <div className="relative flex items-start gap-4">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${
                              order.status === "Delivered" ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-400"
                            }`}>
                              <MapPin className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <p className={`font-bold ${order.status === "Delivered" ? "text-slate-800" : "text-slate-400"}`}>
                                {language === "te" ? "డెలివరీ అయింది" : "Delivered"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Items</p>
                        <div className="space-y-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex gap-3">
                              <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover bg-white border border-slate-200" />
                              <div className="flex-1">
                                <p className="font-bold text-sm text-slate-800 line-clamp-1">{language === "te" ? item.product.nameTe : item.product.name}</p>
                                <div className="flex justify-between mt-1 text-xs text-slate-500">
                                  <span>Qty: {item.quantity}</span>
                                  <span className="font-bold text-slate-700">₹{item.product.price * item.quantity}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
"""
content = content.replace("{/* Cart Drawer / Modal overlay */}", orders_drawer_ui + "\n      {/* Cart Drawer / Modal overlay */}")

with open("src/components/AgriStore.tsx", "w") as f:
    f.write(content)
