import { err, ok, Result } from 'neverthrow'

import { ValueObject } from '~/shared/domain'

import InvalidScopeName from '../exceptions/invalid-name'

class ScopeName extends ValueObject<string> {
  private constructor(value: string) {
    super(value)
  }

  static fromString(value: string): Result<ScopeName, InvalidScopeName> {
    const isBlank = !value.trim()

    if (isBlank) return err(InvalidScopeName.causeIsBlank())

    return ok(new this(value))
  }
}

export default ScopeName
