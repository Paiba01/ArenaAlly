import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose'

import { CreateUserHandler } from '../application/commands/handlers/create-user'
import { GetUserHandler } from '../application/queries/handlers/get-user'
import { UsersController } from './controllers/users'
import { UserSchema } from './models/mongoose/schema'
import { userProviders } from './providers'
import { GetUsersHandler } from '../application/queries/handlers/get-users'
import { EditUserHandler } from '../application/commands/handlers/edit-user'
import { GetUserByEmailHandler } from '../application/queries/handlers/get-user-by-email'
import { GetUsersByIsActiveHandler } from '../application/queries/handlers/getUsers-by-isActive'

const controllers = [UsersController]

const commandHandlers = [
  CreateUserHandler,
  EditUserHandler,
]

const queryHandlers = [GetUserHandler, GetUsersHandler, GetUserByEmailHandler, GetUsersByIsActiveHandler]

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
