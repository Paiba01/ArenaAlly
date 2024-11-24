import { Exception } from '~/shared/domain'

export class NotFoundMatch extends Exception {
  static withId(id: string): NotFoundMatch {
    return Exception.with(`Match with id ${id} cannot be found`)
  }
  static withCompetitionId(id: string): NotFoundMatch {
    return Exception.with(`Match with competitionId ${id} cannot be found`)
  }
  static withUserId(id: string): NotFoundMatch {
    return Exception.with(`Match with competitionId ${id} cannot be found`)
  }
}
