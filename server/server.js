import express from 'express'
import axios from 'axios'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())

const PORT = process.env.PORT || 3000
const API_WEATHER = process.env.API_WEATHER
const API_UNSPLASH = process.env.API_UNSPLASH

if (!API_WEATHER || !API_UNSPLASH) {
    console.error('[ERROR] Variável não encontrada no arquivo .env')
    process.exit(1)
}

app.get('/weather', async (req, res) => {
    const city = req.query.city

    if (!city) {
        return res.status(400).json({ error: 'Cidade não informada.' })
    }

    try {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_WEATHER}&lang=pt_br`
        const unsplashUrl = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(city)}&client_id=${API_UNSPLASH}&orientation=landscape`

        console.log("[INFO] Buscando clima:", city)

        const [weatherRes, unsplashRes] = await Promise.all([
            axios.get(weatherUrl),
            axios.get(unsplashUrl)
        ])

        res.json({
            weather: weatherRes.data,
            image: unsplashRes.data.urls.regular
        })

    } catch (error) {
        console.error("[ERROR] Requisição falhou:", error)

        if (error.response) {
            console.error("Status:", error.response.status)
            console.error("Dados:", error.response.data)
            return res.status(error.response.status).json({
                error: error.response.data.message || "Erro na API externa",
            })
        } else if (error.request) {
            console.error("Nenhuma resposta recebida")
            return res.status(500).json({ error: "Falha de rede ao acessar a API" })
        } else {
            console.error("Erro ao configurar a requisição:", error.message)
            return res.status(500).json({ error: "Erro interno no servidor" })
        }
    }
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`)
})
