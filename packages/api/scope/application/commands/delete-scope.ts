type DeleteScopeType = Readonly<{ id: string }>

class DeleteScope implements DeleteScopeType {
  private constructor(readonly id: DeleteScopeType['id']) {}

  static with({ id }: DeleteScopeType): DeleteScope {
    return new this(id)
  }
}

export default DeleteScope
