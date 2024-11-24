import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { err, ok, Result } from 'neverthrow'

import { InvalidId } from '~/shared/domain'
import Matchs from '~/match/domain/services/matchs'

import { MatchId } from '~/match/domain/models/id'
import { NotFoundMatch } from '~/match/domain/exceptions/not-found'

import { EditMatchDate } from '../edit-match-date'
import { InvalidDate } from '~/match/domain/exceptions/invalid-date'

@CommandHandler(EditMatchDate)
export class EditMatchDateHandler implements ICommandHandler {
  constructor(@Inject(Matchs) private readonly matchs: Matchs) {}

  async execute(
    command: EditMatchDate,
  ): Promise<Result<void, InvalidId | InvalidDate | NotFoundMatch>> {
    const matchId = MatchId.fromString(command.id)
    if (matchId.isErr()) return err(matchId.error)

    const matchDay = new Date(command.day)
    if (matchDay < new Date()) return err(InvalidDate.causeIsPast())

    const match = await this.matchs.find(matchId.value)
    if (match.isErr()) return err(match.error)

    return ok(await this.matchs.editDate(matchId.value, matchDay))
  }
}
