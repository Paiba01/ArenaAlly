import { MatchId } from "../models/id"
import Match from "../models/match"

type Matchs = {
    create(Match: Match): Promise<void>
    delete(id: MatchId): Promise<void>
    edit(Match: Match): Promise<void>
  }
  
  const Matchs = 'Matchs'
  
  export default Matchs