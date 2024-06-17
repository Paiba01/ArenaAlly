import { Result } from 'neverthrow'
import { NotFoundMatch } from '~/match/domain/exceptions/not-found'
import { MatchId } from '~/match/domain/models/id'
import { MatchDto } from '~/match/dto/response/match'
import ScopeDto from '~/scope/dto/response/scope'



type MatchsFinder = {
  find(id: MatchId): Promise<Result<MatchDto, NotFoundMatch>>
  getAll(): Promise<ScopeDto[]>
}

const MatchsFinder = 'MATCHS_FINDER'

export default MatchsFinder
