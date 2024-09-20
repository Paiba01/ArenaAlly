type EditCompetitionType= {
    id: string
    name: string
    category: string
    dateFrom: string
    dateTo: string
}
export class EditCompetition implements EditCompetitionType {
    private constructor(
        readonly id: EditCompetitionType['id'],
        readonly name: EditCompetitionType['name'],
        readonly category: EditCompetitionType['category'],
        readonly dateFrom: EditCompetitionType['dateFrom'],
        readonly dateTo: EditCompetitionType['dateTo'],
    ) {}

    static with({ id, name, category, dateFrom, dateTo }: EditCompetitionType): EditCompetition {
        return new this(id, name, category, dateFrom, dateTo)
    }
}