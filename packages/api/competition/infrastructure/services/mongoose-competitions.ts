import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CompetitionSchema } from '../models/mongoose/schema'
import Competitions from '~/competition/domain/services/competitions'

import { CompetitionId } from '~/competition/domain/models/id'
import { Competition } from '~/competition/domain/models/competition'

export class MongooseCompetitions implements Competitions {
  constructor(
    @InjectModel(CompetitionSchema.name)
    private readonly competitions: Model<CompetitionSchema>,
  ) {}

  async create(competition: Competition): Promise<void> {
    await this.competitions.create(CompetitionSchema.fromCompetition(competition))
  }

  async delete(id: CompetitionId): Promise<void> {
    await this.competitions.deleteOne({ _id: id.value }).lean().exec()
  }

  async edit(competition: Competition): Promise<void> {
    await this.competitions
      .updateOne(
        { _id: competition.id.value },
        { name: competition.name.value, email: competition.category.value, dateFrom: competition.dateFrom, dateTo: competition.dateTo },
      )
      .lean()
      .exec()
  }

}