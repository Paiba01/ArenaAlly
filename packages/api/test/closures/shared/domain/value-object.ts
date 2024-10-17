import ValueObject, { ValueType } from '~/shared/domain/models/value-object'

export const itIsAValueObject = (value: ValueObject<ValueType>) => {
  it.concurrent('is a value object', () => {
    expect(value).toHaveProperty('value')
  })
}
