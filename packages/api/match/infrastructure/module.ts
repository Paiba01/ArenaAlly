import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose'
import { MatchsController } from './controllers/matchs'
import { CreateMatchHandler } from '../application/commands/handlers/create-match'
import { MatchSchema } from './models/mongoose/schema'
import { matchProviders } from './providers'
import { DeleteMatchHandler } from '../application/commands/handlers/delete-match'


const controllers = [MatchsController]

const commandHandlers = [
  CreateMatchHandler,
  DeleteMatchHandler,
]

@Module({
  controllers,
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: MatchSchema.name,
        schema: SchemaFactory.createForClass(MatchSchema),
      },
    ]),
  ],
  providers: [...commandHandlers, ...matchProviders],
})
export class MatchModule {
  constructor() {}
}
