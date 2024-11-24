import { Prop, Schema } from '@nestjs/mongoose'
import Match from '~/match/domain/models/match'
@Schema({ versionKey: false })
export class MatchSchema {
  @Prop()
  readonly _id: string

  @Prop()
  readonly competitionId: string

  @Prop()
  readonly local: string

  @Prop()
  readonly visitor: string

  @Prop()
  readonly referee1?: string

  @Prop()
  readonly referee2?: string

  @Prop()
  readonly day: Date

  constructor(
    _id: MatchSchema['_id'],
    competitionId: MatchSchema['competitionId'],
    local: MatchSchema['local'],
    visitor: MatchSchema['visitor'],
    referee1: MatchSchema['referee1'],
    referee2: MatchSchema['referee2'],
    day: MatchSchema['day'],
  ) {
    this._id = _id
    this.competitionId = competitionId
    this.local = local
    this.visitor = visitor
    this.referee1 = referee1
    this.referee2 = referee2
    this.day = day
  }

  static fromMatch({ id, competitionId, local, visitor, referee1, referee2, day }: Match) {
    return new this(
      id.value,
      competitionId.value,
      local.value,
      visitor.value,
      referee1?.value,
      referee2?.value,
      day,
    )
  }
}
