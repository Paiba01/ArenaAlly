import { Ok } from 'neverthrow'

import Id from './id'

describe('Id', () => {
  it.concurrent('can be created from string', () => {
    const value = '85fe13bf-5e0f-47e4-be24-21b94e9048e1'
    const id = Id.fromString(value) as Ok<string, unknown>

    expect(id.isOk()).toBe(true)
    expect(id.value).toBe(value)
  })

  it.concurrent('cannot be blank', () => {
    expect(Id.fromString(' ').isErr()).toBe(true)
  })

  it.concurrent('cannot have invalid format', () => {
    expect(Id.fromString('notValidUuidFormat').isErr()).toBe(true)
  })
})
