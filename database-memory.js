import { randomUUID } from "crypto"

export class DatabaseMemory{
    #videos = new Map()

    // SET => Array não aceita valores duplicados
    //MAP => semelhante a um objeto, com particularidades, com uma API mais "Legal"

    list(search) {
    return Array.from(this.#videos.entries())
    .map((videoArray) => {
        const id = videoArray[0]
        const data = videoArray[1]

        return{
            id,
            ...data,
        }

    })
    .filter(video => {
        if(search){
            return video.title.toLowerCase().includes(search.toLowerCase())
        }

        return true
    })
    
    }

    create(video){
        //UUID => Universal Unique ID  
        const videoId = randomUUID()
        
        this.#videos.set(videoId, video)
    }

    update(id, video){
        this.#videos.set(id, video)
    }

    delete(id, video){
        this.#videos.delete(id, video)
    }
}