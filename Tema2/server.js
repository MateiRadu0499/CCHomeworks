const http = require('http')
const { getGames , getGame, createGame, updateGame, deleteGame, putGame} = require('./controllers/gameController')

const server = http.createServer((req, res) => {
    if(req.url === '/api/games' && req.method === 'GET'){

        getGames(req, res)

    } else if(req.url.split('/').length===4 && req.url.match(/\/api\/games\/([0-9]+)/) && req.method === 'GET'){

        const id = req.url.split('/')[3]
        getGame(req, res, id)

    } else if(req.url.split('/').length===3 && req.url === '/api/games' && req.method === 'POST'){

        createGame(req, res)

    } else if(req.url.split('/').length===4 && req.url.match(/\/api\/games\/([0-9]+)/) && req.method === 'PUT'){

        const id = req.url.split('/')[3]
        putGame(req, res, id)

    }else if(req.url.split('/').length===4 && req.url.match(/\/api\/games\/([0-9]+)/) && req.method === 'DELETE'){

        const id = req.url.split('/')[3]
        deleteGame(req, res, id)

    } else if(req.url.split('/').length===4 && req.url.match(/\/api\/games\/([0-9]+)/) && req.method === 'PATCH'){

        const id = req.url.split('/')[3]
        updateGame(req, res, id)

    } else {

        res.writeHead(405, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Method Not Allowed'}))

    }
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log('Server running on port ' + PORT))

