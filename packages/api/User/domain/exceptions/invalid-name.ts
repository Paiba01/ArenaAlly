import { Exception } from '~/shared/domain'

class InvalidUserName extends Exception {
  static causeIsBlank(): InvalidUserName {
    return Exception.with('User name cannot be blank')
  }
}

export default InvalidUserName
