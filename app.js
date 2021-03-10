const searchForm = document.querySelector('.search-location')
const cityValue = document.querySelector('.search-location input')
const cityName = document.querySelector('.city-name p')
const cityTemp = document.querySelector('.card-temp p')
const cityWeather = document.querySelector('.card-bot #weather span')
const cityWeatherIcon = document.querySelector('.card-bot #weather span img')
const cityPressure = document.querySelector('.card-bot #pressure span')
const cityWind = document.querySelector('.card-bot #wind span')
const cityTempMax = document.querySelector('.card-bot #maxTemp span')
const cityTempMin = document.querySelector('.card-bot #minTemp span')
const backCard = document.querySelector('.back-card')
const body = document.querySelector('body')
const h1 = document.querySelector('h1')
//Zamiana temperatury z kalvinów na celsjusze -273.15
//ICON URL http://openweathermap.org/img/wn/{iconId}@2x.png
const celsiusConventer = (event) => {
  var celsius = Math.round(event - 273.15)
  return celsius
}

updateWeather = (city) => {
  console.log(city)
  cityName.textContent = city.name
  cityTemp.textContent = celsiusConventer(city.main.temp) + '°C'
  cityWind.textContent = city.wind.speed + 'km/h'
  cityPressure.textContent = city.main.pressure + 'hPa'
  cityTempMax.textContent = celsiusConventer(city.main.temp_max) + '°C'
  cityTempMin.textContent = celsiusConventer(city.main.temp_min) + '°C'
  //Day and Night if icon include d its day if not is n means night

  if (city.weather[0].icon.includes('d')) {
    backCard.setAttribute('style', 'background-image: url(./img/sun.svg)')
    body.setAttribute('style', 'background-color: antiquewhite')
    h1.setAttribute('style', 'color: rgb(46, 46, 46)')
  } else {
    backCard.setAttribute('style', 'background-image: url(./img/night.svg)')
    body.setAttribute('style', 'background-color: #2E3F7F')
    h1.setAttribute('style', 'color: #D7E1E9')
  }

  //Weather Icon plus description
  cityWeatherIcon.src = `http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`

  switch (city.weather[0].main) {
    case 'Rain':
      cityWeather.textContent = 'Deszcz'
      break

    case 'Drizzle':
      cityWeather.textContent = 'Mżawka'
      break

    case 'Thunderstorm':
      cityWeather.textContent = 'Burza'
      break

    case 'Snow':
      cityWeather.textContent = 'Śnieg'
      break

    case 'Clear':
      cityWeather.textContent = 'Czyste niebo'
      break

    case 'Clouds':
      cityWeather.textContent = 'Chmury'
      break

    default:
      cityWeather.textContent = 'Mgła'
  }
}

//add EVENT listener

searchForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const citySearch = cityValue.value.trim()
  //console.log(citySearch)
  searchForm.reset()

  getCity(citySearch)
    .then((data) => {
      console.log(data)
      updateWeather(data)
    })
    .catch((error) => {
      console.log(error)
    })
})
