const http = require('http')
const { getProducts , getProduct, createProduct, updateProduct, deleteProduct, putProduct} = require('./controllers/productController')

const server = http.createServer((req, res) => {
    if(req.url === '/api/products' && req.method === 'GET'){

        getProducts(req, res)

    } else if(req.url.split('/').length===4 && req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET'){

        const id = req.url.split('/')[3]
        getProduct(req, res, id)

    } else if(req.url.split('/').length===3 && req.url === '/api/products' && req.method === 'POST'){

        createProduct(req, res)

    } else if(req.url.split('/').length===4 && req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'PUT'){

        const id = req.url.split('/')[3]
        putProduct(req, res, id)

    }else if(req.url.split('/').length===4 && req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'DELETE'){

        const id = req.url.split('/')[3]
        deleteProduct(req, res, id)

    } else if(req.url.split('/').length===4 && req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'PATCH'){

        const id = req.url.split('/')[3]
        updateProduct(req, res, id)

    } else {

        res.writeHead(405, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Method Not Allowed'}))

    }
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log('Server running on port ' + PORT))

