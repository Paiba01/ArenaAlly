import Users from "~/user/domain/services/users";
import MatchsFinder from "../application/services/finder";
import Matchs from "../domain/services/matchs";
import { MongooseMatchsFinder } from "./services/mongoose-finder";
import { MongooseMatchs } from "./services/mongoose-matchs";
import { MongooseUsers } from "~/user/infrastructure/services/mongoose-users";


export const matchProviders = [
  {
    provide: Matchs,
    useClass: MongooseMatchs,
  },
  {
    provide: MatchsFinder,
    useClass: MongooseMatchsFinder,
  },
  {
    provide: Users,
    useClass: MongooseUsers,
  },
]