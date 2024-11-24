import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { err, ok, Result } from 'neverthrow'


import { CompetitionSchema } from '../models/mongoose/schema'
import { CompetitionId } from '~/competition/domain/models/id'
import { CompetitionDto } from '~/competition/dto/response/competition'
import { NotFoundCompetition } from '~/competition/domain/exceptions/not-found'
import CompetitionsFinder from '~/competition/application/services/finder'


@Injectable()
export class MongooseCompetitionsFinder implements CompetitionsFinder {
  constructor(
    @InjectModel(CompetitionSchema.name)
    private readonly competitions: Model<CompetitionSchema>,
  ) {}

  async find(id: CompetitionId): Promise<Result<CompetitionDto, NotFoundCompetition>> {
    const competition = await this.competitions.findById(id.value).exec()

    if (!competition) return err(NotFoundCompetition.withId(id.value))

      const competitionDto: CompetitionDto = {
        ...competition.toObject(),
        dateFrom: competition.dateFrom instanceof Date ? competition.dateFrom.toISOString() : competition.dateFrom,
        dateTo: competition.dateTo instanceof Date ? competition.dateTo.toISOString() : competition.dateTo,
      }
  
    return ok(competitionDto)
  }

  async getAll(): Promise<CompetitionDto[]> {
    const competitions = await this.competitions.find().exec()
    
    // Convertir cada documento a MatchDto
    return competitions.map(competition => ({
      ...competition.toObject(),
      dateFrom: competition.dateFrom instanceof Date ? competition.dateFrom.toISOString() : competition.dateFrom,
      dateTo: competition.dateTo instanceof Date ? competition.dateTo.toISOString() : competition.dateTo,
      
    }))
  }
}


