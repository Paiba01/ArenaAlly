import { Prop, Schema } from '@nestjs/mongoose'

import Scope from '~/scope/domain/models/scope'

@Schema({ versionKey: false })
class ScopeSchema {
  @Prop()
  readonly _id: string

  @Prop()
  readonly description: string

  @Prop()
  readonly name: string

  constructor(
    _id: ScopeSchema['_id'],
    description: ScopeSchema['description'],
    name: ScopeSchema['name'],
  ) {
    this._id = _id
    this.description = description
    this.name = name
  }

  static fromScope({ description, id, name }: Scope) {
    return new this(id.value, name.value, description.value)
  }
}

export default ScopeSchema
