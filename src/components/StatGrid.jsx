const Stat = ({ icon, label, value, sub, color }) => (
  <div className="card" style={{
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    flex: "1 1 140px",
    minWidth: "130px",
  }}>
    <div style={{ fontSize: "22px" }}>{icon}</div>
    <p style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>
      {label}
    </p>
    <p style={{ fontSize: "22px", fontWeight: 700, color: color || "var(--text-h)", lineHeight: 1 }}>
      {value}
    </p>
    {sub && <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>{sub}</p>}
  </div>
)

function toTime(unix) {
  return new Date(unix * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit", hour12: true,
  })
}

function getWindDir(deg) {
  const dirs = ["N","NE","E","SE","S","SW","W","NW"]
  return dirs[Math.round(deg / 45) % 8]
}

function getAQILabel(aqi) {
  return ["","Good","Fair","Moderate","Poor","Very Poor"][aqi] || "N/A"
}

function getAQIColor(aqi) {
  return ["","var(--success)","#84cc16","var(--warn)","var(--danger)","#9333ea"][aqi] || "var(--text)"
}

export default function StatGrid({ weather }) {
  if (!weather) return null

  const { main, wind, sys, clouds, visibility } = weather

  const pressure = main.pressure
  const humid    = main.humidity
  const cldPct   = clouds?.all ?? "—"
  const visMi    = visibility ? (visibility / 1000).toFixed(1) + " km" : "—"
  const windDir  = wind?.deg != null ? getWindDir(wind.deg) : ""
  const gust     = wind?.gust ? `Gusts ${Math.round(wind.gust)} m/s` : ""

  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "12px",
      marginBottom: "16px",
    }}>
      <Stat
        icon="💧"
        label="Humidity"
        value={`${humid}%`}
        sub={humid > 70 ? "High — feels muggy" : humid < 30 ? "Low — quite dry" : "Comfortable"}
      />
      <Stat
        icon="🌡️"
        label="Pressure"
        value={`${pressure}`}
        sub="hPa"
      />
      <Stat
        icon="💨"
        label="Wind"
        value={`${Math.round(wind.speed)} m/s`}
        sub={`${windDir}${gust ? " · " + gust : ""}`}
      />
      <Stat
        icon="☁️"
        label="Cloud Cover"
        value={`${cldPct}%`}
        sub={cldPct > 80 ? "Overcast" : cldPct > 40 ? "Partly cloudy" : "Mostly clear"}
      />
      <Stat
        icon="👁️"
        label="Visibility"
        value={visMi}
        sub={visibility > 8000 ? "Excellent" : visibility > 4000 ? "Good" : "Poor"}
      />
      <Stat
        icon="🌅"
        label="Sunrise"
        value={toTime(sys.sunrise)}
        sub={`Sunset ${toTime(sys.sunset)}`}
      />
    </div>
  )
}