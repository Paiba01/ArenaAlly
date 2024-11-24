import { Ok, Err } from 'neverthrow'

import Id from './id'

describe('Id', () => {
  it.concurrent('can be created from string', () => {
    const value = '85fe13bf-5e0f-47e4-be24-21b94e9048e1'
    const id = Id.fromString(value)

    expect(id).toBeInstanceOf(Ok)
  })

  it.concurrent('cannot be blank', () => {
    expect(Id.fromString(' ')).toBeInstanceOf(Err)
  })

  it.concurrent('cannot have invalid format', () => {
    expect(Id.fromString('notValidUuidFormat')).toBeInstanceOf(Err)
  })
})
