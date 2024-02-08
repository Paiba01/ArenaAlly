import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { err, Result } from 'neverthrow'

import NotFoundScope from '~/scope/domain/exceptions/not-found'
import ScopeId from '~/scope/domain/models/id'
import ScopeDto from '~/scope/dto/response/scope'
import { InvalidId } from '~/shared/domain'

import ScopesFinder from '../../services/finder'
import GetScope from '../get-scope'

@QueryHandler(GetScope)
class GetScopeHandler implements IQueryHandler {
  constructor(
    @Inject(ScopesFinder) private readonly scopesFinder: ScopesFinder,
  ) {}

  async execute(
    query: GetScope,
  ): Promise<Result<ScopeDto, InvalidId | NotFoundScope>> {
    const scopeId = ScopeId.fromString(query.id)
    if (scopeId.isErr()) return err(scopeId.error)

    return await this.scopesFinder.find(scopeId.value)
  }
}

export default GetScopeHandler
