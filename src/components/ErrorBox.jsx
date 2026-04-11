export default function ErrorBox({ error, onClose }) {
  if (!error) return null

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      background: "rgba(239,68,68,0.10)",
      border: "1px solid rgba(239,68,68,0.25)",
      borderRadius: "12px",
      padding: "12px 16px",
      marginBottom: "16px",
      animation: "fadeUp 0.3s ease both",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "18px" }}>⚠️</span>
        <p style={{ color: "var(--danger)", fontWeight: 500, fontSize: "14px" }}>
          {error}
        </p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: "none", border: "none",
            color: "var(--danger)", fontSize: "18px",
            cursor: "pointer", lineHeight: 1, padding: "2px 6px",
            opacity: 0.7,
          }}
        >
          ×
        </button>
      )}
    </div>
  )
}