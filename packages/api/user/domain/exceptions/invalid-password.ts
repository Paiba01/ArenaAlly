import { Exception } from '~/shared/domain'

class InvalidUserPassword extends Exception {
  static causeIsBlank(): InvalidUserPassword{
    return Exception.with('User password cannot be blank')
  }
}

export default InvalidUserPassword