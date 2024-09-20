import { AggregateRoot } from '@nestjs/cqrs'
import { MatchId } from './id'
import { Team } from './team'
import Referee from './referee'
import { CompetitionId } from '~/competition/domain/models/id'

class Match extends AggregateRoot {
    private constructor(
      private readonly _id: MatchId,
      private readonly _competitionId: CompetitionId,
      private readonly _local: Team,
      private readonly _visitor: Team,
      private readonly _referee1: Referee | null,
      private readonly _referee2: Referee | null,
      private readonly _day: Date
    ) {
      super()
    }
  
    static create({
      id,
      competitionId,
      local,
      visitor,
      day,
      referee1 = null,
      referee2 = null,
    }: {
      id: MatchId
      competitionId: CompetitionId
      local: Team
      visitor: Team
      day: Date
      referee1?: Referee | null
      referee2?: Referee | null
    }): Match {
      return new Match(id, competitionId, local, visitor, referee1, referee2, day)
    }

  get id(): MatchId {
    return this._id
  }

  get competitionId(): CompetitionId {
    return this._competitionId
  }

  get local(): Team {
    return this._local
  }

  get visitor(): Team {
    return this._visitor
  }

  get referee1(): Referee | null {
    return this._referee1
  }

  get referee2(): Referee | null {
    return this._referee2
  }

  get day(): Date {
    return this._day
  }
}

export default Match