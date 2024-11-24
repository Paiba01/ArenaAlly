import { Result } from 'neverthrow'
import { NotFoundUser } from '../exceptions/not-found'
import UserId from '../models/id'
import User from '../models/user'

type Users = {
  create(User: User): Promise<void>
  edit(User: User): Promise<void>
  find(id: UserId): Promise<Result<void, NotFoundUser>>
}

const Users = 'Users'

export default Users