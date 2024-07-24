type GetCompetitionType = Readonly<{ id: string }>

export class GetCompetition implements GetCompetitionType {
  private constructor(readonly id: GetCompetitionType['id']) {}

  static with({ id }: GetCompetitionType): GetCompetition {
    return new this(id)
  }
}