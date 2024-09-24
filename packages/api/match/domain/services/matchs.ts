import { Result } from 'neverthrow'
import { MatchId } from '../models/id'
import Match from '../models/match'
import { NotFoundMatch } from '../exceptions/not-found'

type Matchs = {
  create(Match: Match): Promise<void>
  delete(id: MatchId): Promise<void>
  editDate(id: MatchId, day: Date): Promise<void>
  find(id: MatchId): Promise<Result<void, NotFoundMatch>>
}

const Matchs = 'Matchs'

export default Matchs
