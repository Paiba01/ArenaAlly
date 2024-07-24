import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose'
import { competitionProviders } from './providers'
import { CompetitionsController } from './controllers/competitions'
import { CreateCompetitionHandler } from '../application/commands/handlers/create-competition'
import { CompetitionSchema } from './models/mongoose/schema'
import { MatchSchema } from '~/match/infrastructure/models/mongoose/schema'
import { GetCompetitionHandler } from '../application/queries/handlers/get-competition'
import { GetCompetitionsHandler } from '../application/queries/handlers/get-competitions'


const controllers = [CompetitionsController]

const commandHandlers = [
  CreateCompetitionHandler,

]

const queryHandlers = [GetCompetitionHandler, GetCompetitionsHandler]

@Module({
  controllers,
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: CompetitionSchema.name,
        schema: SchemaFactory.createForClass(CompetitionSchema),
      },
      {
        name: MatchSchema.name,
        schema: SchemaFactory.createForClass(MatchSchema),
      },
    ]),
    
  ],
  providers: [...commandHandlers, ...queryHandlers, ...competitionProviders],
})

export class CompetitionModule {
  constructor() {}
}
