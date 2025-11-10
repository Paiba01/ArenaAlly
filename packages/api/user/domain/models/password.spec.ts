import { Err, Ok } from 'neverthrow'
import UserPassword from './password'


describe('Password', () => {
  it.concurrent('can be created from string', () => {
    const value = 'ValidPassword'
    const password = UserPassword.fromString(value)

    expect(password).toBeInstanceOf(Ok)
  })

  it.concurrent('cannot be blank', () => {
    expect(UserPassword.fromString(' ')).toBeInstanceOf(Err)
  })

})