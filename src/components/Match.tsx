import { OneMatch } from '../models/OneMatch'
import HistoryHamster from './HistoryHamster'
import '../styles/Match.css'

interface Props {
  match: OneMatch
}

const Match = ({ match }: Props) => {
  return (
    <div className="Match">
      <div className="Winner">
        <h5>Winner</h5>
        <HistoryHamster hamsterId={match.winnerId} />
      </div>
      VS
      <div className="Loser">
        <h5>Loser</h5>
        <HistoryHamster hamsterId={match.loserId} />
      </div>
    </div>
  )
}

export default Match
