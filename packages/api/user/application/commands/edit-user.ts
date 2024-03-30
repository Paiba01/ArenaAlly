type EditUserType = Readonly<{
    id: string
    name: string
    email: string
    password: string
    isActive: boolean
}>
export class EditUser implements EditUserType {
    private constructor(
        readonly id: EditUserType['id'],
        readonly name: EditUserType['name'],
        readonly email: EditUserType['email'],
        readonly password: EditUserType['password'],
        readonly isActive: EditUserType['isActive'],
    ) {}

    static with({ id, name, email, password, isActive }: EditUserType): EditUser {
        return new this(id, name, email, password, isActive)
    }
}