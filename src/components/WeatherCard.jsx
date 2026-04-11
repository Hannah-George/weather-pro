export default function WeatherCard({ weather }) {
  if (!weather) return null

  const { name, sys, main, weather: cond, wind, visibility } = weather
  const icon = cond[0].icon
  const description = cond[0].description
  const isDay = icon.endsWith("d")

  const gradients = {
    "01": isDay
      ? "linear-gradient(135deg,#fbbf24,#f97316)"
      : "linear-gradient(135deg,#1e1b4b,#312e81)",
    "02": isDay
      ? "linear-gradient(135deg,#60a5fa,#3b82f6)"
      : "linear-gradient(135deg,#1e3a5f,#1e40af)",
    "03": "linear-gradient(135deg,#64748b,#475569)",
    "04": "linear-gradient(135deg,#374151,#1f2937)",
    "09": "linear-gradient(135deg,#1d4ed8,#1e40af)",
    "10": "linear-gradient(135deg,#2563eb,#1d4ed8)",
    "11": "linear-gradient(135deg,#312e81,#1e1b4b)",
    "13": "linear-gradient(135deg,#bfdbfe,#93c5fd)",
    "50": "linear-gradient(135deg,#9ca3af,#6b7280)",
  }
  const bg = gradients[icon.slice(0, 2)] || gradients["03"]

  return (
    <div
      className="card"
      style={{
        background: bg,
        padding: "36px 32px",
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "24px",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circle */}
      <div style={{
        position: "absolute", right: "-60px", top: "-60px",
        width: "260px", height: "260px",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.08)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: "40px", bottom: "-80px",
        width: "180px", height: "180px",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.05)",
        pointerEvents: "none",
      }} />

      {/* Left: location + temp */}
      <div>
        <p style={{
          fontSize: "14px",
          fontWeight: 500,
          opacity: 0.8,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: "4px",
        }}>
          {sys.country} · {new Date().toLocaleDateString("en-US", {
            weekday: "long", month: "short", day: "numeric"
          })}
        </p>
        <h1 style={{
          fontSize: "clamp(36px,6vw,56px)",
          fontWeight: 700,
          letterSpacing: "-2px",
          lineHeight: 1,
          marginBottom: "6px",
        }}>
          {name}
        </h1>
        <p style={{
          fontSize: "clamp(64px,10vw,96px)",
          fontWeight: 700,
          letterSpacing: "-4px",
          lineHeight: 1,
          marginBottom: "8px",
        }}>
          {Math.round(main.temp)}°
        </p>
        <p style={{
          fontSize: "18px",
          opacity: 0.9,
          textTransform: "capitalize",
          fontWeight: 400,
        }}>
          {description}
        </p>
        <p style={{ fontSize: "14px", opacity: 0.75, marginTop: "6px" }}>
          Feels like {Math.round(main.feels_like)}° · H {Math.round(main.temp_max)}° L {Math.round(main.temp_min)}°
        </p>
      </div>

      {/* Right: icon + quick stats */}
      <div style={{ textAlign: "center" }}>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt={description}
          style={{ width: "120px", height: "120px", filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.25))" }}
        />
        <div style={{
          display: "flex", gap: "20px", justifyContent: "center",
          marginTop: "8px", fontSize: "13px", opacity: 0.85,
        }}>
          <span>💧 {main.humidity}%</span>
          <span>💨 {Math.round(wind.speed)} m/s</span>
          <span>👁 {(visibility / 1000).toFixed(1)} km</span>
        </div>
      </div>
    </div>
  )
}