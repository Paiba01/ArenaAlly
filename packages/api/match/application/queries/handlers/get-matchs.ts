import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { GetMatchs } from '../get-matchs'
import MatchsFinder from '../../services/finder'
import { MatchDto } from '~/match/dto/response/match'

@QueryHandler(GetMatchs)
export class GetMatchsHandler implements IQueryHandler {
  constructor(
    @Inject(MatchsFinder) private readonly matchsFinder: MatchsFinder,
  ) {}

  async execute(): Promise<MatchDto[]> {
    return await this.matchsFinder.getAll()
  }
}

