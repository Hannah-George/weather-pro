const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE    = "https://api.openweathermap.org/data/2.5"

async function safeFetch(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export const getWeatherByCity = city =>
  safeFetch(`${BASE}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)

export const getForecast = city =>
  safeFetch(`${BASE}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)

export const getWeatherByCoords = (lat, lon) =>
  safeFetch(`${BASE}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)

export const getForecastByCoords = (lat, lon) =>
  safeFetch(`${BASE}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)