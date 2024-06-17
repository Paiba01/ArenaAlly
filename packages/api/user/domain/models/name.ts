import { err, ok, Result } from 'neverthrow'
import { ValueObject } from '~/shared/domain'
import InvalidUserName from '../exceptions/invalid-name'

class UserName extends ValueObject<string> {
  private constructor(value: string) {
    super(value)
  }

  static fromString(value: string): Result<UserName, InvalidUserName> {
    const isBlank = !value.trim()

    if (isBlank) return err(InvalidUserName.causeIsBlank())
    
    return ok(new this(value))
  }
}

export default UserName