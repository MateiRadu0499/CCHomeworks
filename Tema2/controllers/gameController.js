const { removeAllListeners } = require('nodemon')
const Product = require('../models/gameModel')
const { getPostData } = require('../utils')

//@desc Gets all games
//@route GET /api/games
async function getGames(req, res){
    try{
        const products = await Product.findAll()

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(products))
    } catch (error){
        console.log(error)
    }
}

//@desc Gets game by id
//@route GET /api/games/id
async function getGame(req, res, id){
    try{
        const product = await Product.findById(id)

        if(!product){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Product not found'}))
        }else{
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(product))
        }
    } catch (error){
        console.log(error)
    }
}

//@desc Create a game
//@route POST /api/games
async function createGame(req, res){
    try{
        const body = await getPostData(req)

        defaultTitle = 'No name game'
        defaultDescription = 'No description game'
        defaultPlatform = 'No platform'
        defaultPrice = '60'

        const { title, description, platform, price} =JSON.parse(body)
        
        if(title){
            defaultTitle = title
        }
        if(description){
            defaultDescription = description
        }
        if(platform){
            defaultPlatform = platform
        }
        if(price){
            defaultPrice = price
        }

        if(Number(defaultPrice)<=0){
            defaultPrice = '60'
        }

        const product = {
            defaultTitle,
            defaultDescription,
            defaultPlatform,
            defaultPrice
        }

        const newProduct = await Product.create(product)

        res.writeHead(201, { 'Content-Type': 'application/json'})
        return res.end(JSON.stringify(newProduct))

    } catch (error){
        console.log(error)
    }
}

//@desc Update a game
//@route PATCH /api/games/id
async function updateGame(req, res, id){
    try{
        const product = await Product.findById(id)

        if(!product){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Product not found'}))
        } else {
            const body = await getPostData(req)

            defaultTitle = 'No name game'
            defaultDescription = 'No description game'
            defaultPlatform = 'No platform'
            defaultPrice = '60'
            const { title, description, platform, price} =JSON.parse(body)  

            if(title){
                defaultTitle = title
            }
            if(description){
                defaultDescription = description
            }
            if(platform){
                defaultPlatform = platform
            }
            if(price){
                defaultPrice = price
            }
                

            const productData = {
                title: defaultTitle || product.title,
                description: defaultDescription || product.description,
                platform: defaultPlatform || product.platform,
                price: defaultPrice || product.price
            }

            const updatedProduct = await Product.update(id, productData)

            res.writeHead(200, { 'Content-Type': 'application/json'})
            return res.end(JSON.stringify(updatedProduct))
        }

    } catch (error){
        console.log(error)
    }
}

//@desc Put a game
//@route PUT /api/games/id
async function putGame(req, res, id){
    try{
        const product = await Product.findById(id)
        const body = await getPostData(req)
        
        if(!product){
            defaultTitle = 'No name game'
            defaultDescription = 'No description game'
            defaultPlatform = 'No platform'
            defaultPrice = '60'

            const { title, description, platform, price} =JSON.parse(body)

            if(title){
                defaultTitle = title
            }
            if(description){
                defaultDescription = description
            }
            if(platform){
                defaultPlatform = platform
            }
            if(price){
                defaultPrice = price
            }

            const productData = {
                id: id,
                title: defaultTitle,
                description: defaultDescription,
                platform: defaultPlatform,
                price: defaultPrice
            }

            const updatedProduct = await Product.put(productData)

            res.writeHead(200, { 'Content-Type': 'application/json'})
            return res.end(JSON.stringify(updatedProduct))
        } else {
            const body = await getPostData(req)

            const { title, description, platform, price} =JSON.parse(body)  

            const productData = {
                title: title || product.title,
                description: description || product.description,
                platform: platform || product.platform,
                price: price || product.price
            }

            const updatedProduct = await Product.update(id, productData)

            res.writeHead(200, { 'Content-Type': 'application/json'})
            return res.end(JSON.stringify(updatedProduct))
        }

    } catch (error){
        console.log(error)
    }
}

//@desc Delete a game by id
//@route DELETE /api/games/id
async function deleteGame(req, res, id){
    try{
        const product = await Product.findById(id)

        if(!product){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Product not found'}))
        }else{
            await Product.remove(id)
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Product '+ id +' removed'}))
        }
    } catch (error){
        console.log(error)
    }
}

module.exports = {
    getGames,
    getGame,
    createGame,
    updateGame,
    deleteGame,
    putGame
}