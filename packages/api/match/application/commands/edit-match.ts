type EditMatchType= {
    id: string
    competitionId: string
    local: string
    visitor: string
    referee1: string
    referee2: string
    day: Date
}
export class EditMatch implements EditMatchType {
    private constructor(
        readonly id: EditMatchType['id'],
        readonly competitionId: EditMatchType['competitionId'],
        readonly local: EditMatchType['local'],
        readonly visitor: EditMatchType['visitor'],
        readonly referee1: EditMatchType['referee1'],
        readonly referee2: EditMatchType['referee2'],
        readonly day: EditMatchType['day'],
    ) {}

    static with({ id, competitionId, local, visitor, referee1, referee2, day }: EditMatchType): EditMatch {
        return new this(id, competitionId, local, visitor, referee1, referee2, day)
    }
}