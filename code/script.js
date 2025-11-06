// GLOBAL DOM ELEMENTS
const btnSuggestions = document.querySelectorAll('.suggestions button')

const spanTemp = document.querySelector('#temperature span')
const humidity = document.querySelector('#humidity span')
const iconWeather = document.querySelector('#weather img')
const spanWeather = document.querySelector('#weather span')
const wind = document.querySelector('#wind span')

const flagCountry = document.querySelector('#country')
const cityName = document.querySelector('#city span')

const loader = document.querySelector('#loader')
const msgError = document.querySelector('#error-msg')

// INTERFACE ERROR MESSAGES AND HIDDEN INFORMATIONS
const details = document.querySelector('.details')
const logo = document.querySelector('.logo')
const temperature = document.querySelector('#temperature')

const showLoader = () => {
    flagCountry.classList.add('hidden')
    cityName.classList.add('hidden')
    loader.classList.remove('hidden')
}
const hideLoader = () => loader.classList.add('hidden')

const showErrorMessage = () => {
    hideLoader()
    msgError.classList.remove('hidden')

    spanTemp.innerText = '--'
    humidity.innerText = '--'
    spanWeather.innerText = 'Error'
    wind.innerText = '--'
    iconWeather.removeAttribute('src')
    flagCountry.removeAttribute('src')
}

const hideInformations = () => {
    btnSuggestions.forEach(btn => btn.classList.add('hidden'))
    details.classList.remove('hidden')
    logo.classList.add('hidden')
    temperature.classList.remove('hidden')
    flagCountry.classList.remove('hidden')
}

// SEARCH BAR AND EVENT LISTENER
const btnSearch = document.querySelector('#search-btn')
const iptSearch = document.querySelector('#search-ipt');

["mouseenter", "mouseleave"].forEach(e =>
    btnSearch.addEventListener(e, toggleSearchInput)
)

function toggleSearchInput(e) {
    if (e.type === "mouseenter") {
        iptSearch.classList.remove('hidden')
    } else if (e.type === "mouseleave") {
        setTimeout(() => {
            if (document.activeElement !== iptSearch) {
                iptSearch.classList.add('hidden')
            }
        }, 1000)
    }
}

iptSearch.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const search = iptSearch.value.trim()
        if (!search) return
        showWeather(search)
    }
})

btnSuggestions.forEach((btn) => {
    btn.addEventListener('click', () => {
        const city = btn.getAttribute('data-city')
        showWeather(city)
    })
})

// API WEATHER AND UI INTERFACE
async function getWeather(city) {
    try {
        showLoader()

        const res = await fetch(`http://localhost:3000/weather?city=${encodeURIComponent(city)}`)
        if (!res.ok) throw new Error(`Erro na requisição: ${res.status}`)

        const data = await res.json()
        return data
    } catch (error) {
        console.error(error)
        showErrorMessage()
    } finally {
        hideLoader()
    }
}

async function showWeather(city) {
    hideInformations()

    const data = await getWeather(city)
    console.log("Dados da API:", data)

    if (!data || !data.weather || data.weather.cod === "404") {
        showErrorMessage()
        return
    }

    const dw = data.weather
    
    spanTemp.innerText = parseInt(dw.main.temp)
    humidity.innerText = `${dw.main.humidity}%`
    iconWeather.setAttribute('src', `http://openweathermap.org/img/wn/${dw.weather[0].icon}.png`)
    spanWeather.innerText = dw.weather[0].description.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    wind.innerText = `${dw.wind.speed} km/h`

    flagCountry.setAttribute('src', `https://flagsapi.com/xx/flat/64.png`.replace('xx', dw.sys.country))
    cityName.innerText = dw.name

    document.body.style.backgroundImage = `url(${data.image})`;

    msgError.classList.add('hidden')
    flagCountry.classList.remove('hidden')
    cityName.classList.remove('hidden')
}

// CLOCK AND DATE DISPLAY
const clock = document.getElementById('clock')
const currentDate = document.getElementById('date')
const spanDays = document.querySelectorAll('.days span')
const days = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab']

function updateClock() {
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')

    clock.textContent = `${hours}:${minutes}:${seconds}`
}

function updateDate() {
    const now = new Date()
    const options = { day: 'numeric', month: 'long', year: 'numeric' }
    currentDate.textContent = now.toLocaleDateString('pt-br', options)
}

function boldDays() {
    const now = new Date()
    const dayWeek = days[now.getDay()]
    spanDays.forEach(span => {
        span.classList.toggle('active', span.textContent.toLowerCase() === dayWeek)
    })
}

updateClock()
updateDate()
boldDays()

setInterval(updateClock, 1000)
setInterval(() => {
    updateDate()
    boldDays()
}, 60000)
