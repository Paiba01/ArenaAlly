import Users from "../domain/services/users";
import { MongooseUsers } from "./services/mongoose-users";

export const userProviders = [
  {
    provide: Users,
    useClass: MongooseUsers,
  }
]