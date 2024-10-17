type GetUserType = Readonly<{ id: string }>

export class GetUser implements GetUserType {
  private constructor(readonly id: GetUserType['id']) {}

  static with({ id }: GetUserType): GetUser {
    return new this(id)
  }
}