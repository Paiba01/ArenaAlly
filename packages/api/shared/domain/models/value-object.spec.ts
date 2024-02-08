import { itIsAValueObject } from '~/test/closures/shared/domain/value-object'

import ValueObject from './value-object'

describe('ValueObject', () => {
  class ValueObjectA extends ValueObject<string> {
    constructor(value: string) {
      super(value)
    }
  }

  const valueA = 'value'
  const valueObjectA = new ValueObjectA(valueA)

  itIsAValueObject(valueObjectA)

  it.concurrent('can be created', () => {
    expect(valueObjectA.value).toBe(valueA)
  })

  describe('equals', () => {
    class ValueObjectB extends ValueObject<string> {
      constructor(value: string) {
        super(value)
      }
    }

    it.concurrent(
      'checks that different value objects with different values are not equal',
      () => {
        const valueB = 'anotherValue'
        const valueObjectB = new ValueObjectB(valueB)
        expect(ValueObject.equals(valueObjectA, valueObjectB)).toBe(false)
      },
    )

    it.concurrent(
      'checks that different value objects with same values are not equal',
      () => {
        const valueB = 'value'
        const valueObjectB = new ValueObjectB(valueB)
        expect(ValueObject.equals(valueObjectA, valueObjectB)).toBe(false)
      },
    )

    it.concurrent(
      'checks that same value objects with different values are not equal',
      () => {
        const anotherValueA = 'anotherValue'
        const anotherValueObjectA = new ValueObjectA(anotherValueA)
        expect(ValueObject.equals(valueObjectA, anotherValueObjectA)).toBe(
          false,
        )
      },
    )

    it.concurrent(
      'checks that same value objects with same values are equal',
      () => {
        const sameValueA = 'value'
        const sameValueObjectA = new ValueObjectA(sameValueA)
        expect(ValueObject.equals(valueObjectA, sameValueObjectA)).toBe(true)
      },
    )
  })
})
