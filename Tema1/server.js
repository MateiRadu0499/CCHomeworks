const http = require('http');
const api= require('./controllers/weatherController');

const server = http.createServer((req, res) => {
    if(req.url === '/api/weather' && req.method === 'GET'){
        api.getWeather
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: "Not a valid route"}))
    }

})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log('Server is running on port '+ PORT))