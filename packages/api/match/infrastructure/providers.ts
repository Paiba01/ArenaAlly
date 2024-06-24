import MatchsFinder from "../application/services/finder";
import Matchs from "../domain/services/matchs";
import { MongooseMatchsFinder } from "./services/mongoose-finder";
import { MongooseMatchs } from "./services/mongoose-matchs";


export const matchProviders = [
  {
    provide: Matchs,
    useClass: MongooseMatchs,
  },
  {
    provide: MatchsFinder,
    useClass: MongooseMatchsFinder,
  },
]