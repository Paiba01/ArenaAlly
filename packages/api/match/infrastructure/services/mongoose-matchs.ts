import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { MatchSchema } from '../models/mongoose/schema'
import Matchs from '~/match/domain/services/matchs'
import Match from '~/match/domain/models/match'

export class MongooseMatchs implements Matchs {
  constructor(
    @InjectModel(MatchSchema.name)
    private readonly matchs: Model<MatchSchema>,
  ) {}

  async create(match: Match): Promise<void> {
    await this.matchs.create(MatchSchema.fromMatch(match))
  }

}