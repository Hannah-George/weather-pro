/**
 * Groups the OpenWeatherMap 3-hourly forecast list into daily summaries.
 * Returns up to 5 days: { label, icon, description, tempMax, tempMin }
 */
export function formatForecastDays(forecast) {
  const days = {}

  forecast.list.forEach(item => {
    const date = item.dt_txt.slice(0, 10) // "YYYY-MM-DD"
    if (!days[date]) {
      days[date] = {
        label: new Date(date + "T12:00:00").toLocaleDateString("en-US", {
          weekday: "short", month: "short", day: "numeric",
        }),
        temps:       [],
        icons:       [],
        descriptions: [],
      }
    }
    days[date].temps.push(item.main.temp)
    days[date].icons.push(item.weather[0].icon)
    days[date].descriptions.push(item.weather[0].description)
  })

  return Object.values(days)
    .slice(0, 5)
    .map(d => ({
      label:       d.label,
      tempMax:     Math.max(...d.temps),
      tempMin:     Math.min(...d.temps),
      icon:        d.icons[Math.floor(d.icons.length / 2)],   // midday icon
      description: d.descriptions[Math.floor(d.descriptions.length / 2)],
    }))
}