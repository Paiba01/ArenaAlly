import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose'
import { MatchsController } from './controllers/matchs'
import { CreateMatchHandler } from '../application/commands/handlers/create-match'
import { MatchSchema } from './models/mongoose/schema'
import { matchProviders } from './providers'



const controllers = [MatchsController]

const commandHandlers = [
  CreateMatchHandler,
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
