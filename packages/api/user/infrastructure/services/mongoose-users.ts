import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import User from '~/user/domain/models/user'
import Users from '~/user/domain/services/users'
import { UserSchema } from '../models/mongoose/schema'

export class MongooseUsers implements Users {
  constructor(
    @InjectModel(UserSchema.name)
    private readonly users: Model<UserSchema>,
  ) {}

  async create(user: User): Promise<void> {
    await this.users.create(UserSchema.fromUser(user))
  }

  async edit(user: User): Promise<void> {
    await this.users
      .updateOne(
        { _id: user.id.value },
        { name: user.name.value, email: user.email.value, password: user.password.value, isActive: user.isActive },
      )
      .lean()
      .exec()
  }

}