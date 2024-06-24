import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { err, ok, Result } from 'neverthrow'

import ScopesFinder from '~/scope/application/services/finder'
import NotFoundScope from '~/scope/domain/exceptions/not-found'
import ScopeId from '~/scope/domain/models/id'
import ScopeDto from '~/scope/dto/response/scope'

import ScopeSchema from '../models/mongoose/schema'

@Injectable()
class MongooseScopesFinder implements ScopesFinder {
  constructor(
    @InjectModel(ScopeSchema.name)
    private readonly scopes: Model<ScopeSchema>,
  ) {}

  async find(id: ScopeId): Promise<Result<ScopeDto, NotFoundScope>> {
    const scope = await this.scopes.findById(id.value).exec()

    if (!scope) return err(NotFoundScope.withId(id.value))

    return ok(scope)
  }

  async getAll(): Promise<ScopeDto[]> {
    return await this.scopes.find().exec()
  }
}

export default MongooseScopesFinder
