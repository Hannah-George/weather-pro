import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: "10px",
      padding: "10px 14px",
      backdropFilter: "blur(12px)",
    }}>
      <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px" }}>{label}</p>
      <p style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-h)" }}>
        {Math.round(payload[0].value)}°C
      </p>
      {payload[1] && (
        <p style={{ fontSize: "13px", color: "var(--accent)" }}>
          Feels like {Math.round(payload[1].value)}°
        </p>
      )}
    </div>
  )
}

export default function TempChart({ forecast, dark }) {
  if (!forecast) return null

  const data = forecast.list.slice(0, 10).map(item => ({
    time:      item.dt_txt.slice(5, 16).replace("T", " "),
    temp:      parseFloat(item.main.temp.toFixed(1)),
    feelsLike: parseFloat(item.main.feels_like.toFixed(1)),
  }))

  const strokeColor  = dark ? "#818cf8" : "#6366f1"
  const strokeColor2 = dark ? "#a78bfa" : "#8b5cf6"
  const fillId       = dark ? "tempGradDark" : "tempGradLight"

  return (
    <div className="card" style={{ padding: "20px 24px 12px", marginBottom: "16px" }}>
      <p style={{
        fontSize: "12px", fontWeight: 600, color: "var(--text-muted)",
        textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px",
      }}>
        Temperature Trend
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity={0.3} />
              <stop offset="100%" stopColor={strokeColor} stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="time"
            tick={{ fill: "var(--text-muted)", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={v => v.slice(5)}
          />
          <YAxis
            tick={{ fill: "var(--text-muted)", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={v => `${v}°`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="temp"
            stroke={strokeColor}
            strokeWidth={2.5}
            fill={`url(#${fillId})`}
            dot={false}
            activeDot={{ r: 5, fill: strokeColor, strokeWidth: 0 }}
            name="Temperature"
          />
          <Area
            type="monotone"
            dataKey="feelsLike"
            stroke={strokeColor2}
            strokeWidth={1.5}
            fill="none"
            dot={false}
            strokeDasharray="5 4"
            name="Feels like"
          />
        </AreaChart>
      </ResponsiveContainer>
      <p style={{ fontSize: "12px", color: "var(--text-muted)", textAlign: "center", marginTop: "4px" }}>
        <span style={{ color: strokeColor, fontWeight: 600 }}>——</span> Temperature &nbsp;
        <span style={{ color: strokeColor2, fontWeight: 600 }}>- - -</span> Feels like
      </p>
    </div>
  )
}