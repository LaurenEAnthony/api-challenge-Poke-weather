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

    weatherUrl = weatherBaseURL + zipCode.value + weatherKey
    console.log(weatherUrl)

    fetch(weatherUrl)
        .then(function (data) {
            return data.json()
        })
        .then(function (json1) {
            console.log(json1)
        })
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


