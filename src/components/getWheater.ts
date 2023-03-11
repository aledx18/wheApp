export default async function getClima(coords: {
  latitude: number
  longitude: number
}) {
  const lat = coords?.latitude
  const lng = coords?.longitude

  const key = import.meta.env.VITE_API_KEY

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${lat},${lng}&lang=es&days=1&aqi=no&alerts=no`
    )

    const data = await response.json()

    if (!data) {
      console.error('error api')
      return
    }
    return {
      region: data.location.name,
      country: data.location.country,
      temp: Math.round(data.current.temp_c),
      day: data.current.is_day,
      condition: data.current.condition.text,
      icon: data.current.condition.code,
      wind: data.current.wind_kph,
      pressure: data.current.pressure_mb,
      humidity: data.current.humidity,
      maxPredictDay: Math.round(data.forecast.forecastday[0].day.maxtemp_c),
      minPredictDay: Math.round(data.forecast.forecastday[0].day.mintemp_c),
      hoursOne: data.forecast.forecastday[0].hour
        .slice(0, 7)
        .filter((elemento: { time: string }) => {
          const hora = parseInt(elemento.time.slice(11, 13))
          return hora % 2 === 0
        }),
      hoursTwo: data.forecast.forecastday[0].hour
        .slice(7, 15)
        .filter((elemento: { time: string }) => {
          const hora = parseInt(elemento.time.slice(11, 13))
          return hora % 2 === 0
        }),
      hoursThree: data.forecast.forecastday[0].hour
        .slice(15, 24)
        .filter((elemento: { time: string }) => {
          const hora = parseInt(elemento.time.slice(11, 13))
          return hora % 2 === 0
        })
    }
  } catch (e) {
    console.error(e)
    return
  }
}
