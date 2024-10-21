import Exception from '../models/exception'

class InvalidId extends Exception {
  static causeIsBlank() {
    return Exception.with('Id cannot be blank')
  }

  static causeTheFormatIsNotValid(value: string) {
    return Exception.with(`${value} has not a valid uuid format`)
  }
}

export default InvalidId
