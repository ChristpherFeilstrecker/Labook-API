import {Request, Response} from 'express'
import PostBusiness from '../business/PostBusiness'
import { PostInputDTO } from '../model/post'

export default class PostController{
    constructor(
        private postBusiness: PostBusiness
    ){}

    newPost = async (req: Request, res:Response) =>{
        const { photo_url, description, date_creat , type } = req.body
        const token = req.headers.authorization as string

        const input: PostInputDTO = {
            photo_url,
            description,
            date_creat,
            type
        }
        try{
             
             await this.postBusiness.newPost(input,token)

            res.status(200).send({message: "Post criado com sucesso" })
        }catch(error:any){
            if(error.message) return res.status(400).send(error.message)
            res.status(400).send("Erro no signup")
        }
    }

    getPostById = async (req: Request, res:Response) =>{
        const post_id = req.params.id
        const token = req.headers.authorization as string

        try{
             
            const post = await this.postBusiness.getPostById(post_id,token)

            res.status(200).send({ post })
        }catch(error:any){
            if(error.message) return res.status(400).send(error.message)
            res.status(400).send("Erro no signup")
        }
    }
}