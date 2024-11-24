import { err, ok, Result } from 'neverthrow'
import { ValueObject } from '~/shared/domain'
import { InvalidCategory } from '../exceptions/invalid-category'

export class Category extends ValueObject<string> {
  private constructor(value: string) {
    super(value)
  }

  static fromString(value: string): Result<Category, InvalidCategory> {
    const trimmedValue = value.trim().toUpperCase()
    const categories = ['ALEVIN', 'INFANTIL', 'CADETE', 'JUVENIL', 'SENIOR', 'VETERANO']

    if (trimmedValue === '') {
      return err(InvalidCategory.causeIsBlank())
    }

    if (!categories.includes(trimmedValue)) {
      return err(InvalidCategory.causeInvalidCategory())
    }

    return ok(new this(trimmedValue))  }
}
