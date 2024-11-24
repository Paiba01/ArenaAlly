export class GetUsers {
  private constructor() {}

  static all(): GetUsers {
    return new this()
  }
}
