import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose'

import { CreateUserHandler } from '../application/commands/handlers/create-user'
import { UsersController } from './controllers/users'
import { UserSchema } from './models/mongoose/schema'
import { userProviders } from './providers'

const controllers = [UsersController]

const commandHandlers = [
  CreateUserHandler,
]

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
  providers: [...commandHandlers, ...userProviders],
})
export class UserModule {
  constructor() {}
}
