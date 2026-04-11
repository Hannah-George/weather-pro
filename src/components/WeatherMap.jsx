import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon   from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

// Fix broken Vite/Webpack marker icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl:       markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl:     markerShadow,
})

export default function WeatherMap({ weather }) {
  if (!weather) return null

  const { coord, name, main, weather: cond } = weather

  return (
    <div className="card" style={{ padding: "0", marginBottom: "16px", overflow: "hidden" }}>
      <div style={{
        padding: "16px 24px 12px",
        borderBottom: "1px solid var(--border)",
        fontSize: "12px", fontWeight: 600, color: "var(--text-muted)",
        textTransform: "uppercase", letterSpacing: "0.08em",
      }}>
        Location Map
      </div>
      <MapContainer
        center={[coord.lat, coord.lon]}
        zoom={9}
        style={{ height: "280px", width: "100%" }}
        zoomControl={true}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution=""
        />
        <Marker position={[coord.lat, coord.lon]}>
          <Popup>
            <div style={{ fontFamily: "Outfit, sans-serif", minWidth: "120px" }}>
              <strong>{name}</strong><br />
              {Math.round(main.temp)}°C · {cond[0].description}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}