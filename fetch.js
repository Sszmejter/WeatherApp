const apiKey = 'a43a5571be48dd9339c24beb3b6150ff'
const getCity = async (input) => {
  //base URL + Query
  const baseURL = 'https://api.openweathermap.org/data/2.5/weather'
  const query = `?q=${input}&appid=${apiKey}`
  //Fetch call
  const response = await fetch(baseURL + query)
  //promise data

  const data = await response.json()
  return data
}
