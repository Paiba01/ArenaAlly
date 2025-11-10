import { Err, Ok } from 'neverthrow'
import UserName from './name'

describe('UserName', () => {
  it.concurrent('can be created from string', () => {
    const value = 'ValidName'
    const name = UserName.fromString(value)

    expect(name).toBeInstanceOf(Ok)
  })

  it.concurrent('cannot be blank', () => {
    expect(UserName.fromString(' ')).toBeInstanceOf(Err)
  })

})