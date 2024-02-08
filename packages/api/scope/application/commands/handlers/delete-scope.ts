import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { err, ok, Result } from 'neverthrow'

import NotFoundScope from '~/scope/domain/exceptions/not-found'
import { InvalidId } from '~/shared/domain'

import ScopeId from '../../../domain/models/id'
import Scopes from '../../../domain/services/scopes'
import ScopesFinder from '../../services/finder'
import DeleteScope from '../delete-scope'

@CommandHandler(DeleteScope)
class DeleteScopeHandler implements ICommandHandler {
  constructor(
    @Inject(Scopes) private readonly scopes: Scopes,
    @Inject(ScopesFinder) private readonly scopesFinder: ScopesFinder,
  ) {}

  async execute(
    command: DeleteScope,
  ): Promise<Result<void, InvalidId | NotFoundScope>> {
    const scopeId = ScopeId.fromString(command.id)
    if (scopeId.isErr()) return err(scopeId.error)

    const scope = await this.scopesFinder.find(scopeId.value)
    if (scope.isErr()) return err(scope.error)

    return ok(await this.scopes.delete(scopeId.value))
  }
}

export default DeleteScopeHandler
