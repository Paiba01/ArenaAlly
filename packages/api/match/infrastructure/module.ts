import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose'
import { MatchsController } from './controllers/matchs'
import { MatchSchema } from './models/mongoose/schema'
import { matchProviders } from './providers'
import { DeleteMatchHandler } from '../application/commands/handlers/delete-match'
import { GetMatchHandler } from '../application/queries/handlers/get-match'
import { GetMatchsHandler } from '../application/queries/handlers/get-matchs'
import { EditMatchDateHandler } from '../application/commands/handlers/edit-match-date'



const controllers = [MatchsController]

const commandHandlers = [
  DeleteMatchHandler,
  EditMatchDateHandler,
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
