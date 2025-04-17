const router = require('express').Router()

const recipes = require('../../../data/recipes.json')


router.get('/', async (request, response) =>{
    const getRecipes = recipes.map(({id, title, image, prepTime, difficulty}) =>{
        response.send ({id, title, image, prepTime, difficulty})
    })
})


router.post('/recipe/add', async (request,response) =>{
    const{id, title, image, ingredients, instructions, prepTime,difficulty} = request.body

    const found = recipes.find(r => r.id.toString() === id.toString())
    if (found) response.send({error: {message: `Recipe with id: ${id}, already exists.`}})
    else {
    //add 1 to length of recipes array
    const id = recipes.length + 1  
    recipes.push({id, title, image, ingredients, instructions, prepTime, difficulty})

    }
})

router.get('/recipe/:id', async (request, response) => {
    const {id} =request.params
    const found = recipes.find(r => r.id.toString() === id.toString())
    if (found) response.send (found)
    else response.send({error: {message: `Could not find recipe with id: ${id}`}})

})

module.exports = router