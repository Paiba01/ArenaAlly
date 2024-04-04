import { AggregateRoot } from "@nestjs/cqrs";
import { MatchId } from "./id";
import { Team } from "./team";
import Referee from "./referee";
import { Day } from "./day";


class Match extends AggregateRoot {
    private _id:        MatchId
    private _local:     Team
    private _visitor:   Team
    private _referee1:  Referee
    private _referee2:  Referee
    private _day:       Day

    private constructor(
        id:         MatchId,
        local:      Team,
        visitor:    Team,
        referee1:   Referee,
        referee2:   Referee,
        day:        Day,
    ) {
        super()
        this._id            = id
        this._local         = local
        this._visitor       = visitor
        this._referee1      = referee1
        this._referee2      = referee2
        this._day           = day
    }

    static create({
        id,
        local,
        visitor,
        day,
    }:{
        id:         MatchId
        local:      Team
        visitor:    Team
        day:        Day
    }) {
        return new this(id,local,visitor, null, null, day)
    }

    get id(): MatchId {
        return this._id
    }

    get local(): Team {
        return this._local
    }

    get visitor(): Team {
        return this._visitor
    }

    get referee1(): Referee {
        return this._referee1
    }

    get referee2(): Referee {
        return this._referee2
    }

    get day(): Day {
        return this._day
    }
}

export default Match