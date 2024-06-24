import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import ScopeDto from '~/scope/dto/response/scope'

import ScopesFinder from '../../services/finder'
import GetScopes from '../get-scopes'

@QueryHandler(GetScopes)
class GetScopesHandler implements IQueryHandler {
  constructor(
    @Inject(ScopesFinder) private readonly scopesFinder: ScopesFinder,
  ) {}

  async execute(): Promise<ScopeDto[]> {
    return await this.scopesFinder.getAll()
  }
}

export default GetScopesHandler
