import { err, ok, Result } from 'neverthrow'
import { ValueObject } from '~/shared/domain'
import { InvalidName } from '../exceptions/invalid-name'

export class Name extends ValueObject<string> {
  private constructor(value: string) {
    super(value)
  }

  static fromString(value: string): Result<Name, InvalidName> {
    const isBlank = !value.trim()

    if (isBlank) return err(InvalidName.causeIsBlank())
    
    return ok(new this(value))
  }
}
