import UserData from "../data/UserData2";
import User, { LoginInputDTO, SignupInputDTO } from "../model/user";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export default class UserBusiness {
    constructor(
        private userData: UserData,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) { }


    signup = async (input: SignupInputDTO) => {
        const { name, email, password } = input
        if (!email || !name || !password) {
            throw new Error("Campos inválidos")
        }

        const registeredUser = await this.userData.findByEmail(email)
        if (registeredUser) {
            throw new Error("Email já cadastrado")
        }

        const id = this.idGenerator.generateId()
        const hashedPassword = await this.hashManager.hash(password)
        const user = new User(
            id,
            name,
            email,
            hashedPassword
        )
        await this.userData.insert(user)

        const token = this.authenticator.generateToken({ id })
        return token
    }

    login = async (input: LoginInputDTO) => {
        const { email, password } = input
        if (!email || !password) {
            throw new Error("Campos 'email' ou 'password' não informados")
        }

        const registeredUser = await this.userData.findByEmail(email)

        const hashedPassword = await this.hashManager.hash(password)
        const passwordIsCorrect: boolean = registeredUser && await new HashManager().compare(password, registeredUser.password)

        if (!registeredUser || !passwordIsCorrect) {
            
            throw new Error("email ou senha incorretos")
        }

        const id = registeredUser.id
        const token = this.authenticator.generateToken({ id })
        return token
    }
}