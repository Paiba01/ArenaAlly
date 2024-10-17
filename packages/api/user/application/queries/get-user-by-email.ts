type GetUserByEmailType = Readonly<{ email: string }>

export class GetUserByEmail implements GetUserByEmailType {
  private constructor(readonly email: GetUserByEmailType['email']) {}

  static with({ email }: GetUserByEmailType): GetUserByEmail {
    return new this(email)
  }
}