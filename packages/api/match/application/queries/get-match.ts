type GetMatchType = Readonly<{ id: string }>

export class GetMatch implements GetMatchType {
  private constructor(readonly id: GetMatchType['id']) {}

  static with({ id }: GetMatchType): GetMatch {
    return new this(id)
  }
}