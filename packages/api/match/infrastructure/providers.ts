import Matchs from "../domain/services/matchs";
import { MongooseMatchs } from "./services/mongoose-matchs";


export const matchProviders = [
  {
    provide: Matchs,
    useClass: MongooseMatchs,
  },
]