
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
    private _dateFrom:  Date
    private _dateTo:    Date


    private constructor(
        id:             CompetitionId,
        name:           Name,
        category:       Category,
        dateFrom:       Date,
        dateTo:         Date,
    ) {
        super()
        this._id            = id
        this._name          = name
        this._category      = category
        this._dateFrom      = dateFrom
        this._dateTo        = dateTo

    }

    static create({
        id,
        name,
        category,
        dateFrom,
        dateTo,
    }:{
        id:         CompetitionId
        name:       Name
        category:   Category
        dateFrom:   Date
        dateTo:     Date
    }) {
        return new this(id,name,category, dateFrom, dateTo)
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

    get dateFrom(): Date {
        return this._dateFrom
    }

    get dateTo(): Date {
        return this._dateTo
    }
}




