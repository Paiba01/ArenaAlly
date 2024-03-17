import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import User from '~/User/domain/models/user'
import Users from '~/User/domain/services/users'
import { UserSchema } from '../models/mongoose/schema'

export class MongooseUsers implements Users {
  constructor(
    @InjectModel(UserSchema.name)
    private readonly users: Model<UserSchema>,
  ) {}

  async create(user: User): Promise<void> {
    await this.users.create(UserSchema.fromUser(user))
  }

}