export default class Post{
    constructor(
        private id: string,
        private user_id: string,
        private photo_url: string,
        private description: string,
        private date_creat: string,
        private type: string
    ){}
}

export type PostInputDTO = {
    photo_url: string
    description: string
    date_creat: string
    type:string
}
