import { err, ok, Result } from "neverthrow";
import { ValueObject } from "~/shared/domain";
import { InvalidDay } from "../exceptions/invalid-day";

export class Day extends ValueObject<number> {
    private constructor(value: number) {
        super(value)
    }
    
    static fromNumber(value: number): Result<Day, InvalidDay> {
    
        if (!Number.isInteger(value)) {
            return err(InvalidDay.causeIsNotInteger());
        }
        return ok(new this(value))
    }
}