import React, { useState } from "react";
import { Language, FarmerProfile } from "../types";
import { defaultFarmerProfile } from "../data/mockData";
import { Calculator, DollarSign, PieChart, Coins, Scale, Sprout, ArrowRightLeft, Sparkles } from "lucide-react";

interface FinancialCalculatorsProps {
  language: Language;
  farmer?: FarmerProfile;
}

export const FinancialCalculators: React.FC<FinancialCalculatorsProps> = ({ language, farmer: initialFarmer }) => {
  const farmer = initialFarmer || defaultFarmerProfile;
  const [activeTab, setActiveTab] = useState<"acre" | "production" | "expense" | "profit" | "loan">("acre");

  // 1. Acre Calculator State
  const [acresInput, setAcresInput] = useState<number>(farmer.landAreaAcres || 3);

  // Conversions: 1 Acre = 43,560 sq.ft = 100 Cents = 40 Guntas = 4,046.86 sq.m
  const sqFt = acresInput * 43560;
  const cents = acresInput * 100;
  const guntas = acresInput * 40;
  const sqMeters = acresInput * 4046.86;

  // 2. Production Calculator State
  const [prodAcres, setProdAcres] = useState<number>(farmer.landAreaAcres || 3);
  const [yieldPerAcre, setYieldPerAcre] = useState<number>(25); // Quintals
  const totalProductionQuintals = prodAcres * yieldPerAcre;

  // 3. Expense Calculator State
  const [seedsCost, setSeedsCost] = useState<number>(12000);
  const [fertilizerCost, setFertilizerCost] = useState<number>(18000);
  const [labourCost, setLabourCost] = useState<number>(25000);
  const [pesticideCost, setPesticideCost] = useState<number>(14000);
  const [waterCost, setWaterCost] = useState<number>(8000);
  const [machineryCost, setMachineryCost] = useState<number>(10000);
  const [otherCost, setOtherCost] = useState<number>(5000);

  const totalExpense = seedsCost + fertilizerCost + labourCost + pesticideCost + waterCost + machineryCost + otherCost;

  // 4. Profit Calculator State
  const [marketPricePerQuintal, setMarketPricePerQuintal] = useState<number>(19500); // e.g. Red Chilli
  const totalRevenue = totalProductionQuintals * marketPricePerQuintal;
  const netProfit = totalRevenue - totalExpense;
  const profitMarginPercent = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : "0";

  // 5. Loan Interest Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(150000); // 1.5 Lakhs
  const [interestRate, setInterestRate] = useState<number>(7); // 7% KCC rate
  const [durationMonths, setDurationMonths] = useState<number>(12);
  const [hasPromptRebate, setHasPromptRebate] = useState(true); // 3% Govt subvention rebate

  const effectiveRate = hasPromptRebate ? Math.max(interestRate - 3, 0) : interestRate;
  const simpleInterest = (loanAmount * effectiveRate * (durationMonths / 12)) / 100;
  const totalRepayment = loanAmount + simpleInterest;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 text-slate-900">
      {/* Title Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white shadow-xs flex items-center justify-center">
            <Calculator className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              {language === "te" ? "📏 వ్యవసాయ లెక్కలు & ఆర్థిక మేనేజర్" : "📏 Farm Calculations & Financial Management"}
            </h1>
            <p className="text-xs text-slate-500">
              {language === "te"
                ? "ఎకరం విస్తీర్ణ మార్పిడి, దిగుబడి, విత్తనాలు/ఎరువుల ఖర్చులు, లాభనష్టాలు మరియు KCC లోన్ వడ్డీ లెక్కలు."
                : "Acre-to-sqft converter, crop production estimator, expense log, net profit & Kisan loan interest calculator."}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
        <button
          onClick={() => setActiveTab("acre")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition shrink-0 cursor-pointer ${
            activeTab === "acre"
              ? "bg-emerald-700 text-white shadow-xs"
              : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>{language === "te" ? "ఎకరా కన్వర్టర్ (Acre)" : "Acre Converter"}</span>
        </button>

        <button
          onClick={() => setActiveTab("production")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition shrink-0 cursor-pointer ${
            activeTab === "production"
              ? "bg-emerald-700 text-white shadow-xs"
              : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
          }`}
        >
          <Sprout className="w-4 h-4" />
          <span>{language === "te" ? "దిగుబడి (Yield)" : "Yield Calculator"}</span>
        </button>

        <button
          onClick={() => setActiveTab("expense")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition shrink-0 cursor-pointer ${
            activeTab === "expense"
              ? "bg-emerald-700 text-white shadow-xs"
              : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>{language === "te" ? "సాగు ఖర్చులు (Expenses)" : "Expense Log"}</span>
        </button>

        <button
          onClick={() => setActiveTab("profit")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition shrink-0 cursor-pointer ${
            activeTab === "profit"
              ? "bg-emerald-700 text-white shadow-xs"
              : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
          }`}
        >
          <PieChart className="w-4 h-4" />
          <span>{language === "te" ? "లాభనష్టాలు (Profit/Loss)" : "Net Profit & Loss"}</span>
        </button>

        <button
          onClick={() => setActiveTab("loan")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition shrink-0 cursor-pointer ${
            activeTab === "loan"
              ? "bg-emerald-700 text-white shadow-xs"
              : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
          }`}
        >
          <Coins className="w-4 h-4" />
          <span>{language === "te" ? "లోన్ వడ్డీ (KCC Loan)" : "Loan Interest"}</span>
        </button>
      </div>

      {/* Tab 1: Acre Converter */}
      {activeTab === "acre" && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="max-w-md mx-auto space-y-3 text-center">
            <h3 className="text-lg font-bold text-slate-900">
              {language === "te" ? "ఎకరాల విస్తీర్ణ మార్పిడి (Acre Conversion Calculator)" : "Land Area & Acre Converter"}
            </h3>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                step="0.1"
                value={acresInput}
                onChange={(e) => setAcresInput(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-center font-bold text-xl text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <span className="font-bold text-slate-700 text-base">Acres</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Square Feet (Sq.Ft)</span>
              <span className="text-lg font-bold text-slate-900">{sqFt.toLocaleString()}</span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Cents (సెంట్లు)</span>
              <span className="text-lg font-bold text-emerald-700">{cents.toLocaleString()}</span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Guntas (గుంటలు)</span>
              <span className="text-lg font-bold text-slate-800">{guntas.toLocaleString()}</span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Sq. Meters (చ.మీ)</span>
              <span className="text-lg font-bold text-slate-900">{sqMeters.toLocaleString(undefined, { maximumFractionDigits: 1 })}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Yield Calculator */}
      {activeTab === "production" && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
          <h3 className="text-lg font-bold text-slate-900">
            {language === "te" ? "పంట దిగుబడి అంచనా (Crop Production Yield Calculator)" : "Crop Yield Production Calculator"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Total Acres (ఎకరాలు)</label>
              <input
                type="number"
                step="0.5"
                value={prodAcres}
                onChange={(e) => setProdAcres(parseFloat(e.target.value) || 0)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Expected Yield per Acre (Quintals/ఎకరా దిగుబడి)</label>
              <input
                type="number"
                value={yieldPerAcre}
                onChange={(e) => setYieldPerAcre(parseFloat(e.target.value) || 0)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Total Expected Production</span>
              <p className="text-2xl font-bold text-emerald-700 mt-1">{totalProductionQuintals} Quintals (క్వింటాళ్ళు)</p>
            </div>
            <div className="text-right text-xs text-slate-500">
              <span>Approx. {(totalProductionQuintals * 1.33).toFixed(0)} Rice Bags (75kg each)</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Expense Calculator */}
      {activeTab === "expense" && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
          <h3 className="text-lg font-bold text-slate-900">
            {language === "te" ? "సాగు ఖర్చుల లెక్కలు (Crop Expense Calculator)" : "Cultivation Expense Log"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block font-medium text-slate-600 mb-1">Seeds Cost (విత్తనాల ఖర్చు ₹)</label>
              <input
                type="number"
                value={seedsCost}
                onChange={(e) => setSeedsCost(parseFloat(e.target.value) || 0)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-600 mb-1">Fertilizer Cost (ఎరువుల ఖర్చు ₹)</label>
              <input
                type="number"
                value={fertilizerCost}
                onChange={(e) => setFertilizerCost(parseFloat(e.target.value) || 0)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-600 mb-1">Labour Cost (కూలీల ఖర్చు ₹)</label>
              <input
                type="number"
                value={labourCost}
                onChange={(e) => setLabourCost(parseFloat(e.target.value) || 0)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-600 mb-1">Pesticide Cost (మందుల ఖర్చు ₹)</label>
              <input
                type="number"
                value={pesticideCost}
                onChange={(e) => setPesticideCost(parseFloat(e.target.value) || 0)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-600 mb-1">Water & Fuel Cost (నీరు/డీజిల్ ₹)</label>
              <input
                type="number"
                value={waterCost}
                onChange={(e) => setWaterCost(parseFloat(e.target.value) || 0)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-600 mb-1">Tractor & Machinery Rent (₹)</label>
              <input
                type="number"
                value={machineryCost}
                onChange={(e) => setMachineryCost(parseFloat(e.target.value) || 0)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
            <span className="font-bold text-sm text-slate-900">Total Cultivation Expense (మొత్తం ఖర్చు):</span>
            <span className="text-xl font-bold text-rose-600">₹{totalExpense.toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* Tab 4: Profit Calculator */}
      {activeTab === "profit" && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
          <h3 className="text-lg font-bold text-slate-900">
            {language === "te" ? "నికర లాభనష్టాల లెక్క (Net Profit & Loss Calculator)" : "Revenue, Profit & Loss Calculator"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-medium text-slate-600 mb-1">Expected Market Price per Quintal (₹/క్వింటాల్)</label>
              <input
                type="number"
                value={marketPricePerQuintal}
                onChange={(e) => setMarketPricePerQuintal(parseFloat(e.target.value) || 0)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-600 mb-1">Total Production (Quintals)</label>
              <input
                type="number"
                value={totalProductionQuintals}
                readOnly
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-emerald-700 font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Gross Revenue</span>
              <span className="text-xl font-bold text-slate-900">₹{totalRevenue.toLocaleString()}</span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Expense</span>
              <span className="text-xl font-bold text-rose-600">₹{totalExpense.toLocaleString()}</span>
            </div>

            <div className={`p-4 rounded-xl text-center border ${netProfit >= 0 ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"}`}>
              <span className={`text-[10px] uppercase font-bold block ${netProfit >= 0 ? "text-emerald-700" : "text-rose-700"}`}>Net Profit / Loss</span>
              <span className={`text-2xl font-bold ${netProfit >= 0 ? "text-emerald-800" : "text-rose-700"}`}>
                ₹{netProfit.toLocaleString()} ({profitMarginPercent}%)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Loan Interest Calculator */}
      {activeTab === "loan" && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
          <h3 className="text-lg font-bold text-slate-900">
            {language === "te" ? "కిసాన్ క్రెడిట్ కార్డ్ (KCC) లోన్ వడ్డీ లెక్కలు" : "Kisan Credit Card (KCC) Loan Interest Calculator"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-medium text-slate-600 mb-1">Loan Amount (అప్పు మొత్తం ₹)</label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(parseFloat(e.target.value) || 0)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-600 mb-1">Base Interest Rate (% P.A.)</label>
              <input
                type="number"
                step="0.5"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-600 mb-1">Duration (Months)</label>
              <input
                type="number"
                value={durationMonths}
                onChange={(e) => setDurationMonths(parseInt(e.target.value) || 1)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <input
              type="checkbox"
              id="prompt-subvention"
              checked={hasPromptRebate}
              onChange={(e) => setHasPromptRebate(e.target.checked)}
              className="w-4 h-4 accent-emerald-600 cursor-pointer"
            />
            <label htmlFor="prompt-subvention" className="text-xs text-slate-700 font-medium cursor-pointer">
              {language === "te"
                ? "సమయానికి రుణం చెల్లించినందుకు 3% ప్రభుత్వ వడ్డీ సబ్సిడీ మినహాయింపు పొందు (3% Prompt Repayment Subsidy)"
                : "Apply 3% Govt Interest Subvention Rebate for Prompt Repayment (Effective Rate: " + effectiveRate + "%)"}
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Principal Loan</span>
              <span className="text-lg font-bold text-slate-900">₹{loanAmount.toLocaleString()}</span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Interest ({durationMonths} M)</span>
              <span className="text-lg font-bold text-amber-700">₹{simpleInterest.toLocaleString()}</span>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
              <span className="text-[10px] text-emerald-700 uppercase font-bold block">Total Repayment Amount</span>
              <span className="text-xl font-bold text-emerald-900">₹{totalRepayment.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
