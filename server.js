/* import { createServer } from 'node:http'

//RESQUESTE: Obter dados da requisição que o usuario está fazendo para o servidor (EX: Nome, email, senha)
//RESPONSE:  Objeto utlizado para devolver a resposta pra quem chama a API
const server = createServer((request, response) => {
    response.write('Hello word')
    
    return response.end()
})

//Definição da porta
server.listen(3333) */

import { fastify } from 'fastify'
//import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

//const database = new DatabaseMemory()
const database = new DatabasePostgres()
//Request body 

server.post('/videos', async(request, reply) => {
    const {title, description, duration} = request.body

    await database.create({
        title,
        description,
        duration
    })

    return reply.status(201).send()
})

server.get('/videos', async(request) => {
    const search = request.query.search

    const videos = await database.list(search)    

    return videos
})

server.put('/videos/:id', async (request, reply) => {
    const {title, description, duration} = request.body

    const videoId = request.params.id

   await database.update(videoId, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})
server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})