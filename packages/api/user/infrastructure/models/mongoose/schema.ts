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

  constructor(
    _id: UserSchema['_id'],
    name: UserSchema['name'],
    email: UserSchema['email'],
    password: UserSchema['password'],
  ) {
    this._id = _id
    this.name = name
    this.email = email
    this.password = password
  }

  static fromUser({ id, name, email, password }: User) {
    return new this(id.value, name.value, email.value, password.value)
  }
}