// OPEN WEATHER API PULL
const weatherBaseURL = "https://api.openweathermap.org/data/2.5/weather?zip="
const weatherKey = "&appid=78dd927150ebf2ee27f26dc466f275d7"

const form = document.querySelector('form')
const submitBtn = document.getElementById('submit')

const zipCode = document.getElementById('zipcode') //Is const responsible for input not clearing after submit? 
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

// OBJECT WITH POSSIBLE WEATHER CODE VALUES, EDITED TO MAKE GRAMMATICAL SENSE WITH DISPLAY TEXT.
const codeOptions = {
    200: "thunderstorms with light rain",
    201: "thunderstorms with rain",
    202: "thunderstorms with heavy rain",
    210: "light thunderstorms",
    211: "thunderstorms",
    212: "heavy thunderstorms",
    221: "ragged thunderstorms",
    230: "thunderstorms with light drizzle",
    231: "thunderstorms with drizzle",
    232: "thunderstorms with heavy drizzle",
    300: "light drizzle",
    301: "some drizzle",
    302: "heavy drizzle",
    310: "a light drizzling rain",
    311: "drizzling rain",
    312: "a heavy drizzling rain",
    313: "some showers and drizzle",
    314: "heavy showers and drizzle",
    321: "a showering drizzle",
    500: "some light rain",
    501: "moderate rain",
    502: "heavy rain",
    503: "very heavy rain",
    504: "extreme rain",
    511: "freezing rain",
    520: "light showers",
    521: "some showers",
    522: "heavy showers",
    531: "ragged showers",
    600: "light snow",
    601: "Snow",
    602: "Heavy snow",
    611: "Sleet",
    612: "Light sleet",
    613: "Showering sleet",
    615: "Light rain and snow mix",
    616: "Rain and snow mix",
    620: "light snow showers",
    621: "snow showers",
    622: "Heavy snow showers",
    701: "mist",
    711: "Smoke",
    721: "Haze",
    731: "sand/ dust whirls",
    741: "fog",
    751: "sand",
    761: "dust",
    762: "volcanic ash",
    771: "squalls",
    781: "tornadoes",
    800: "a clear sky",
    801: "a few clouds",
    802: "scattered clouds",
    803: "broken clouds",
    804: "overcast clouds"
}

// console.log(codeOptions)

function displayWeather(json1) {
    let currentTemp = Math.round(json1.main.temp)
    console.log(currentTemp)
    let currentCode = json1.weather[0].id
    console.log(currentCode)
    let currentLocation = json1.name
    console.log(currentLocation)
    let codeDescr

    for (code in codeOptions) {
        if (currentCode == code) {
            // Used the following when values within object were arrays
            // console.log(codeOptions[code][0])
            // codeDescr = (codeOptions[code][0])
            console.log(codeOptions[code])
            codeDescr = codeOptions[code]
            break
        }
    }

    const pokemonOpt = document.getElementById('pokemon').value

    let sentence = `Hello! I am your meteorologist, ${pokemonOpt}!  Right now in ${currentLocation} it is ${currentTemp} degrees, with ${codeDescr}.` //How can I capitalize Pokemon name here and in stats?  

    let para = document.getElementById('report')
    para.innerText = sentence

    let icon = document.getElementById("icon")
    if (currentCode <= 531) {
        icon.src = "https://cdn.bulbagarden.net/upload/8/89/351Castform-Rainy.png"
    } else if (currentCode >= 600 && currentCode <= 622) {
        icon.src = "https://cdn.bulbagarden.net/upload/f/f9/351Castform-Snowy.png"
    } else if (currentCode == 800 || currentCode == 801) {
        icon.src = "https://cdn.bulbagarden.net/upload/b/b6/351Castform-Sunny.png"
    } else {
        icon.src = "https://cdn.bulbagarden.net/upload/archive/f/f3/20101026001319%21351Castform.png"
    }

    let bubbleImg = document.getElementById('bubble')
    bubbleImg.src = "http://res.freestockphotos.biz/pictures/15/15679-illustration-of-a-cartoon-speech-bubble-pv.png"
}

// POKEAPI PULL & POKEMON IMAGES
const pokeSelect = document.getElementById('pokemon')

form.addEventListener('submit', displayPokemon)

let pokemonPics = {
    pikachu: "https://cdn.bulbagarden.net/upload/b/b8/025Pikachu_LG.png",
    bulbasaur: "https://cdn.bulbagarden.net/upload/2/21/001Bulbasaur.png",
    charmander: "https://cdn.bulbagarden.net/upload/7/73/004Charmander.png",
    squirtle: "https://cdn.bulbagarden.net/upload/3/39/007Squirtle.png",
    psyduck: "https://cdn.bulbagarden.net/upload/5/53/054Psyduck.png"
}

const pokePic = document.getElementById('pokemon-pic')

function displayPokemon() {
    if (pokeSelect.value == "bulbasaur") {
        pokePic.src = pokemonPics.bulbasaur
    } else if (pokeSelect.value == "charmander") {
        pokePic.src = pokemonPics.charmander
    } else if (pokeSelect.value == "squirtle") {
        pokePic.src = pokemonPics.squirtle
    } else if (pokeSelect.value == "psyduck") {
        pokePic.src = pokemonPics.psyduck
    } else {
        pokePic.src = pokemonPics.pikachu
    }
}

const pokeBaseUrl = "https://pokeapi.co/api/v2/pokemon/"
let pokeSelectUrl

form.addEventListener('submit', fetchStats)

function fetchStats(e) {
    e.preventDefault() //What is this doing? 

    let pokeSelectUrl = pokeBaseUrl + pokeSelect.value
    console.log(pokeSelectUrl)

    fetch(pokeSelectUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (json) {
            console.log(json)
            displayStats(json)
        })
}

function displayStats(json) {
    let nameData = document.getElementById('name')
    nameData.innerText = json.name

    let idData = document.getElementById('id-num')
    idData.innerText = json.id

    let typeData = document.getElementById('type')
    let typesArray = json.types
    // console.log(typesArray[0].type.name)

    while (typeData.firstChild) {
        typeData.removeChild(typeData.firstChild)
    }

    for (opt in typesArray) {
        let typeOpt = document.createElement('p')
        typeOpt.innerText = typesArray[opt].type.name
        typeData.appendChild(typeOpt)
    } //Need solution for clearing options with subsequent submits

    let hpData = document.getElementById('hp')
    hpData.innerText = json.stats[0].base_stat

    let attData = document.getElementById('attack')
    attData.innerText = json.stats[1].base_stat

    let defData = document.getElementById('defense')
    defData.innerText = json.stats[2].base_stat

    let spAttData = document.getElementById('special-attack')
    spAttData.innerText = json.stats[3].base_stat

    let spDefData = document.getElementById('special-defense')
    spDefData.innerText = json.stats[4].base_stat

    let speedData = document.getElementById('speed')
    speedData.innerText = json.stats[5].base_stat
}
