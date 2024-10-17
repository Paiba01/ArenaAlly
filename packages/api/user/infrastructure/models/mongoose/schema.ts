import { Prop, Schema } from '@nestjs/mongoose'
import User from '~/user/domain/models/user'

@Schema({ versionKey: false })
export class UserSchema {
  @Prop()
  readonly _id: string

  @Prop()
  readonly name: string

  @Prop()
  readonly email: string

  @Prop()
  readonly password: string

  @Prop()
  readonly isActive: boolean

  @Prop()
  readonly isAdmin: boolean

  constructor(
    _id: UserSchema['_id'],
    name: UserSchema['name'],
    email: UserSchema['email'],
    password: UserSchema['password'],
    isActive: UserSchema['isActive'],
    isAdmin: UserSchema['isAdmin'],
  ) {
    this._id = _id
    this.name = name
    this.email = email
    this.password = password
    this.isActive = isActive
    this.isAdmin = isAdmin
  }

  static fromUser({ id, name, email, password, isActive, isAdmin }: User) {
    return new this(id.value, name.value, email.value, password.value, isActive, isAdmin)
  }
}