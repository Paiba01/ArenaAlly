import { Prop, Schema } from '@nestjs/mongoose'
import { Competition } from '~/competition/domain/models/competition'


@Schema({ versionKey: false })
export class CompetitionSchema {
  @Prop()
  readonly _id: string

  @Prop()
  readonly name: string

  @Prop()
  readonly category: string

  @Prop()
  readonly dateFrom: Date
  
  @Prop()
  readonly dateTo: Date


  constructor(
    _id: CompetitionSchema['_id'],
    name: CompetitionSchema['name'],
    category: CompetitionSchema['category'],
    dateFrom: CompetitionSchema['dateFrom'],
    dateTo: CompetitionSchema['dateTo'],
  ) {
    this._id = _id
    this.name = name
    this.category = category
    this.dateFrom = dateFrom
    this.dateTo = dateTo
  }

  static fromCompetition({ id, name, category, dateFrom, dateTo }: Competition) {
    return new this(id.value, name.value, category.value, dateFrom, dateTo)
  }
}