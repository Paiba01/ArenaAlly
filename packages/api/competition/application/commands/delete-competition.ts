type DeleteCompetitionType = Readonly<{ id: string }>

export class DeleteCompetition implements DeleteCompetitionType {
  private constructor(readonly id: DeleteCompetitionType['id']) {}

  static with({ id }: DeleteCompetitionType): DeleteCompetition {
    return new this(id)
  }
}