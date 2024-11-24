import { UsersFinder } from "../application/services/finder";
import Users from "../domain/services/users";
import { MongooseUsersFinder } from "./services/mongoose-finder";
import { MongooseUsers } from "./services/mongoose-users";

export const userProviders = [
  {
    provide: Users,
    useClass: MongooseUsers,
  },
  {
    provide: UsersFinder,
    useClass: MongooseUsersFinder,
  },
]