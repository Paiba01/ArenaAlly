import { Result } from 'neverthrow'
import { CompetitionId } from '~/competition/domain/models/id'
import { NotFoundMatch } from '~/match/domain/exceptions/not-found'
import { MatchId } from '~/match/domain/models/id'
import { MatchDto } from '~/match/dto/response/match'
import UserId from '~/user/domain/models/id'


type MatchsFinder = {
  find(id: MatchId): Promise<Result<MatchDto, NotFoundMatch>>
  getAll(): Promise<MatchDto[]>
  findByCompetitionId(competitionId: CompetitionId): Promise<Result<MatchDto[], NotFoundMatch>>
  findByUserId(userId: UserId): Promise<Result<MatchDto[], NotFoundMatch>>
}

const MatchsFinder = 'MATCHS_FINDER'

export default MatchsFinder
