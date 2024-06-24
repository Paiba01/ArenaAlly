import ScopeId from '../models/id'
import Scope from '../models/scope'

type Scopes = {
  create(scope: Scope): Promise<void>
  delete(id: ScopeId): Promise<void>
  edit(scope: Scope): Promise<void>
}

const Scopes = 'Scopes'

export default Scopes
