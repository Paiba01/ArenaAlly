import { Result } from 'neverthrow'
import { NotFoundMatch } from '~/match/domain/exceptions/not-found'
import { MatchId } from '~/match/domain/models/id'
import { MatchDto } from '~/match/dto/response/match'


type MatchsFinder = {
  find(id: MatchId): Promise<Result<MatchDto, NotFoundMatch>>
  getAll(): Promise<MatchDto[]>
}

const MatchsFinder = 'MATCHS_FINDER'

export default MatchsFinder
