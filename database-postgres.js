import { randomUUID } from "crypto"
import { sql } from './banco-dados.js'

export class DatabasePostgres{
    #videos = new Map()

    // SET => Array não aceita valores duplicados
    //MAP => semelhante a um objeto, com particularidades, com uma API mais "Legal"

    async list(search) {
        let videos  

        if(search){
            videos = await sql`select * from videos where title ilike ${'%' + search + '%'}`
        } else {
            videos = await sql`select * from videos`
        }

        return videos 
    }

    async create(video){
        const videoId = randomUUID()

        const { title, description, duration } = video

        await sql`insert into videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`
    }

    async update(id, video){
        const { title, description, duration } = video

        await sql `update videos set title = ${title}, description = ${description}, duration = ${duration} where id = ${id}`

        
    }

    async delete(id, video){
        await sql`delete from videos where id = ${id}`
    }
}