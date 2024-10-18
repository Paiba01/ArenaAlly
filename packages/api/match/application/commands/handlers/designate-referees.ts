import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { err, ok, Result } from 'neverthrow'

import { InvalidId } from '~/shared/domain'
import Matchs from '~/match/domain/services/matchs'

import { MatchId } from '~/match/domain/models/id'
import { NotFoundMatch } from '~/match/domain/exceptions/not-found'

import { DesignateReferees } from '../designate-referees'

import UserId from '~/user/domain/models/id'
import Users from '~/user/domain/services/users'

@CommandHandler(DesignateReferees)
export class DesignateRefereesHandler implements ICommandHandler {
  constructor(
    @Inject(Matchs) private readonly matchs: Matchs,
    @Inject(Users) private readonly users: Users,
  ) {}

  async execute(
    command: DesignateReferees,
  ): Promise<Result<void, InvalidId | NotFoundMatch>> {
    const matchId = MatchId.fromString(command.id)
    if (matchId.isErr()) return err(matchId.error)

    const refereeId1 = UserId.fromString(command.referee1)
    if (refereeId1.isErr()) return err(refereeId1.error)

    const refereeId2 = UserId.fromString(command.referee2)
    if (refereeId2.isErr()) return err(refereeId2.error)

    const match = await this.matchs.find(matchId.value)
    if (match.isErr()) return err(match.error)

    const referee1 = await this.users.find(refereeId1.value)
    if (referee1.isErr()) return err(referee1.error)

    const referee2 = await this.users.find(refereeId2.value)
    if (referee2.isErr()) return err(referee2.error)

    return ok(
      await this.matchs.designateReferees(matchId.value, refereeId1.value, refereeId2.value),
    )
  }
}
