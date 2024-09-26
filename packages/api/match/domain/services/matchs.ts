import { Result } from 'neverthrow'
import { MatchId } from '../models/id'
import Match from '../models/match'
import { NotFoundMatch } from '../exceptions/not-found'
import Referee from '../models/referee'

type Matchs = {
  create(Match: Match): Promise<void>
  delete(id: MatchId): Promise<void>
  editDate(id: MatchId, day: Date): Promise<void>
  find(id: MatchId): Promise<Result<void, NotFoundMatch>>
  designateReferees(id: MatchId, referee1: Referee, referee2: Referee): Promise<void>
}

const Matchs = 'Matchs'

export default Matchs
