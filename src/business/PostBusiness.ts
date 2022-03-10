import PostData from "../data/PostData2";
import Post, { PostInputDTO } from "../model/post";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export default class PostBusiness {
    constructor(
        private postData: PostData,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) { }

    newPost = async (input: PostInputDTO,token:string) => {
        const { photo_url, description, date_creat,type } = input
        
        if (!photo_url || !description || !date_creat || !type) {
            throw new Error("Um ou mais campos não informados 'photo_url, description, date_creat ou type'")
        }
        if (!token) {
            throw new Error("token não enviado")
        }

        const tokenData:any = await new Authenticator().getTokenData(token)

        if (!tokenData) {
            throw new Error("token invalido")
        }
        const user_id:string = tokenData.id
        const id = this.idGenerator.generateId()

        const post = new Post(
            id,
            user_id,
            photo_url,
            description,
            date_creat,
            type
        )
  
        await this.postData.insert(post)

        return 
    }

    getPostById = async (post_id: string,token:string) => {
          
        if (!post_id ) {
            throw new Error("post_id não enviado")
        }
        if (!token) {
            throw new Error("token não enviado")
        }

        const tokenData:any = await new Authenticator().getTokenData(token)

        if (!tokenData) {
            throw new Error("token invalido")
        }
    
        const post = await this.postData.postById(post_id)

        return post
    }

}