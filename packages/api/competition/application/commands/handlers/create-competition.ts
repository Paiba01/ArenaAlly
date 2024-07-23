import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { err, ok, Result } from "neverthrow";
import { InvalidId } from "~/shared/domain";
import { CreateCompetition } from "../create-competition";
import Competitions from "~/competition/domain/services/competitions";
import { InvalidCategory } from "~/competition/domain/exceptions/invalid-category";
import { CompetitionId } from "~/competition/domain/models/id";
import { InvalidName } from "~/competition/domain/exceptions/invalid-name";
import { Name } from "~/competition/domain/models/name";
import { Category } from "~/competition/domain/models/category";
import { Competition } from "~/competition/domain/models/competition";
import Matchs from "~/match/domain/services/matchs";
import Match from "~/match/domain/models/match";
import Uuid from "~/shared/uuid";
import { MatchId } from "~/match/domain/models/id";
import { Team } from "~/match/domain/models/team";

@CommandHandler(CreateCompetition)
export class CreateCompetitionHandler implements ICommandHandler {
    constructor(@Inject(Competitions) private readonly competitions: Competitions, @Inject(Matchs) private readonly matchs: Matchs
) { }

    async execute(
        command: CreateCompetition,
    ): Promise<Result<void, InvalidId | InvalidName | InvalidCategory>> {
        const competitionId = CompetitionId.fromString(command.id)
        if (competitionId.isErr()) return err(competitionId.error)
        
        const name = Name.fromString(command.name)
        if (name.isErr()) return err(name.error)
    
        const category = Category.fromString(command.category)
        if (category.isErr()) return err(category.error)
        
        const matchsIds: MatchId[] = [];
        
        for (let i = 0; i < command.teams.length; i++) {
            for (let j = i + 1; j < command.teams.length; j++) {
                const id = Uuid.generate()
                const matchId = MatchId.fromString(id)
                if(matchId.isErr()) break
                
                const local = Team.fromString(command.teams[i])
                if (local.isErr()) break
            
                const visitor = Team.fromString(command.teams[j])
                if (visitor.isErr()) break

                const match = Match.create({
                    id: matchId.value,
                    local: local.value,
                    visitor:visitor.value,
                    day: new Date()
                })

                await this.matchs.create(match)

                matchsIds.push(matchId.value)
            }
        }
        
        
        const competition = Competition.create({
            id: competitionId.value,
            name: name.value,
            category: category.value,
            dateFrom: new Date(command.dateFrom),
            dateTo: new Date(command.dateTo),
            matchs: matchsIds
        })
        
        return ok(await this.competitions.create(competition))
        
    }
} 
