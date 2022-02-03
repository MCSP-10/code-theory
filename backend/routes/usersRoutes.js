import {Router} from 'express'
import db from '../db/index.js'


const users = new Router()

users.get('/', async (req, res) => {
  try{
    const result = await db('users').select()
    res.json(result)
  }catch(err){ 
      errorHandler(err, res)
  }    
})

users.get('/:id', async (req, res) => {
    try{
        const id = req.params.id
        const result = await db('users').where('id', id)
        res.json(result)

    }catch(err){
        errorHandler(err, res)
    }

})

users.post('/', async (req, res) => {
    try{
        const result = await db('users').insert({
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "email": req.body.email,
            "password": req.body.password
        }).then(() => res.json({message: 'add a user'}))
    }catch(err){
        errorHandler(err, res)
    }
})

users.put('/:id', async (req, res) => { 
    try{
        const id = req.params.id
         await db('users')
        .where({id: id})
        .update(req.body)
        .returning('*')
        .then((data) => res.send(data))

    }catch(err){
        errorHandler(err, res)
    }
})

users.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id
        await db('users')
        .where({id: id})
        .del()
        .then(() => res.json({message: `deleted user a id ${id}`}))

    }catch(err){
        errorHandler(err, res)
    }
})


const errorHandler = (err, res) => {
    res.status(500).send(err)
}


export default users