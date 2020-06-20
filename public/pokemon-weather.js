const pokeBaseUrl = "https://pokeapi.co/api/v2/pokemon/"
const weatherBaseURL = "https://api.openweathermap.org/data/2.5/weather?zip="
const weatherKey = "&appid=78dd927150ebf2ee27f26dc466f275d7"

const form = document.querySelector('form')
const submitBtn = document.getElementById('submit')

const zipCode = document.getElementById('zipcode')
let weatherUrl

form.addEventListener('submit', fetchWeather)

function fetchWeather(e) {
    e.preventDefault()

    weatherUrl = weatherBaseURL + zipCode.value + "&units=imperial" + weatherKey
    console.log(weatherUrl)

    fetch(weatherUrl)
        .then(function (data) {
            return data.json()
        })
        .then(function (json1) {
            console.log(json1)
            displayWeather(json1)
        })
}

const codeOptions = {
    200: ["thunderstorm with light rain", "11d"],
    201: ["thunderstorm with rain", "11d"],
    202: ["thunderstorm with heavy rain", "11d"],
    210: ["light thunderstorm", "11d"],
    211: ["thunderstorm", "11d"],
    212: ["heavy thunderstorm", "11d"],
    221: ["ragged thunderstorm", "11d"],
    230: ["thunderstorm with light drizzle", "11d"],
    231: ["thunderstorm with drizzle", "11d"],
    232: ["thunderstorm with heavy drizzle", "11d"],
    300: ["light intensity drizzle", "09d"],
    301: ["drizzle", "09d"],
    302: ["heavy intensity drizzle", "09d"],
    310: ["light intensity drizzle rain", "09d"],
    311: ["drizzle rain", "09d"],
    312: ["heavy intensity drizzle rain", "09d"],
    313: ["shower rain and drizzle", "09d"],
    314: ["heavy shower rain and drizzle", "09d"],
    321: ["shower drizzle", "09d"],
    500: ["light rain", "10d"],
    501: ["moderate rain", "10d"],
    502: ["heavy intensity rain", "10d"],
    503: ["very heavy rain", "10d"],
    504: ["extreme rain", "10d"],
    511: ["freezing rain", "13d"],
    520: ["light intensity shower rain", "09d"],
    521: ["shower rain", "09d"],
    522: ["heavy intensity shower rain", "09d"],
    531: ["ragged shower rain", "09d"],
    600: ["light snow", "13d"],
    601: ["Snow", "13d"],
    602: ["Heavy snow", "13d"],
    611: ["Sleet", "13d"],
    612: ["Light shower sleet", "13d"],
    613: ["Shower sleet", "13d"],
    615: ["Light rain and snow", "13d"],
    616: ["Rain and snow", "13d"],
    620: ["Light shower snow", "13d"],
    621: ["Shower snow", "13d"],
    622: ["Heavy shower snow", "13d"],
    701: ["mist", "50d"],
    711: ["Smoke", "50d"],
    721: ["Haze", "50d"],
    731: ["sand/ dust whirls", "50d"],
    741: ["fog", "50d"],
    751: ["sand", "50d"],
    761: ["dust", "50d"],
    762: ["volcanic ash", "50d"],
    771: ["squalls", "50d"],
    781: ["tornado", "50d"],
    800: ["clear sky", "01d"],
    801: ["few clouds", "02d"],
    802: ["scattered clouds", "03d"],
    803: ["broken clouds", "04d"],
    804: ["overcast clouds", "04d"]
}

console.log(codeOptions)

function displayWeather(json1) {
    let currentTemp = Math.round(json1.main.temp)
    console.log(currentTemp)
    let currentCode = json1.weather[0].id
    console.log(currentCode)
    let currentLocation = json1.name
    console.log(currentLocation)

    for (code in codeOptions) {
        if (currentCode == code) {
            console.log(codeOptions[code][0])
            break
        }
    }

}



const pokeSelect = document.getElementById('pokemon')
let pokeSelectUrl

form.addEventListener('submit', fetchPokemon)

function fetchPokemon(e) {
    e.preventDefault()

    let pokeSelectUrl = pokeBaseUrl + pokeSelect.value
    console.log(pokeSelectUrl)

    fetch(pokeSelectUrl)
        .then(function (response) {
            // console.log(response)
            return response.json()
        })
        .then(function (json) {
            console.log(json)
        })
}


