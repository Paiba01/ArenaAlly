import { Exception } from "~/shared/domain";

export class NotFoundUser extends Exception {
    static withId(id: string): NotFoundUser {
      return Exception.with(`User with id ${id} cannot be found`)
    }
    static withEmail(email: string): NotFoundUser {
      return Exception.with(`User with email ${email} cannot be found`)
    }
    static withIsActive(isActive: boolean): NotFoundUser {
      return Exception.with(`Cannot found active users`)
    }
  }