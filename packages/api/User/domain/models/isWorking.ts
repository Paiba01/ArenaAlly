import { ValueObject } from '~/shared/domain'

class UserIsWorking extends ValueObject<boolean> {
  private constructor(value: boolean) {
    super(value)
  }
}

export default UserIsWorking