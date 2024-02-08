import { Result } from 'neverthrow'

import NotFoundScope from '~/scope/domain/exceptions/not-found'
import ScopeId from '~/scope/domain/models/id'
import ScopeDto from '~/scope/dto/response/scope'

type ScopesFinder = {
  find(id: ScopeId): Promise<Result<ScopeDto, NotFoundScope>>
  getAll(): Promise<ScopeDto[]>
}

const ScopesFinder = 'SCOPES_FINDER'

export default ScopesFinder
