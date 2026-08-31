import { useEffect, useState } from "react";
import {
  DEFAULT_PLACE,
  fetchCurrentWeather,
  weatherGlyph,

} from "@/lib/weather";

const REFRESH_MS = 10 * 60 * 1000;

/**
 * Header widget: local clock + current temperature and condition (Open-Meteo).
 * Uses browser geolocation when granted, otherwise Sevilla.
 */
export function WeatherWidget({ compact = false }                       ) {
  const [clock, setClock] = useState               (null);
  const [weather, setWeather] = useState                       (null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
      );
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let timer                                            ;

    const load = async (lat        , lon        , place        ) => {
      try {
        const data = await fetchCurrentWeather(lat, lon, place);
        if (!cancelled) {
          setWeather(data);
          setFailed(false);
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    };

    const start = (lat        , lon        , place        ) => {
      void load(lat, lon, place);
      timer = setInterval(() => void load(lat, lon, place), REFRESH_MS);
    };

    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => start(pos.coords.latitude, pos.coords.longitude, "Tu villa"),
        () => start(DEFAULT_PLACE.latitude, DEFAULT_PLACE.longitude, DEFAULT_PLACE.name),
        { timeout: 6000 },
      );
    } else {
      start(DEFAULT_PLACE.latitude, DEFAULT_PLACE.longitude, DEFAULT_PLACE.name);
    }

    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
    };
  }, []);

  const glyph               = weather ? weatherGlyph(weather.code, weather.isDay) : "cloud";

  return (
    <div
      className="gold-frame flex items-center gap-3 rounded-sm px-3 py-1.5"
      style={{ backgroundColor: "oklch(0.12 0.01 60 / 0.55)" }}
      aria-live="polite"
    >
      <span className="text-gold/85">
        <SkyGlyph glyph={glyph} />
      </span>
      <div className="leading-tight">
        <p className="font-display text-[15px] tracking-[0.08em] text-gold">
          {clock ?? "--:--"}
          {weather ? (
            <span className="ml-2 text-parchment/90">{weather.temperature}&nbsp;°C</span>
          ) : null}
        </p>
        {!compact && (
          <p className="font-body text-[13px] text-parchment/70">
            {weather
              ? `${weather.label} · ${weather.place}`
              : failed
                ? "El heraldo no trae parte del cielo"
                : "Consultando el cielo…"}
          </p>
        )}
      </div>
    </div>
  );
}

function SkyGlyph({ glyph }                         ) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.3,
    "aria-hidden": true         ,
  };
  switch (glyph) {
    case "sun":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2v2.4M12 19.6V22M2 12h2.4M19.6 12H22M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7" />
        </svg>
      );
    case "moon":
      return (
        <svg {...common}>
          <path d="M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z" />
        </svg>
      );
    case "rain":
      return (
        <svg {...common}>
          <path d="M6 14a4 4 0 011-7.9A5 5 0 0117 7a3.5 3.5 0 01.5 7H6z" />
          <path d="M8.5 17.5l-1 3M12.5 17.5l-1 3M16.5 17.5l-1 3" />
        </svg>
      );
    case "snow":
      return (
        <svg {...common}>
          <path d="M6 14a4 4 0 011-7.9A5 5 0 0117 7a3.5 3.5 0 01.5 7H6z" />
          <path d="M9 18.5h.01M12.5 20h.01M16 18.5h.01" />
        </svg>
      );
    case "storm":
      return (
        <svg {...common}>
          <path d="M6 14a4 4 0 011-7.9A5 5 0 0117 7a3.5 3.5 0 01.5 7H6z" />
          <path d="M12.5 16l-2.5 5h4l-1.5 3" />
        </svg>
      );
    case "fog":
      return (
        <svg {...common}>
          <path d="M4 10h16M6 14h12M4 18h16" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M6 16a4 4 0 011-7.9A5 5 0 0117 9a3.5 3.5 0 01.5 7H6z" />
        </svg>
      );
  }
}
