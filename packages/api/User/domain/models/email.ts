import { err, ok, Result } from 'neverthrow';
import { ValueObject } from '~/shared/domain';
import InvalidUserEmail from '../exceptions/invalid-email';

class UserEmail extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  static fromString(value: string): Result<UserEmail, InvalidUserEmail> {
    if (!value.trim()) {
      return err(InvalidUserEmail.causeIsBlank());
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      return err(InvalidUserEmail.causeInvalidFormat());
    }

    return ok(new this(value));
  }
}

export default UserEmail;
