import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { err, Result } from 'neverthrow'

import NotFoundScope from '~/scope/domain/exceptions/not-found'
import { InvalidId } from '~/shared/domain'


import { GetMatch } from '../get-match'
import MatchsFinder from '../../services/finder'
import { MatchDto } from '~/match/dto/response/match'
import { MatchId } from '~/match/domain/models/id'

@QueryHandler(GetMatch)
export class GetMatchHandler implements IQueryHandler {
  constructor(
    @Inject(MatchsFinder) private readonly matchsFinder: MatchsFinder,
  ) {}

  async execute(
    query: GetMatch,
  ): Promise<Result<MatchDto, InvalidId | NotFoundScope>> {
    const matchId = MatchId.fromString(query.id)
    if (matchId.isErr()) return err(matchId.error)

    return await this.matchsFinder.find(matchId.value)
  }
}