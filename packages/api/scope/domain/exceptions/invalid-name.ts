import { Exception } from '~/shared/domain'

class InvalidScopeName extends Exception {
  static causeIsBlank(): InvalidScopeName {
    return Exception.with('Scope name cannot be blank')
  }
}

export default InvalidScopeName
