
export default class User{
    
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string
    ){}
}

export type authenticationData = {
    id: string
}

export type SignupInputDTO = {
    name: string
    email: string
    password: string
}
export type LoginInputDTO = {
    email: string
    password: string
}