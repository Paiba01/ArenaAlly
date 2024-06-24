type CreateScopeType = Readonly<{
  description: string
  id: string
  name: string
}>

class CreateScope implements CreateScopeType {
  private constructor(
    readonly id: CreateScopeType['id'],
    readonly description: CreateScopeType['description'],
    readonly name: CreateScopeType['name'],
  ) {}

  static with({ description, id, name }: CreateScopeType): CreateScope {
    return new this(id, description, name)
  }
}

export default CreateScope
