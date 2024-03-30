import { AggregateRoot } from '@nestjs/cqrs'

import UserId from './id'
import UserName from './name'
import UserEmail from './email'
import UserPassword from './password'


class User extends AggregateRoot {
    private _id:            UserId
    private _name:          UserName
    private _email:         UserEmail
    private _password:      UserPassword
    private _isActive:     boolean

    private constructor(
        id:         UserId,
        name:       UserName,
        email:      UserEmail,
        password:   UserPassword,
        isActive:  boolean,
    ){
        super()
        this._id            = id
        this._name          = name
        this._email         = email
        this._password      = password
        this._isActive     = isActive
    }
    //DUDA SOBRE ISWORKING
    static create({
        id,
        name,
        email,
        password,
    }: {
        id: UserId
        name: UserName
        email: UserEmail
        password: UserPassword

    }) {
        return new this(id, name, email, password, false)
    }

    get id(): UserId {
        return this._id
    }

    get name(): UserName {
        return this._name
    }
    
    get email(): UserEmail {
        return this._email
    }

    get password(): UserPassword {
        return this._password
    }

    get isActive(): boolean {
        return this._isActive
    }
}

export default User
