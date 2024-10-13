import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { err, Result } from 'neverthrow'

import { InvalidId } from '~/shared/domain'

import MatchsFinder from '../../services/finder'
import { MatchDto } from '~/match/dto/response/match'
import { NotFoundMatch } from '~/match/domain/exceptions/not-found'
import { GetMatchsByCompetition } from '../get-matchs-by-competition'
import { CompetitionId } from '~/competition/domain/models/id'

@QueryHandler(GetMatchsByCompetition)
export class GetMatchsByCompetitionHandler implements IQueryHandler {
  constructor(
    @Inject(MatchsFinder) private readonly matchsFinder: MatchsFinder,
  ) {}

  async execute(
    query: GetMatchsByCompetition,
  ): Promise<Result<MatchDto[], InvalidId | NotFoundMatch>> {
    const competitionId = CompetitionId.fromString(query.competitionId)
    if (competitionId.isErr()) return err(competitionId.error)

    return await this.matchsFinder.findByCompetitionId(competitionId.value)
  }
}
