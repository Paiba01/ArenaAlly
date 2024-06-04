import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose'

import { CreateUserHandler } from '../application/commands/handlers/create-user'
import { GetUserHandler } from '../application/queries/handlers/get-user'
import { UsersController } from './controllers/users'
import { UserSchema } from './models/mongoose/schema'
import { userProviders } from './providers'
import { GetUsersHandler } from '../application/queries/handlers/get-users'

const controllers = [UsersController]

const commandHandlers = [
  CreateUserHandler,
]

const queryHandlers = [GetUserHandler, GetUsersHandler]

@Module({
  controllers,
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: UserSchema.name,
        schema: SchemaFactory.createForClass(UserSchema),
      },
    ]),
  ],
  providers: [...commandHandlers, ...queryHandlers, ...userProviders],
})
export class UserModule {
  constructor() {}
}
