import { err, ok, Result } from "neverthrow";
import { ValueObject } from "~/shared/domain";
import { InvalidTeam } from "../exceptions/invalid-team";


export class Team extends ValueObject<string> {
    private constructor(value: string) {
        super(value)
    }

    static fromString(value: string): Result<Team, InvalidTeam> {
        const isBlank = !value.trim()

        if(isBlank) return err(InvalidTeam.causeIsBlank())

        return ok(new this(value))
    }
} 