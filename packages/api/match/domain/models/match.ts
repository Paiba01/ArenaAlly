import { AggregateRoot } from "@nestjs/cqrs";
import { MatchId } from "./id";
import { Team } from "./team";
import Referee from "./referee";



class Match extends AggregateRoot {
    private _id:        MatchId
    private _local:     Team
    private _visitor:   Team
    private _referee1:  Referee | null
    private _referee2:  Referee | null
    private _day:       Date

    private constructor(
        id:         MatchId,
        local:      Team,
        visitor:    Team,
        referee1:   Referee | null,
        referee2:   Referee | null,
        day:        Date,
    ) {
        super()
        this._id            = id
        this._local         = local
        this._visitor       = visitor
        this._referee1      = referee1 || null
        this._referee2      = referee2 || null
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
        day: Date
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
        return this._referee1 || new NullReferee()
    }

    get referee2(): Referee {
        return this._referee2 || new NullReferee()
    }

    get day(): Date {
        return this._day
    }
}

export default Match

class NullReferee extends Referee {
    constructor() {
        super('NullReferee')
    }
}