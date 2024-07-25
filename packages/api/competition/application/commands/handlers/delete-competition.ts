import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { err, ok, Result } from 'neverthrow'

import { InvalidId } from '~/shared/domain'

import { DeleteCompetition } from '../delete-competition'
import { NotFoundCompetition } from '~/competition/domain/exceptions/not-found'
import Competitions from '~/competition/domain/services/competitions'
import CompetitionsFinder from '../../services/finder'
import { CompetitionId } from '~/competition/domain/models/id'



@CommandHandler(DeleteCompetition)
export class DeleteCompetitionHandler implements ICommandHandler {
  constructor(
    @Inject(Competitions) private readonly competitions: Competitions,
    @Inject(CompetitionsFinder) private readonly competitionsFinder: CompetitionsFinder,
  ) {}

  async execute(
    command: DeleteCompetition,
  ): Promise<Result<void, InvalidId | NotFoundCompetition>> {
    const competitionId = CompetitionId.fromString(command.id)
    if (competitionId.isErr()) return err(competitionId.error)

    const competition = await this.competitionsFinder.find(competitionId.value)
    if (competition.isErr()) return err(competition.error)

    return ok(await this.competitions.delete(competitionId.value))
  }
}

