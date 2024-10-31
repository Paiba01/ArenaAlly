import { Err, Ok } from 'neverthrow'
import UserEmail from './email'


describe('UserEmail', () => {
  it.concurrent('can be created from string with format', () => {
    const value = 'ValidEmail@gmail.com'
    const email = UserEmail.fromString(value)

    expect(email).toBeInstanceOf(Ok)
  })

  it.concurrent('can be created from string without format', () => {
    const value = 'InvalidEmail'
    const email = UserEmail.fromString(value)

    expect(email).toBeInstanceOf(Err)
  })

  it.concurrent('cannot be blank', () => {
    expect(UserEmail.fromString(' ')).toBeInstanceOf(Err)
  })

})