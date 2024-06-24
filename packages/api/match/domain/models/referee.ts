import { err, ok, Result } from "neverthrow"
import { InvalidId, ValueObject } from "~/shared/domain"

import UuidLib from '~/shared/uuid'


class Referee extends ValueObject<string> {
    protected constructor(value: string) {
      super(value)
    }
  
    static fromString(value: string): Result<Referee | null, InvalidId> {
      const isBlank = !value.toString().trim()
      if (isBlank) return err(InvalidId.causeIsBlank())
  
      const isValid = UuidLib.validate(value)
      if (!isValid) return err(InvalidId.causeTheFormatIsNotValid(value))
  
      return ok(new this(value))
    }
}

export default Referee