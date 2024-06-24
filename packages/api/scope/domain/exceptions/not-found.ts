import { Exception } from '~/shared/domain'

class NotFoundScope extends Exception {
  static withId(id: string): NotFoundScope {
    return Exception.with(`Scope with id ${id} cannot be found`)
  }
}

export default NotFoundScope
