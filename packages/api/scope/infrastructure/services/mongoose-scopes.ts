import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import ScopeId from '~/scope/domain/models/id'
import Scope from '~/scope/domain/models/scope'
import Scopes from '~/scope/domain/services/scopes'

import ScopeSchema from '../models/mongoose/schema'

class MongooseScopes implements Scopes {
  constructor(
    @InjectModel(ScopeSchema.name)
    private readonly scopes: Model<ScopeSchema>,
  ) {}

  async create(scope: Scope): Promise<void> {
    await this.scopes.create(ScopeSchema.fromScope(scope))
  }

  async delete(id: ScopeId): Promise<void> {
    await this.scopes.deleteOne({ _id: id.value }).lean().exec()
  }

  async edit(scope: Scope): Promise<void> {
    await this.scopes
      .updateOne(
        { _id: scope.id.value },
        { description: scope.description.value, name: scope.name.value },
      )
      .lean()
      .exec()
  }
}

export default MongooseScopes
