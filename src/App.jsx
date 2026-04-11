import { useEffect, useState, useCallback } from "react"

import SearchBar from "./components/SearchBar"
import WeatherCard from "./components/WeatherCard"
import TempChart from "./components/TempChart"
import HourlySlider from "./components/HourlySlider"
import WeatherMap from "./components/WeatherMap"
import ThemeToggle from "./components/ThemeToggle"
import Loader from "./components/Loader"
import ErrorBox from "./components/ErrorBox"
import StatGrid from "./components/StatGrid"
import ForecastDays from "./components/ForecastDays"

import {
  getWeatherByCity,
  getForecast,
  getWeatherByCoords,
  getForecastByCoords,
} from "./services/weatherService"

function App() {
  const [weather, setWeather]   = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)
  const [dark, setDark]         = useState(
    () => localStorage.getItem("theme") === "dark" ||
    (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
  )

  // Sync dark class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    localStorage.setItem("theme", dark ? "dark" : "light")
  }, [dark])

  const searchCity = useCallback(async (city) => {
    try {
      setLoading(true)
      setError(null)
      const [w, f] = await Promise.all([
        getWeatherByCity(city),
        getForecast(city),
      ])
      setWeather(w)
      setForecast(f)
      localStorage.setItem("city", city)
    } catch {
      setError("City not found. Check the spelling and try again.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem("city")
    if (saved) { searchCity(saved); return }

    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude: lat, longitude: lon } }) => {
        try {
          const [w, f] = await Promise.all([
            getWeatherByCoords(lat, lon),
            getForecastByCoords(lat, lon),
          ])
          setWeather(w)
          setForecast(f)
        } catch {
          setError("Could not fetch weather for your location.")
        } finally {
          setLoading(false)
        }
      },
      () => {
        setLoading(false)
        setError("Location denied. Search for a city above.")
      }
    )
  }, [searchCity])

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ── Navbar ── */}
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 0 20px",
        marginBottom: "8px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "28px" }}>⛅</span>
          <span style={{
            fontWeight: 700,
            fontSize: "20px",
            color: "var(--text-h)",
            letterSpacing: "-0.5px",
          }}>
            WeatherPro
          </span>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <SearchBar onSearch={searchCity} />
          <ThemeToggle dark={dark} onToggle={() => setDark(d => !d)} />
        </div>
      </header>

      <ErrorBox error={error} onClose={() => setError(null)} />
      {loading && <Loader />}

      {weather && (
        <>
          <div className="fade-up fade-up-1">
            <WeatherCard weather={weather} />
          </div>
          <div className="fade-up fade-up-2">
            <StatGrid weather={weather} />
          </div>
          {forecast && (
            <>
              <div className="fade-up fade-up-3">
                <ForecastDays forecast={forecast} />
              </div>
              <div className="fade-up fade-up-4">
                <HourlySlider forecast={forecast} />
              </div>
              <div className="fade-up fade-up-5">
                <TempChart forecast={forecast} dark={dark} />
              </div>
            </>
          )}
          <div className="fade-up fade-up-5">
            <WeatherMap weather={weather} />
          </div>
        </>
      )}

      {!weather && !loading && (
        <div style={{
          textAlign: "center",
          padding: "80px 24px",
          color: "var(--text-muted)",
        }}>
          <div style={{ fontSize: "72px", marginBottom: "16px" }}>🌍</div>
          <p style={{ fontSize: "20px", color: "var(--text-h)", fontWeight: 600, marginBottom: "8px" }}>
            Welcome to WeatherPro
          </p>
          <p style={{ fontSize: "15px" }}>
            Search a city or allow location access to get started.
          </p>
        </div>
      )}
    </div>
  )
}

export default App