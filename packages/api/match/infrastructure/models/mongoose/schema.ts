import { Prop, Schema } from '@nestjs/mongoose'
import Match from '~/match/domain/models/match'
@Schema({ versionKey: false })
export class MatchSchema {
  @Prop()
  readonly _id: string

  @Prop()
  readonly local: string

  @Prop()
  readonly visitor: string

  @Prop()
  readonly day: number

  constructor(
    _id: MatchSchema['_id'],
    local: MatchSchema['local'],
    visitor: MatchSchema['visitor'],
    day: MatchSchema['day'],
  ) {
    this._id = _id
    this.local = local
    this.visitor = visitor
    this.day = day
  }

  static fromMatch({ id, local, visitor, day }: Match) {
    return new this(id.value, local.value, visitor.value, day.value)
  }
}