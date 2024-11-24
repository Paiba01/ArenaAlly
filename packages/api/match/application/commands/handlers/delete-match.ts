import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { err, ok, Result } from 'neverthrow'
import { MatchId } from '~/match/domain/models/id'
import Matchs from '~/match/domain/services/matchs'

import { InvalidId } from '~/shared/domain'
import { DeleteMatch } from '../delete-match'
import MatchsFinder from '../../services/finder'
import { NotFoundMatch } from '~/match/domain/exceptions/not-found'



@CommandHandler(DeleteMatch)
export class DeleteMatchHandler implements ICommandHandler {
  constructor(
    @Inject(Matchs) private readonly matchs: Matchs,
    @Inject(MatchsFinder) private readonly matchsFinder: MatchsFinder,
  ) {}

  async execute(
    command: DeleteMatch,
  ): Promise<Result<void, InvalidId | NotFoundMatch>> {
    const matchId = MatchId.fromString(command.id)
    if (matchId.isErr()) return err(matchId.error)

    const match = await this.matchsFinder.find(matchId.value)
    if (match.isErr()) return err(match.error)

    return ok(await this.matchs.delete(matchId.value))
  }
}

