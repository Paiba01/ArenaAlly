import { Err, Ok } from 'neverthrow'

import {MatchId} from './id'

describe('MatchId', () => {
  it.concurrent('can be created from string', () => {
    const value = '85fe13bf-5e0f-47e4-be24-21b94e9048e1'
    const id = MatchId.fromString(value)

    expect(id).toBeInstanceOf(Ok)
  })

  it.concurrent('cannot be blank', () => {
    expect(MatchId.fromString(' ')).toBeInstanceOf(Err)
  })

  it.concurrent('cannot have invalid format', () => {
    expect(MatchId.fromString('notValidUuidFormat')).toBeInstanceOf(Err)
  })
})