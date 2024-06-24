type EditScopeType = Readonly<{
  description: string
  id: string
  name: string
}>

class EditScope implements EditScopeType {
  private constructor(
    readonly id: EditScopeType['id'],
    readonly description: EditScopeType['description'],
    readonly name: EditScopeType['name'],
  ) {}

  static with({ description, id, name }: EditScopeType): EditScope {
    return new this(id, description, name)
  }
}

export default EditScope
