import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Result, err, ok } from 'neverthrow'

import { UsersFinder } from '~/user/application/services/finder'
import { NotFoundUser } from '~/user/domain/exceptions/not-found'
import UserId from '~/user/domain/models/id'
import { UserDto } from '~/user/dto/response/user'

import { UserSchema } from '../models/mongoose/schema'
import UserEmail from '~/user/domain/models/email'

@Injectable()
export class MongooseUsersFinder implements UsersFinder {
  constructor(
    @InjectModel(UserSchema.name)
    private readonly users: Model<UserSchema>,
  ) {}

  async find(id: UserId): Promise<Result<UserDto, NotFoundUser>> {
    const user = await this.users.findById(id.value).exec()

    if (!user) return err(NotFoundUser.withId(id.value))

    return ok(user)
  }

  async getAll(): Promise<UserDto[]> {
    return await this.users.find().exec()
  }

  async findByEmail(email: UserEmail): Promise<Result<UserDto, NotFoundUser>> {
    const user = await this.users.findOne({ email: email.value }).exec()

    if (!user) return err(NotFoundUser.withEmail(email.value))

    return ok(user)
  }

  async findByIsActive(): Promise<UserDto[]> {
    return await this.users.find({ isActive: true }).exec()
  }
}
