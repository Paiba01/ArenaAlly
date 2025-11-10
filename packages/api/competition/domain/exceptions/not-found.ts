import { Exception } from '~/shared/domain'

export class NotFoundCompetition extends Exception {
  static withId(id: string): NotFoundCompetition {
    return Exception.with(`Competition with id ${id} cannot be found`)
  }
}
