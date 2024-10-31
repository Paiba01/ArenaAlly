import { Err, Ok } from 'neverthrow'
import Referee from './referee'



describe('Referee', () => {
  it.concurrent('can be created from string', () => {
    const value = '85fe13bf-5e0f-47e4-be24-21b94e9048e1'
    const referee = Referee.fromString(value)

    expect(referee).toBeInstanceOf(Ok)
  })

  it.concurrent('cannot be blank', () => {
    expect(Referee.fromString(' ')).toBeInstanceOf(Err)
  })

  it.concurrent('cannot have invalid format', () => {
    expect(Referee.fromString('notValidUuidFormat')).toBeInstanceOf(Err)
  })
})