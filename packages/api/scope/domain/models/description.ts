import { ValueObject } from '~/shared/domain'

class ScopeDescription extends ValueObject<string> {
  private constructor(value: string) {
    super(value)
  }

  static fromString(value: string): ScopeDescription {
    return new this(value)
  }
}

export default ScopeDescription
