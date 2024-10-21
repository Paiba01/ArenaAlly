import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { err, ok, Result } from "neverthrow";
import Competitions from "~/competition/domain/services/competitions";
import CompetitionsFinder from "../../services/finder";
import { EditCompetition } from "../edit-competition";
import { CompetitionId } from "~/competition/domain/models/id";
import { InvalidId } from "~/shared/domain";
import { Name } from "~/competition/domain/models/name";
import { InvalidName } from "~/competition/domain/exceptions/invalid-name";
import { Category } from "~/competition/domain/models/category";
import { InvalidCategory } from "~/competition/domain/exceptions/invalid-category";
import { NotFoundCompetition } from "~/competition/domain/exceptions/not-found";
import { Competition } from "~/competition/domain/models/competition";


@CommandHandler(EditCompetition)
export class EditCompetitionHandler implements ICommandHandler {
    constructor(
        @Inject(Competitions) private readonly Competitions: Competitions,
        @Inject(CompetitionsFinder) private readonly CompetitionsFinder: CompetitionsFinder,
    ) {}
    
    async execute(
        command: EditCompetition,
    ): Promise<Result<void, InvalidId | InvalidName | InvalidCategory | NotFoundCompetition>> {
        const competitionId = CompetitionId.fromString(command.id)
        if (competitionId.isErr()) return err(competitionId.error)

        const competition = await this.CompetitionsFinder.find(competitionId.value)
        if (competition.isErr()) return err(competition.error)

        const competitionName = Name.fromString(command.name)
        if (competitionName.isErr()) return err(competitionName.error)

        const competitionCategory = Category.fromString(command.category)
        if (competitionCategory.isErr()) return err(competitionCategory.error)

        const editedCompetition = Competition.create({
            id: competitionId.value,
            name: competitionName.value,
            category: competitionCategory.value,
            dateFrom: new Date(command.dateFrom),
            dateTo: new Date(command.dateTo),
        })

        return ok(await this.Competitions.edit(editedCompetition))
    }
}