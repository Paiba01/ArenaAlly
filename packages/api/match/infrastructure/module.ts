import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose'
import { MatchsController } from './controllers/matchs'
import { CreateMatchHandler } from '../application/commands/handlers/create-match'
import { MatchSchema } from './models/mongoose/schema'
import { matchProviders } from './providers'
import { DeleteMatchHandler } from '../application/commands/handlers/delete-match'
import { GetMatchHandler } from '../application/queries/handlers/get-match'
import { GetMatchsHandler } from '../application/queries/handlers/get-matchs'


const controllers = [MatchsController]

const commandHandlers = [
  CreateMatchHandler,
  DeleteMatchHandler,
]

const queryHandlers = [GetMatchHandler, GetMatchsHandler]

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
  providers: [...commandHandlers, ...queryHandlers, ...matchProviders],
})
export class MatchModule {
  constructor() {}
}
