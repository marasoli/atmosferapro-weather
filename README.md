# Atmosfera Pro
O Atmosfera Pro é uma versão que visa melhorar o **UI/UX Design** do Tempo Exato! (Commit Version 1) e integrar um **servidor back-end** para ocultar informações sensíveis.

### ☀️ Funcionalidades
- Permite ao usuário buscar informações climáticas de diferentes localidades
- Fornece sugestões de capitais de diversos países na tela inicial
- Mostra dados de data, hora e dia da semana atualizados em tempo real
- Exibe dados de condições climáticas e temperatura, nome da cidade e a bandeira do país
- Muda o background conforme a cidade pesquisada

### 🖥️ Tecnologias utilizada
- HTML5, CSS3 e JS
- Node.js e bibliotecas
- API OpenWeatherMap
- API Unsplash

### 🗝️ Configuração do Server
1. Crie uma conta e obtenha uma chave da API
- Weather: https://home.openweathermap.org/api_keys
- Unsplash: https://unsplash.com/developers
2. Na pasta `server/` crie um arquivo chamado `.env` com o conteúdo:
```
API_WEATHER = SUA_API_KEY
API_UNSPLASH = SUA_API_KEY
```
3. Instale as dependências
``` 
npm install
```
4. Inicie o servidor
``` 
npm run server
```

## Screenshots
<div>
  <h3>Home - Error Handling - Result</h3>
  <img width="266" src="./assets/screenshots/home.png" />
  <img width="266" src="./assets/screenshots/error.png" />
  <img width="266" src="./assets/screenshots/result.png" />
</div>

### 🎨 Créditos
Baseado no layout criado por [Dan Tsonkov](https://www.dantsonkov.com/), disponível em [Dribbble](https://dribbble.com/shots/2232422-004-Weather-Widget).