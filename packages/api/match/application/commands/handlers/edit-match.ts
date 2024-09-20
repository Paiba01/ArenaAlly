import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { err, ok, Result } from "neverthrow";

import { InvalidId } from "~/shared/domain";
import Matchs from "~/match/domain/services/matchs";
import MatchsFinder from "../../services/finder";
import { EditMatch } from "../edit-match";
import { MatchId } from "~/match/domain/models/id";
import { NotFoundMatch } from "~/match/domain/exceptions/not-found";
import { InvalidTeam } from "~/match/domain/exceptions/invalid-team";
import Match from "~/match/domain/models/match";
import { Team } from "~/match/domain/models/team";
import Referee from "~/match/domain/models/referee";
import { CompetitionId } from "~/competition/domain/models/id";

@CommandHandler(EditMatch)
export class EditMatchHandler implements ICommandHandler {
    constructor(
        @Inject(Matchs) private readonly Matchs: Matchs,
        @Inject(MatchsFinder) private readonly MatchsFinder: MatchsFinder,
    ) {}
    
    async execute(
        command: EditMatch,
    ): Promise<Result<void, InvalidId | InvalidTeam | NotFoundMatch>> {
        const matchId = MatchId.fromString(command.id)
        if (matchId.isErr()) return err(matchId.error)
        
        const competitionId = CompetitionId.fromString(command.competitionId)
        if (competitionId.isErr()) return err(competitionId.error)

        const matchResult = await this.MatchsFinder.find(matchId.value)
        if (matchResult.isErr()) return err(matchResult.error)

        const local = Team.fromString(command.local)
        if (local.isErr()) return err(local.error)

        const visitor = Team.fromString(command.visitor)
        if (visitor.isErr()) return err(visitor.error)
        
        const referee1Result = command.referee1 ? Referee.fromString(command.referee1) : ok(null)
        const referee2Result = command.referee2 ? Referee.fromString(command.referee2) : ok(null)

        if (referee1Result.isErr()) return err(referee1Result.error)
        if (referee2Result.isErr()) return err(referee2Result.error)

        const editedMatch = Match.create({
            id: matchId.value,
            competitionId: competitionId.value,
            local: local.value,
            visitor: visitor.value,
            referee1: referee1Result.value,
            referee2: referee2Result.value,
            day: new Date(command.day)
        })

        return ok(await this.Matchs.edit(editedMatch))
    }
}