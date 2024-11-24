import { Err, Ok } from 'neverthrow'

import { Name } from './name'

describe('Name', () => {
  it.concurrent('can be created from string', () => {
    const value = 'ValidName'
    const name = Name.fromString(value)

    expect(name).toBeInstanceOf(Ok)
  })

  it.concurrent('cannot be blank', () => {
    expect(Name.fromString(' ')).toBeInstanceOf(Err)
  })

})