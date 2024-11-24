import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { MatchSchema } from '../models/mongoose/schema'
import Matchs from '~/match/domain/services/matchs'
import Match from '~/match/domain/models/match'
import { MatchId } from '~/match/domain/models/id'
import { err, ok, Result } from 'neverthrow'
import { NotFoundMatch } from '~/match/domain/exceptions/not-found'
import Referee from '~/match/domain/models/referee'
import UserId from '~/user/domain/models/id'

export class MongooseMatchs implements Matchs {
  constructor(
    @InjectModel(MatchSchema.name)
    private readonly matchs: Model<MatchSchema>,
  ) {}

  async find(id: MatchId): Promise<Result<void, NotFoundMatch>> {
    const match = await this.matchs.findById(id.value).exec()

    if (!match) return err(NotFoundMatch.withId(id.value))

    return ok(undefined)
  }

  async create(match: Match): Promise<void> {
    await this.matchs.create(MatchSchema.fromMatch(match))
  }

  async delete(id: MatchId): Promise<void> {
    await this.matchs.deleteOne({ _id: id.value }).lean().exec()
  }

  async editDate(matchId: MatchId, matchDay: Date): Promise<void> {
    await this.matchs
      .updateOne({ _id: matchId.value }, { day: matchDay })
      .lean()
      .exec()
  }

  async designateReferees(matchId: MatchId, refereeId1: UserId, refereeId2:UserId): Promise<void> {
    await this.matchs
      .updateOne({ _id: matchId.value }, { referee1: refereeId1.value, referee2: refereeId2.value })
      .lean()
      .exec()
  }
}
