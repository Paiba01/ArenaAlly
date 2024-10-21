import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { err, Result } from 'neverthrow'

import { InvalidId } from '~/shared/domain'

import MatchsFinder from '../../services/finder'
import { MatchDto } from '~/match/dto/response/match'
import { NotFoundMatch } from '~/match/domain/exceptions/not-found'
import { GetMatchsOfUser } from '../get-matchs-of-user'
import UserId from '~/user/domain/models/id'

@QueryHandler(GetMatchsOfUser)
export class GetMatchsOfUserHandler implements IQueryHandler {
  constructor(
    @Inject(MatchsFinder) private readonly matchsFinder: MatchsFinder,
  ) {}

  async execute(
    query: GetMatchsOfUser,
  ): Promise<Result<MatchDto[], InvalidId | NotFoundMatch>> {
    const userId = UserId.fromString(query.userId)
    if (userId.isErr()) return err(userId.error)

    return await this.matchsFinder.findByUserId(userId.value)
  }
}
