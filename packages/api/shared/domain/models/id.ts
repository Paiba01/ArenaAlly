import { err, ok, Result } from 'neverthrow'

import UuidLib from '~/shared/uuid'

import InvalidId from '../exceptions/invalid-id'
import ValueObject from './value-object'

class Id extends ValueObject<string> {
  protected constructor(value: string) {
    super(value)
  }

  static fromString(value: string): Result<Id, InvalidId> {
    const isBlank = !value.toString().trim()
    if (isBlank) return err(InvalidId.causeIsBlank())

    const isValid = UuidLib.validate(value)
    if (!isValid) return err(InvalidId.causeTheFormatIsNotValid(value))

    return ok(new this(value))
  }
}

export default Id
