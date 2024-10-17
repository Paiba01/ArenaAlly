import { Result } from 'neverthrow'
import { NotFoundCompetition } from '~/competition/domain/exceptions/not-found'
import { CompetitionId } from '~/competition/domain/models/id'
import { CompetitionDto } from '~/competition/dto/response/competition'


type CompetitionsFinder = {
  find(id: CompetitionId): Promise<Result<CompetitionDto, NotFoundCompetition>>
  getAll(): Promise<CompetitionDto[]>
}

const CompetitionsFinder = 'COMPETITIONS_FINDER'

export default CompetitionsFinder
