import { Exception } from '~/shared/domain'

export class InvalidName extends Exception {
  static causeIsBlank(): InvalidName {
    return Exception.with('Name of competition cannot be blank')
  }
}
