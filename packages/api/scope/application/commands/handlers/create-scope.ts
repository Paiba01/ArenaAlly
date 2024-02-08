import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { err, ok, Result } from 'neverthrow'

import { InvalidId } from '~/shared/domain'

import InvalidScopeName from '../../../domain/exceptions/invalid-name'
import ScopeDescription from '../../../domain/models/description'
import ScopeId from '../../../domain/models/id'
import ScopeName from '../../../domain/models/name'
import Scope from '../../../domain/models/scope'
import Scopes from '../../../domain/services/scopes'
import CreateScope from '../create-scope'

@CommandHandler(CreateScope)
class CreateScopeHandler implements ICommandHandler {
  constructor(@Inject(Scopes) private readonly scopes: Scopes) {}

  async execute(
    command: CreateScope,
  ): Promise<Result<void, InvalidId | InvalidScopeName>> {
    const scopeId = ScopeId.fromString(command.id)
    if (scopeId.isErr()) return err(scopeId.error)

    const scopeName = ScopeName.fromString(command.name)
    if (scopeName.isErr()) return err(scopeName.error)

    const scopeDescription = ScopeDescription.fromString(command.description)

    const scope = Scope.create({
      description: scopeDescription,
      id: scopeId.value,
      name: scopeName.value,
    })

    return ok(await this.scopes.create(scope))
  }
}

export default CreateScopeHandler
