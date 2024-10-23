export class GetUsersByIsActive {
  private constructor() {}

  static all(): GetUsersByIsActive {
    return new this()
  }
}
