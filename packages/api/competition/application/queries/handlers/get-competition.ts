import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { err, Result } from 'neverthrow'

import { InvalidId } from '~/shared/domain'

import { GetCompetition } from '../get-competition'
import CompetitionsFinder from '../../services/finder'
import { CompetitionDto } from '~/competition/dto/response/competition'
import { NotFoundCompetition } from '~/competition/domain/exceptions/not-found'
import { CompetitionId } from '~/competition/domain/models/id'

@QueryHandler(GetCompetition)
export class GetCompetitionHandler implements IQueryHandler {
  constructor(
    @Inject(CompetitionsFinder) private readonly competitionsFinder: CompetitionsFinder,
  ) {}

  async execute(
    query: GetCompetition,
  ): Promise<Result<CompetitionDto, InvalidId | NotFoundCompetition>> {
    const competitionId = CompetitionId.fromString(query.id)
    if (competitionId.isErr()) return err(competitionId.error)

    return await this.competitionsFinder.find(competitionId.value)
  }
}