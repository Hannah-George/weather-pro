export default function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        background: "var(--bg-card)",
        border: "1.5px solid var(--border)",
        borderRadius: "12px",
        padding: "8px 12px",
        fontSize: "20px",
        cursor: "pointer",
        lineHeight: 1,
        boxShadow: "var(--shadow-sm)",
        transition: "all 0.2s",
        backdropFilter: "blur(12px)",
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "var(--shadow)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "var(--shadow-sm)"}
    >
      {dark ? "☀️" : "🌙"}
    </button>
  )
}