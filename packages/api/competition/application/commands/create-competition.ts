type CreateCompetitionType= {
    id: string
    name: string
    category: string
    teams: string[]
    dateFrom: string
    dateTo: string
}

export class CreateCompetition implements CreateCompetitionType {
    constructor(
        readonly id: CreateCompetitionType['id'],
        readonly name: CreateCompetitionType['name'],
        readonly category: CreateCompetitionType['category'],
        readonly teams: CreateCompetitionType['teams'],
        readonly dateFrom: CreateCompetitionType['dateFrom'],
        readonly dateTo: CreateCompetitionType['dateTo'],

    ){}

    static with({ id, name, category, teams, dateFrom, dateTo }: CreateCompetitionType): CreateCompetition {
        return new this(id, name, category, teams, dateFrom, dateTo)
    }
}