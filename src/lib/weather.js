/**
 * Open-Meteo current weather (no API key required).
 * Docs: https://open-meteo.com/en/docs
 */
import { http } from "./http";

export const DEFAULT_PLACE = { name: "Sevilla", latitude: 37.3891, longitude: -5.9845 };

/** WMO weather interpretation codes → Spanish labels. */
const WMO = {
  0: "Cielo despejado",
  1: "Mayormente despejado",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Niebla",
  48: "Niebla helada",
  51: "Llovizna ligera",
  53: "Llovizna",
  55: "Llovizna intensa",
  56: "Llovizna helada",
  57: "Llovizna helada intensa",
  61: "Lluvia ligera",
  63: "Lluvia",
  65: "Lluvia intensa",
  66: "Lluvia helada",
  67: "Lluvia helada intensa",
  71: "Nieve ligera",
  73: "Nieve",
  75: "Nieve intensa",
  77: "Granizo menudo",
  80: "Chubascos ligeros",
  81: "Chubascos",
  82: "Chubascos violentos",
  85: "Chubascos de nieve",
  86: "Chubascos de nieve intensos",
  95: "Tormenta",
  96: "Tormenta con granizo",
  99: "Tormenta con granizo fuerte",
};

export function weatherLabel(code) {
  return WMO[code] ?? "Cielo incierto";
}

export function weatherGlyph(code, isDay) {
  if (code === 0 || code === 1) return isDay ? "sun" : "moon";
  if (code === 2 || code === 3) return "cloud";
  if (code === 45 || code === 48) return "fog";
  if (code >= 95) return "storm";
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "snow";
  if (code >= 51) return "rain";
  return "cloud";
}

export async function fetchCurrentWeather(latitude, longitude, place) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
    `&current=temperature_2m,weather_code,is_day&timezone=auto`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Open-Meteo ${res.status}`);
  const json = await res.json();

  const code = json.current.weather_code;
  return {
    temperature: Math.round(json.current.temperature_2m),
    code,
    isDay: json.current.is_day === 1,
    label: weatherLabel(code),
    place,
  };
}
