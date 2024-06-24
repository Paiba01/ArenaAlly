import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateMatch } from "../create-match";
import { Inject } from "@nestjs/common";
import Match from "~/match/domain/models/match";
import { err, ok, Result } from "neverthrow";
import { InvalidId } from "~/shared/domain";
import { InvalidDay } from "~/match/domain/exceptions/invalid-day";
import { InvalidTeam } from "~/match/domain/exceptions/invalid-team";
import UserId from "~/user/domain/models/id";
import { Team } from "~/match/domain/models/team";
import Matchs from "~/match/domain/services/matchs";
import { Day } from "~/match/domain/models/day";

@CommandHandler(CreateMatch)
export class CreateMatchHandler implements ICommandHandler {
    constructor(@Inject(Matchs) private readonly matchs: Matchs) { }

    async execute(
        command: CreateMatch,
    ): Promise<Result<void, InvalidId | InvalidDay | InvalidTeam>> {
        const userId = UserId.fromString(command.id)
        if (userId.isErr()) return err(userId.error)
        
        const local = Team.fromString(command.local)
        if (local.isErr()) return err(local.error)
    
        const visitor = Team.fromString(command.visitor)
        if (visitor.isErr()) return err(visitor.error)
        
        const day = Day.fromNumber(command.day)
        if (day.isErr()) return err(day.error)
        
        const match = Match.create({
            id: userId.value,
            local: local.value,
            visitor: visitor.value,
            day: day.value,
        })
        
        return ok(await this.matchs.create(match))
        
    }
} 