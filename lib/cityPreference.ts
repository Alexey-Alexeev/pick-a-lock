const STORAGE_KEY = "pick-a-lock:preferred-city";

export function getStoredCitySlug(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setStoredCitySlug(slug: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, slug);
  } catch {
    // localStorage unavailable (private browsing, disabled storage) — fail silently.
  }
}
