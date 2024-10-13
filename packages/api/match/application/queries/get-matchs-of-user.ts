type GetMatchsOfUserType = Readonly<{ userId: string }>

export class GetMatchsOfUser implements GetMatchsOfUserType {
  private constructor(readonly userId: GetMatchsOfUserType['userId']) {}

  static with({ userId }: GetMatchsOfUserType): GetMatchsOfUser {
    return new this(userId)
  }
}