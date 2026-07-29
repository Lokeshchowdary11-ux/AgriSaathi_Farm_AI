export type Language = "en" | "te" | "hi" | "ta" | "kn" | "ml" | "mr" | "bn" | "gu" | "pa";

export type ActiveTab =
  | "dashboard"
  | "ai-chat"
  | "ai-assistant"
  | "crop-disease"
  | "smart-farming"
  | "weather"
  | "emergency"
  | "market"
  | "financial"
  | "3d-showcase"
  | "profile"
  | "agri-store";

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
  isMandatory: boolean;
}

export interface FarmerProfile {
  fullName: string;
  age: number | string;
  gender: "Male" | "Female" | "Other";
  mobileNumber: string;
  email: string;
  village: string;
  mandal: string;
  district: string;
  state: string;
  pinCode: string;
  farmLocation: string;
  landAreaAcres: number;
  soilType: "Black Cotton Soil" | "Red Loamy Soil" | "Sandy Loam" | "Clay Soil" | "Alluvial Soil" | "Laterite Soil";
  cropDetails: string;
  primaryCrop?: string;
  cropSowingDate?: string;
  emergencyContact1: EmergencyContact;
  emergencyContact2: EmergencyContact;
  emergencyContact3?: EmergencyContact;
  isLoggedIn: boolean;
}

export interface DiseaseAnalysisResult {
  diseaseName: string;
  confidenceScore: number;
  severity: "High" | "Medium" | "Low" | "Healthy";
  explanation: string;
  treatmentOrganic: string[];
  treatmentChemical: string[];
  preventionMethods: string[];
  recoveryTimeline: string;
}

export interface MandiItem {
  id: string;
  cropName: string;
  cropNameTe: string;
  mandiName: string;
  state: string;
  district: string;
  modalPrice: number; // per quintal in INR
  minPrice: number;
  maxPrice: number;
  priceChange: number; // percentage or change
  trend: "up" | "down" | "stable";
  lastUpdated: string;
  recommendation: string;
  recommendationTe: string;
}

export interface WeatherDay {
  date: string;
  dayName: string;
  tempMax: number;
  tempMin: number;
  condition: "Sunny" | "Rainy" | "Cloudy" | "Thunderstorm" | "Windy";
  humidity: number;
  rainProbability: number;
  windSpeed: number;
  precaution: string;
  precautionTe: string;
}

export interface EmergencyLog {
  id: string;
  timestamp: string;
  locationName: string;
  latLng: string;
  contactsAlerted: string[];
  status: "Triggered" | "Acknowledged" | "Help Responded" | "Cancelled" | "Auto-Fall Dispatched";
  notes: string;
}

export interface ExpenseItem {
  category: "Seeds" | "Fertilizers" | "Labour" | "Pesticides" | "Water & Fuel" | "Machinery" | "Transport & Others";
  amount: number;
  notes: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  titleTe: string;
  message: string;
  messageTe: string;
  type: "weather" | "market" | "emergency" | "scheme" | "soil" | "fertilizer";
  timestamp: string;
  read: boolean;
  soilTypeTag?: string;
  fertilizerDose?: string;
  actionableQuery?: string;
}

export interface AgriNewsItem {
  id: string;
  title: string;
  titleTe: string;
  summary: string;
  summaryTe: string;
  category: "Government Scheme" | "Subsidies & Grants" | "Market & Export" | "Weather & Advisory" | "Tech & Innovations";
  source: string;
  publishedDate: string;
  districtTag: string;
  badge?: string;
  badgeTe?: string;
  schemeBenefits?: string;
  schemeBenefitsTe?: string;
  officialLink?: string;
  actionableQuery?: string;
}
