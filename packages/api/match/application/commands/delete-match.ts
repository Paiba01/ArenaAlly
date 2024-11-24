type DeleteMatchType = Readonly<{ id: string }>

export class DeleteMatch implements DeleteMatchType {
  private constructor(readonly id: DeleteMatchType['id']) {}

  static with({ id }: DeleteMatchType): DeleteMatch {
    return new this(id)
  }
}
