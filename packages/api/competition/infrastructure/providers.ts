
import Matchs from "~/match/domain/services/matchs";
import Competitions from "../domain/services/competitions";
import { MongooseCompetitions } from "./services/mongoose-competitions";
import { MongooseMatchs } from "~/match/infrastructure/services/mongoose-matchs";



export const competitionProviders = [
  {
    provide: Competitions,
    useClass: MongooseCompetitions,
  },
  {
    provide: Matchs,
    useClass: MongooseMatchs,
  },
]