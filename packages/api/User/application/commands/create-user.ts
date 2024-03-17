type CreateUserType = {
    id: string
    name: string
    email: string
    password: string
}

export class CreateUser implements CreateUserType {
    constructor(
        readonly id: CreateUserType['id'],
        readonly name: CreateUserType['name'],
        readonly email: CreateUserType['email'],
        readonly password: CreateUserType['password'],
    ) {}

    static with({  id, name, email, password }: CreateUserType): CreateUser {
        return new this(id, name, email, password)
    }
}

