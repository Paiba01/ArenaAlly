type CreateMatchType = {
    id: string
    local: string
    visitor: string
    day: string
}

export class CreateMatch implements CreateMatchType {
    constructor(
        readonly id: CreateMatchType['id'],
        readonly local: CreateMatchType['local'],
        readonly visitor: CreateMatchType['visitor'],
        readonly day: CreateMatchType['day'],
    ){}

    static with({ id, local, visitor, day }: CreateMatchType): CreateMatch {
        return new this(id, local, visitor, day)
    }
}