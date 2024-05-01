import Match from "../models/match"

type Matchs = {
    create(Match: Match): Promise<void>
  }
  
  const Matchs = 'Matchs'
  
  export default Matchs