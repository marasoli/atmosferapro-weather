const iptSearch = document.getElementById('search')
const getWeather = document.getElementById('getWeather')
const resWeather = document.getElementById('weatherResult')

getWeather.addEventListener('click', fetchWeather)
iptSearch.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        fetchWeather()
    }
})

function fetchWeather() {
    const city = iptSearch.value
    const apiKey = "sua_chave_api"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt&units=metric`

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Cidade não encontrada')
            }
            return response.json()
        })
        .then(data => {
            const weatherDescription = data.weather[0].description
            const temperature = data.main.temp
            const icon = data.weather[0].icon
            resWeather.innerHTML = `
                <h1>Previsão para ${data.name} Hoje!</h1>
                <p><strong>Temperatura:</strong> ${temperature}°C</p>
                <p><strong>Condições:</strong> ${weatherDescription}</p>
                <img id='icon' src="http://openweathermap.org/img/wn/${icon}.png" alt="Icone do tempo">
            `
        })
        .catch(error => {
            resWeather.innerHTML = `<h1>${error.message}</h1>`
        })
}
