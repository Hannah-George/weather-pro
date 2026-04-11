import { formatForecastDays } from "../utils/formatForecast"

export default function ForecastDays({ forecast }) {
  if (!forecast) return null

  const days = formatForecastDays(forecast)

  return (
    <div className="card" style={{ padding: "20px 24px", marginBottom: "16px" }}>
      <p style={{
        fontSize: "12px", fontWeight: 600, color: "var(--text-muted)",
        textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px",
      }}>
        5-Day Forecast
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {days.map((day, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom: i < days.length - 1 ? "1px solid var(--border)" : "none",
              gap: "12px",
            }}
          >
            <span style={{ flex: "0 0 90px", fontWeight: 600, color: "var(--text-h)", fontSize: "15px" }}>
              {i === 0 ? "Today" : day.label}
            </span>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.description}
              style={{ width: "36px", height: "36px" }}
            />
            <span style={{ flex: 1, fontSize: "13px", color: "var(--text-muted)", textTransform: "capitalize" }}>
              {day.description}
            </span>
            <div style={{ display: "flex", gap: "12px", fontSize: "15px", fontWeight: 600 }}>
              <span style={{ color: "var(--text-h)" }}>{Math.round(day.tempMax)}°</span>
              <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>{Math.round(day.tempMin)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}