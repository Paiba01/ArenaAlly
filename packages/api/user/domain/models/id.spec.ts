import { Err, Ok } from 'neverthrow'

import UserId from './id'

describe('UserId', () => {
  it.concurrent('can be created from string', () => {
    const value = '85fe13bf-5e0f-47e4-be24-21b94e9048e1'
    const id = UserId.fromString(value)

    expect(id).toBeInstanceOf(Ok)
  })

  it.concurrent('cannot be blank', () => {
    expect(UserId.fromString(' ')).toBeInstanceOf(Err)
  })

  it.concurrent('cannot have invalid format', () => {
    expect(UserId.fromString('notValidUuidFormat')).toBeInstanceOf(Err)
  })
})