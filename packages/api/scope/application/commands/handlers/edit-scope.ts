import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { err, ok, Result } from 'neverthrow'

import InvalidScopeName from '~/scope/domain/exceptions/invalid-name'
import NotFoundScope from '~/scope/domain/exceptions/not-found'
import ScopeDescription from '~/scope/domain/models/description'
import ScopeName from '~/scope/domain/models/name'
import Scope from '~/scope/domain/models/scope'
import { InvalidId } from '~/shared/domain'

import ScopeId from '../../../domain/models/id'
import Scopes from '../../../domain/services/scopes'
import ScopesFinder from '../../services/finder'
import EditScope from '../edit-scope'

@CommandHandler(EditScope)
class EditScopeHandler implements ICommandHandler {
  constructor(
    @Inject(Scopes) private readonly scopes: Scopes,
    @Inject(ScopesFinder) private readonly scopesFinder: ScopesFinder,
  ) {}

  async execute(
    command: EditScope,
  ): Promise<Result<void, InvalidId | InvalidScopeName | NotFoundScope>> {
    const scopeId = ScopeId.fromString(command.id)
    if (scopeId.isErr()) return err(scopeId.error)

    const scope = await this.scopesFinder.find(scopeId.value)
    if (scope.isErr()) return err(scope.error)

    const scopeName = ScopeName.fromString(command.name)
    if (scopeName.isErr()) return err(scopeName.error)

    const scopeDescription = ScopeDescription.fromString(command.description)

    const editedScope = Scope.create({
      description: scopeDescription,
      id: scopeId.value,
      name: scopeName.value,
    })

    return ok(await this.scopes.edit(editedScope))
  }
}

export default EditScopeHandler
