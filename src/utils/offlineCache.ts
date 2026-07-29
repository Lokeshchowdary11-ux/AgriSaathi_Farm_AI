// Offline Caching Utility for Remote Field Use without Cellular Coverage

export const OFFLINE_CACHE_KEYS = {
  DASHBOARD_WEATHER: "agrishaathi_offline_weather",
  DASHBOARD_MANDI: "agrishaathi_offline_mandi",
  DASHBOARD_NOTIFICATIONS: "agrishaathi_offline_notifs",
  FARMER_PROFILE: "agrishaathi_offline_profile",
  LAST_SYNC_TIMESTAMP: "agrishaathi_last_sync",
};

export function saveToOfflineCache<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    localStorage.setItem(OFFLINE_CACHE_KEYS.LAST_SYNC_TIMESTAMP, new Date().toISOString());
  } catch (err) {
    console.error("Failed to save to offline cache:", err);
  }
}

export function getFromOfflineCache<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item) as T;
    }
  } catch (err) {
    console.error("Failed to read from offline cache:", err);
  }
  return fallback;
}

export function getLastSyncTime(): string {
  try {
    const ts = localStorage.getItem(OFFLINE_CACHE_KEYS.LAST_SYNC_TIMESTAMP);
    if (ts) {
      return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  } catch {
    // ignore
  }
  return "Cached Offline";
}
