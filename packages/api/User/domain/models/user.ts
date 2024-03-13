import { AggregateRoot } from '@nestjs/cqrs'

import UserId from './id'
import UserName from './name'
import UserEmail from './email'
import UserPassword from './password'
import UserIsWorking from './isWorking'


class User extends AggregateRoot {
    private _id:            UserId
    private _name:          UserName
    private _email:         UserEmail
    private _password:      UserPassword
    private _isWorking:     UserIsWorking

    private constructor(
        id:         UserId,
        name:       UserName,
        email:      UserEmail,
        password:   UserPassword,
        isWorking:  UserIsWorking,
    ){
        super()
        this._id            = id
        this._name          = name
        this._email         = email
        this._password      = password
        this._isWorking     = isWorking
    }
    //DUDA SOBRE ISWORKING
    static create({
        id,
        name,
        email,
        password,
        isWorking,
    }: {
        id: UserId
        name: UserName
        email: UserEmail
        password: UserPassword
        isWorking: UserIsWorking

    }) {
        return new this(id, name, email, password, isWorking)
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

    get isWorking(): UserIsWorking {
        return this._isWorking
    }
}

export default User
