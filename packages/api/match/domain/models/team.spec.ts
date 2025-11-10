import { Err, Ok } from 'neverthrow'
import { Team } from './team'



describe('Team', () => {
  it.concurrent('can be created from string', () => {
    const value = 'ValidTeam'
    const team = Team.fromString(value)

    expect(team).toBeInstanceOf(Ok)
  })

  it.concurrent('cannot be blank', () => {
    expect(Team.fromString(' ')).toBeInstanceOf(Err)
  })

})