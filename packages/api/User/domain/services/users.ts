import UserId from '../models/id'
import User from '../models/user'

type Users = {
  create(User: User): Promise<void>
}

const Users = 'Users'

export default Users