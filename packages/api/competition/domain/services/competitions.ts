import { Competition } from "../models/competition"
import { CompetitionId } from "../models/id"


type Competitions = {
    create(Competition: Competition): Promise<void>
    delete(id: CompetitionId): Promise<void>
  }
  
  const Competitions = 'Competitions'
  
export default Competitions