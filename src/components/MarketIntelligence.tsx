import React, { useState, useEffect, useRef } from "react";
import { Language, MandiItem } from "../types";
import { mandiPricesData } from "../data/mockData";
import { TrendingUp, TrendingDown, ArrowRightLeft, Search, Filter, Lightbulb, RefreshCw, Calendar, BarChart2, Download, FileText } from "lucide-react";
import * as d3 from "d3";

interface MarketIntelligenceProps {
  language: Language;
}

interface MonthlyPrice {
  month: string;
  price: number;
  minPrice: number;
  maxPrice: number;
}

export const MarketIntelligence: React.FC<MarketIntelligenceProps> = ({ language }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCrop, setSelectedCrop] = useState<MandiItem>(mandiPricesData[0]);
  const [hoveredPoint, setHoveredPoint] = useState<MonthlyPrice | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const chartRef = useRef<SVGSVGElement | null>(null);

  // Generate 6 months historical price data based on crop modal price
  const getSixMonthHistory = (crop: MandiItem): MonthlyPrice[] => {
    const base = crop.modalPrice;
    // Simulate 6 months trend with slight variation
    return [
      { month: "Feb 2026", price: Math.round(base * 0.90), minPrice: Math.round(base * 0.82), maxPrice: Math.round(base * 0.95) },
      { month: "Mar 2026", price: Math.round(base * 0.93), minPrice: Math.round(base * 0.85), maxPrice: Math.round(base * 0.98) },
      { month: "Apr 2026", price: Math.round(base * 0.96), minPrice: Math.round(base * 0.88), maxPrice: Math.round(base * 1.02) },
      { month: "May 2026", price: Math.round(base * 0.98), minPrice: Math.round(base * 0.91), maxPrice: Math.round(base * 1.05) },
      { month: "Jun 2026", price: Math.round(base * 1.02), minPrice: Math.round(base * 0.95), maxPrice: Math.round(base * 1.09) },
      { month: "Jul 2026", price: base, minPrice: crop.minPrice, maxPrice: crop.maxPrice },
    ];
  };

  const historyData = getSixMonthHistory(selectedCrop);

  const handleDownloadReport = () => {
    setDownloading(true);
    setTimeout(() => {
      const reportContent = `
AGRISHAATHI - CROP MARKET INTELLIGENCE & PRICE TREND REPORT
============================================================
Generated On: ${new Date().toLocaleString()}
Crop Name: ${selectedCrop.cropName} (${selectedCrop.cropNameTe})
Mandi Market: ${selectedCrop.mandiName}, District: ${selectedCrop.district}
Current Modal Price: ₹${selectedCrop.modalPrice} / Quintal
Price Range: ₹${selectedCrop.minPrice} - ₹${selectedCrop.maxPrice} / Quintal
Price Trend / Change: ${selectedCrop.priceChange > 0 ? `+${selectedCrop.priceChange}%` : `${selectedCrop.priceChange}%`} (${selectedCrop.trend})

6-MONTH HISTORICAL PRICE BREAKDOWN (D3 Trend):
${historyData.map(h => `- ${h.month}: Modal ₹${h.price} (Min: ₹${h.minPrice}, Max: ₹${h.maxPrice})`).join("\n")}

AI SELLING RECOMMENDATION:
${selectedCrop.recommendation}

------------------------------------------------------------
AgriShaathi Smart AP & TS Agricultural Extension Service
      `.trim();

      const blob = new Blob([reportContent], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${selectedCrop.cropName.toLowerCase().replace(/\s+/g, '_')}_market_report_2026.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 800);
  };

  // D3 Chart Rendering Effect
  useEffect(() => {
    if (!chartRef.current) return;

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 55 };
    const width = 650 - margin.left - margin.right;
    const height = 260 - margin.top - margin.bottom;

    const g = svg
      .attr("viewBox", `0 0 650 260`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X Scale
    const x = d3
      .scalePoint()
      .domain(historyData.map((d) => d.month))
      .range([0, width])
      .padding(0.5);

    // Y Scale
    const yMin = d3.min(historyData, (d) => d.minPrice) || 1000;
    const yMax = d3.max(historyData, (d) => d.maxPrice) || 5000;
    const y = d3
      .scaleLinear()
      .domain([yMin * 0.9, yMax * 1.05])
      .range([height, 0]);

    // Grid lines
    g.append("g")
      .attr("class", "grid")
      .selectAll("line")
      .data(y.ticks(5))
      .enter()
      .append("line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", (d) => y(d))
      .attr("y2", (d) => y(d))
      .attr("stroke", "#e2e8f0")
      .attr("stroke-dasharray", "4,4");

    // X Axis
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("fill", "#64748b")
      .attr("font-size", "11px")
      .attr("font-weight", "600");

    // Y Axis
    g.append("g")
      .call(d3.axisLeft(y).ticks(5).tickFormat((d) => `₹${d}`))
      .selectAll("text")
      .attr("fill", "#64748b")
      .attr("font-size", "11px")
      .attr("font-weight", "600");

    // Area Gradient Generator
    const area = d3
      .area<MonthlyPrice>()
      .x((d) => x(d.month) || 0)
      .y0(height)
      .y1((d) => y(d.price))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(historyData)
      .attr("fill", "rgba(16, 185, 129, 0.15)")
      .attr("d", area);

    // Line Generator
    const line = d3
      .line<MonthlyPrice>()
      .x((d) => x(d.month) || 0)
      .y((d) => y(d.price))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(historyData)
      .attr("fill", "none")
      .attr("stroke", "#059669")
      .attr("stroke-width", "3")
      .attr("d", line);

    // Dots for data points
    g.selectAll("circle")
      .data(historyData)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.month) || 0)
      .attr("cy", (d) => y(d.price))
      .attr("r", 6)
      .attr("fill", "#ffffff")
      .attr("stroke", "#059669")
      .attr("stroke-width", "3")
      .style("cursor", "pointer")
      .on("mouseover", (event, d) => {
        setHoveredPoint(d);
      })
      .on("mouseout", () => {
        setHoveredPoint(null);
      });
  }, [selectedCrop, historyData]);

  const filteredItems = mandiPricesData.filter(
    (item) =>
      item.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.cropNameTe.includes(searchTerm) ||
      item.mandiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 text-slate-900">
      {/* Title Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white shadow-xs flex items-center justify-center">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              {language === "te" ? "💰 మార్కెట్ ధరలు & 6 నెలల ట్రెండ్స్ (D3 Price Trends)" : "💰 Mandi Intelligence & 6-Month D3 Price Trends"}
            </h1>
            <p className="text-xs text-slate-500">
              {language === "te"
                ? "ఆంధ్రప్రదేశ్ & తెలంగాణ మార్కెట్ యార్డుల తాజా ధరలు మరియు D3 హిస్టారికల్ చార్ట్ విశ్లేషణ."
                : "Real-time crop market prices across AP & TS mandis with D3.js historical price trends over the last 6 months."}
            </p>
          </div>
        </div>
      </div>

      {/* Featured Selected Crop Chart & AI Selling Tip */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold uppercase tracking-wider mb-1">
              <span>{selectedCrop.mandiName} ({selectedCrop.district})</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              {language === "te" ? selectedCrop.cropNameTe : selectedCrop.cropName}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Modal Price</span>
              <span className="text-2xl font-bold text-emerald-700">₹{selectedCrop.modalPrice.toLocaleString()}/Qtl</span>
            </div>
            <div className="border-l border-slate-200 pl-4">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Price Range</span>
              <span className="text-xs font-bold text-slate-700">
                ₹{selectedCrop.minPrice} - ₹{selectedCrop.maxPrice}
              </span>
            </div>

            <div className="border-l border-slate-200 pl-4">
              <button
                onClick={handleDownloadReport}
                disabled={downloading}
                className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow-xs cursor-pointer disabled:opacity-50"
              >
                {downloading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{language === "te" ? "రిపోర్ట్ సిద్ధం..." : "Generating..."}</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <span className="text-amber-300">✓</span>
                    <span>{language === "te" ? "డౌన్‌లోడ్ పూర్తయింది!" : "Downloaded!"}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-amber-300" />
                    <span>{language === "te" ? "రిపోర్ట్ డౌన్‌లోడ్ (PDF/TXT)" : "Download Report"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* D3 Historical 6-Month Price Trend Chart */}
        <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-700">
            <div className="flex items-center space-x-2">
              <BarChart2 className="w-4 h-4 text-emerald-700" />
              <span className="font-extrabold">
                {language === "te" ? "గత 6 నెలల ధరల ట్రెండ్ (D3.js Line Chart)" : "Past 6 Months Historical Price Trend (D3.js)"}
              </span>
            </div>
            {hoveredPoint ? (
              <span className="bg-emerald-100 text-emerald-900 px-3 py-1 rounded-lg text-xs font-bold animate-fade-in">
                {hoveredPoint.month}: <span className="text-emerald-700 font-black">₹{hoveredPoint.price}/Qtl</span> (Range: ₹{hoveredPoint.minPrice} - ₹{hoveredPoint.maxPrice})
              </span>
            ) : (
              <span className="text-emerald-700 font-bold bg-white border border-emerald-200 px-2.5 py-0.5 rounded-lg shadow-2xs">
                {selectedCrop.priceChange > 0 ? `+${selectedCrop.priceChange}% Bullish` : `${selectedCrop.priceChange}% Stable`}
              </span>
            )}
          </div>

          <div className="w-full bg-white rounded-xl p-2 border border-slate-200 shadow-2xs">
            <svg ref={chartRef} className="w-full h-auto max-h-[260px] overflow-visible" />
          </div>

          <p className="text-[11px] text-slate-500 text-center font-medium">
            💡 Hover over data points on the chart to inspect monthly modal prices and market ranges.
          </p>
        </div>

        {/* AI Selling Recommendation */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start space-x-3">
          <Lightbulb className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              {language === "te" ? "AI పంట అమ్మకపు ఉద్దేశపూర్వక సలహా" : "AI Selling Strategy Advice"}
            </h4>
            <p className="text-xs sm:text-sm text-amber-950 mt-1 leading-relaxed font-medium">
              {language === "te" ? selectedCrop.recommendationTe : selectedCrop.recommendation}
            </p>
          </div>
        </div>
      </div>

      {/* Filter & Mandi Search Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === "te" ? "పంట లేదా మార్కెట్ పేరు వెతకండి..." : "Search crop or mandi location..."}
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
          <span className="text-xs text-slate-500 font-medium">Showing {filteredItems.length} Mandi Markets</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const isSelected = selectedCrop.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedCrop(item)}
                className={`p-4 rounded-2xl border transition cursor-pointer space-y-3 ${
                  isSelected
                    ? "bg-emerald-50/60 border-emerald-600 shadow-xs ring-1 ring-emerald-600/30"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">
                    {language === "te" ? item.cropNameTe : item.cropName}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.trend === "up"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-600 border border-slate-200"
                    }`}
                  >
                    {item.trend === "up" ? "↑ Bullish" : "→ Stable"}
                  </span>
                </div>

                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-bold text-emerald-700">
                    ₹{item.modalPrice.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-500">/ Quintal</span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{item.mandiName} ({item.district})</span>
                  <span className="text-slate-700 font-medium">{item.lastUpdated.split(" ")[0]}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

