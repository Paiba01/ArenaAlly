type GetMatchsByCompetitionType = Readonly<{ competitionId: string }>

export class GetMatchsByCompetition implements GetMatchsByCompetitionType {
  private constructor(readonly competitionId: GetMatchsByCompetitionType['competitionId']) {}

  static with({ competitionId }: GetMatchsByCompetitionType): GetMatchsByCompetition {
    return new this(competitionId)
  }
}