import { Exception } from '~/shared/domain'

export class InvalidCategory extends Exception {
  static causeIsBlank(): InvalidCategory{
    return Exception.with('Category of competition cannot be blank')
  }

  static causeInvalidCategory(): InvalidCategory{
    return Exception.with('This is not a valid category!')
  }
}
