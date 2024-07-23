
import { AggregateRoot } from "@nestjs/cqrs";
import { CompetitionId } from "./id";
import { Name } from "./name";
import { Category } from "./category";
import { Id } from "~/shared/domain";
import { MatchId } from "~/match/domain/models/id";




export class Competition extends AggregateRoot {
    private _id:        CompetitionId
    private _name:      Name
    private _category:  Category
    private _matchs:    MatchId[]
    private _dateFrom:  Date
    private _dateTo:    Date


    private constructor(
        id:             CompetitionId,
        name:           Name,
        category:       Category,
        matchs:         MatchId[],
        dateFrom:       Date,
        dateTo:         Date,
    ) {
        super()
        this._id            = id
        this._name          = name
        this._category      = category
        this._matchs        = matchs || null
        this._dateFrom      = dateFrom
        this._dateTo        = dateTo

    }

    static create({
        id,
        name,
        category,
        matchs,
        dateFrom,
        dateTo,
    }:{
        id:         CompetitionId
        name:       Name
        category:   Category
        matchs:     MatchId[]
        dateFrom:   Date
        dateTo:     Date
    }) {
        return new this(id,name,category, matchs, dateFrom, dateTo)
    }

    get id(): CompetitionId {
        return this._id
    }

    get name(): Name {
        return this._name
    }

    get category(): Category {
        return this._category
    }

    get matchs(): MatchId[] {
        return this._matchs
    }

    get dateFrom(): Date {
        return this._dateFrom
    }

    get dateTo(): Date {
        return this._dateTo
    }
}




