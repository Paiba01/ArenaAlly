import ScopesFinder from '../application/services/finder'
import Scopes from '../domain/services/scopes'
import MongooseScopesFinder from './services/mongoose-finder'
import MongooseScopes from './services/mongoose-scopes'

const scopeProviders = [
  {
    provide: Scopes,
    useClass: MongooseScopes,
  },
  {
    provide: ScopesFinder,
    useClass: MongooseScopesFinder,
  },
]

export default scopeProviders
