type GetScopeType = Readonly<{ id: string }>

class GetScope implements GetScopeType {
  private constructor(readonly id: GetScopeType['id']) {}

  static with({ id }: GetScopeType): GetScope {
    return new this(id)
  }
}

export default GetScope
