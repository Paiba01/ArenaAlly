import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { err, ok, Result } from 'neverthrow'
import MatchsFinder from '~/match/application/services/finder'

import { MatchSchema } from '../models/mongoose/schema'
import { MatchId } from '~/match/domain/models/id'
import { MatchDto } from '~/match/dto/response/match'
import { NotFoundMatch } from '~/match/domain/exceptions/not-found'


@Injectable()
export class MongooseMatchsFinder implements MatchsFinder {
  constructor(
    @InjectModel(MatchSchema.name)
    private readonly matchs: Model<MatchSchema>,
  ) {}

  async find(id: MatchId): Promise<Result<MatchDto, NotFoundMatch>> {
    const match = await this.matchs.findById(id.value).exec()

    if (!match) return err(NotFoundMatch.withId(id.value))

      const matchDto: MatchDto = {
        ...match.toObject(),
        day: match.day instanceof Date ? match.day.toISOString() : match.day,
      }
  
    return ok(matchDto)
  }

  async getAll(): Promise<MatchDto[]> {
    const matches = await this.matchs.find().exec()
    
    // Convertir cada documento a MatchDto
    return matches.map(match => ({
      ...match.toObject(),
      day: match.day instanceof Date ? match.day.toISOString() : match.day,
      
    }))
  }
}

