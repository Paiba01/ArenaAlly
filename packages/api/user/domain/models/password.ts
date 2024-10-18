import { err, ok, Result } from 'neverthrow'
import { ValueObject } from '~/shared/domain'
import InvalidUserPassword from '../exceptions/invalid-password'

class UserPassword extends ValueObject<string> {
  private constructor(value: string) {
    super(value)
  }

  static fromString(value: string): Result<UserPassword, InvalidUserPassword> {
    const isBlank = !value.trim()

    if (isBlank) return err(InvalidUserPassword.causeIsBlank())

    return ok(new this(value))
  }
}

export default UserPassword