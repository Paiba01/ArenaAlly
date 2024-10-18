import { AggregateRoot } from '@nestjs/cqrs'

import UserId from './id'
import UserName from './name'
import UserEmail from './email'
import UserPassword from './password'

class User extends AggregateRoot {
  private _id: UserId
  private _name: UserName
  private _email: UserEmail
  private _password: UserPassword
  private _isActive: boolean
  private _isAdmin: boolean


  private constructor(
    id: UserId,
    name: UserName,
    email: UserEmail,
    password: UserPassword,
    isActive: boolean,
    isAdmin: boolean,
  ) {
    super()
    this._id = id
    this._name = name
    this._email = email
    this._password = password
    this._isActive = isActive
    this._isAdmin = isAdmin
  }

  static create({
    id,
    name,
    email,
    password,
    isActive,
    isAdmin,
  }: {
    id: UserId
    name: UserName
    email: UserEmail
    password: UserPassword
    isActive: boolean
    isAdmin: boolean
  }) {
    return new this(id, name, email, password, isActive, isAdmin)
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

  get isAdmin(): boolean {
    return this._isAdmin
  }
}

export default User
