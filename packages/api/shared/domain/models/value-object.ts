export type ValueType =
  | {
      [key: string]: ValueType
    }
  | boolean
  | number
  | string
  | undefined
  | ValueType[]

class ValueObject<T extends ValueType> {
  constructor(public readonly value: T) {}

  static equals<U extends ValueType>(a: ValueObject<U>, b: ValueObject<U>) {
    return a.constructor.name === b.constructor.name && a.value === b.value
  }
}

export default ValueObject
