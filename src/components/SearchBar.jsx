import { useState } from "react"

export default function SearchBar({ onSearch }) {
  const [city, setCity]       = useState("")
  const [focused, setFocused] = useState(false)

  const handleSearch = () => {
    const trimmed = city.trim()
    if (trimmed) { onSearch(trimmed) }
  }

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      background: "var(--bg-card)",
      border: `1.5px solid ${focused ? "var(--accent)" : "var(--border)"}`,
      borderRadius: "12px",
      padding: "6px 8px 6px 14px",
      boxShadow: focused ? `0 0 0 3px var(--accent-glow)` : "var(--shadow-sm)",
      transition: "all 0.2s",
      backdropFilter: "blur(12px)",
      minWidth: "220px",
    }}>
      <span style={{ fontSize: "16px", opacity: 0.5 }}>🔍</span>
      <input
        value={city}
        onChange={e => setCity(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleSearch()}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search city..."
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          background: "transparent",
          color: "var(--text-h)",
          fontSize: "15px",
          fontFamily: "var(--font)",
          fontWeight: 500,
        }}
      />
      {city && (
        <button
          onClick={() => setCity("")}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "var(--text-muted)", fontSize: "16px", lineHeight: 1,
            padding: "2px 4px",
          }}
        >
          ×
        </button>
      )}
      <button
        onClick={handleSearch}
        style={{
          background: "var(--accent)",
          border: "none",
          borderRadius: "8px",
          color: "#fff",
          padding: "6px 14px",
          fontSize: "14px",
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "var(--font)",
          transition: "opacity 0.15s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={e => e.target.style.opacity = "0.85"}
        onMouseLeave={e => e.target.style.opacity = "1"}
      >
        Search
      </button>
    </div>
  )
}