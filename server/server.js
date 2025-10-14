import express from 'express'
import axios from 'axios'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())

const PORT = process.env.PORT || 3000
const API_KEY = process.env.API_WEATHER

if (!API_KEY) {
    console.error('ERROR: Variável API_WEATHER não encontrada no arquivo .env')
    process.exit(1)
}

app.get('/weather', async (req, res) => {
    const city = req.query.city

    if (!city) {
        return res.status(400).json({ error: 'Cidade não informada.' })
    }

    try {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}&lang=pt_br`
        console.log("[INFO] Buscando clima:", city)

        const response = await axios.get(weatherUrl)
        res.json(response.data)

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
