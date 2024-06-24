import { AggregateRoot } from '@nestjs/cqrs'

import ScopeDescription from './description'
import ScopeId from './id'
import ScopeName from './name'

class Scope extends AggregateRoot {
  private _id: ScopeId
  private _description: ScopeDescription
  private _name: ScopeName

  private constructor(
    description: ScopeDescription,
    id: ScopeId,
    name: ScopeName,
  ) {
    super()

    this._description = description
    this._id = id
    this._name = name
  }

  static create({
    description,
    id,
    name,
  }: {
    description: ScopeDescription
    id: ScopeId
    name: ScopeName
  }) {
    return new this(description, id, name)
  }

  get description(): ScopeDescription {
    return this._description
  }

  get id(): ScopeId {
    return this._id
  }

  get name(): ScopeName {
    return this._name
  }
}

export default Scope
