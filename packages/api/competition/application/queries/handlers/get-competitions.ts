import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { GetCompetitions } from '../get-competitions'
import CompetitionsFinder from '../../services/finder'
import { CompetitionDto } from '~/competition/dto/response/competition'

@QueryHandler(GetCompetitions)
export class GetCompetitionsHandler implements IQueryHandler {
  constructor(
    @Inject(CompetitionsFinder) private readonly competitionsFinder: CompetitionsFinder,
  ) {}

  async execute(): Promise<CompetitionDto[]> {
    return await this.competitionsFinder.getAll()
  }
}

