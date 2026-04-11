export default function Loader() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 24px",
      gap: "16px",
    }}>
      <div style={{ position: "relative", width: "48px", height: "48px" }}>
        {/* Pulse ring */}
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: "50%",
          border: "3px solid var(--accent)",
          opacity: 0,
          animation: "pulse-ring 1.2s cubic-bezier(0.2,0.6,0.4,1) infinite",
        }} />
        {/* Spinner */}
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: "50%",
          border: "3px solid var(--border)",
          borderTopColor: "var(--accent)",
          animation: "spin 0.8s linear infinite",
        }} />
      </div>
      <p style={{
        color: "var(--text-muted)",
        fontSize: "14px",
        fontWeight: 500,
        letterSpacing: "0.04em",
      }}>
        Fetching weather…
      </p>
    </div>
  )
}