import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import User from '~/user/domain/models/user'
import Users from '~/user/domain/services/users'
import { UserSchema } from '../models/mongoose/schema'
import UserId from '~/user/domain/models/id'
import { err, ok, Result } from 'neverthrow'
import { NotFoundUser } from '~/user/domain/exceptions/not-found'

export class MongooseUsers implements Users {
  constructor(
    @InjectModel(UserSchema.name)
    private readonly users: Model<UserSchema>,
  ) {}

  async find(id: UserId): Promise<Result<void, NotFoundUser>> {
    const match = await this.users.findById(id.value).exec()

    if (!match) return err(NotFoundUser.withId(id.value))

    return ok(undefined)
  }

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