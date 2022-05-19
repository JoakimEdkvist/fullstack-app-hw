import { useState } from 'react'
import { OneMatch } from '../models/OneMatch'
import { fixUrl } from '../utils'
import MatchHamster from './MatchHamster'
import '../styles/Match.css'

interface Props {
  match: OneMatch
  trackDeletes: (value: boolean) => void
}

const Match = ({ match, trackDeletes }: Props) => {
  const [enableDelete, setEnableDelete] = useState<boolean>(false)

  const handleDelete = () => {
    fetch(fixUrl(`/matches/${match.id}`), {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    trackDeletes(true)
  }

  return (
    <div className="Match">
      <div className="delete-match-field">
        <input
          onChange={() => setEnableDelete(!enableDelete)}
          type="checkbox"
          name="delete-check"
        />
        <button onClick={handleDelete} disabled={!enableDelete}>
          Permanent Delete this Match History
        </button>
      </div>
      <div className="Winner">
        <h5>Winner</h5>
        <MatchHamster hamsterId={match.winnerId} />
      </div>
      <span></span>
      <div className="Loser">
        <h5>Loser</h5>
        <MatchHamster hamsterId={match.loserId} />
      </div>
    </div>
  )
}

export default Match
