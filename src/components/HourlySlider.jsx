import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"

export default function HourlySlider({ forecast }) {
  if (!forecast) return null

  const items = forecast.list.slice(0, 16)

  return (
    <div className="card" style={{ padding: "20px 24px", marginBottom: "16px", overflow: "hidden" }}>
      <p style={{
        fontSize: "12px", fontWeight: 600, color: "var(--text-muted)",
        textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "14px",
      }}>
        Hourly Forecast
      </p>
      <Swiper
        modules={[Navigation]}
        slidesPerView="auto"
        spaceBetween={10}
        navigation
        style={{ paddingBottom: "4px" }}
      >
        {items.map((item, i) => {
          const isNow = i === 0
          return (
            <SwiperSlide key={i} style={{ width: "80px" }}>
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                padding: "12px 8px",
                borderRadius: "12px",
                background: isNow ? "var(--accent)" : "var(--bg-card-2)",
                border: "1px solid",
                borderColor: isNow ? "transparent" : "var(--border)",
                color: isNow ? "#fff" : "var(--text)",
                transition: "all 0.2s",
                cursor: "default",
              }}>
                <span style={{
                  fontSize: "12px",
                  fontWeight: isNow ? 700 : 500,
                  opacity: isNow ? 1 : 0.8,
                }}>
                  {isNow ? "Now" : item.dt_txt.slice(11, 16)}
                </span>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt=""
                  style={{ width: "36px", height: "36px" }}
                />
                <span style={{ fontSize: "15px", fontWeight: 700 }}>
                  {Math.round(item.main.temp)}°
                </span>
                <span style={{ fontSize: "11px", opacity: 0.7 }}>
                  {item.main.humidity}%💧
                </span>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}