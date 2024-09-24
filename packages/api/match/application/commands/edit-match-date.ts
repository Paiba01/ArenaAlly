type EditMatchDateType= {
    id: string
    day: string
}
export class EditMatchDate implements EditMatchDateType {
    private constructor(
        readonly id: EditMatchDateType['id'],
        readonly day: EditMatchDateType['day'],
    ) {}

    static with({ id, day }: EditMatchDateType): EditMatchDate {
        return new this(id, day)
    }
}