import { Exception } from '~/shared/domain'

class InvalidUserEmail extends Exception {
  static causeIsBlank(): InvalidUserEmail{
    return Exception.with('User email cannot be blank')
  }

  static causeInvalidFormat(): InvalidUserEmail{
    return Exception.with('Email format is wrong!')
  }
}

export default InvalidUserEmail
