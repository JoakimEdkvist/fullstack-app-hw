import { useState } from 'react'
import { OneMatch } from '../models/OneMatch'
import { fixUrl } from '../utils'
import MatchHamster from './MatchHamster'
import '../styles/Match.css'
import { MatchProp } from 'react-spring'

interface Props {
  match: OneMatch
  setMatchToBeDeleted: (match: OneMatch) => void
}

const Match = ({ match, setMatchToBeDeleted }: Props) => {
  const [enableDelete, setEnableDelete] = useState<boolean>(false)

  const handleDelete = () => {
    setMatchToBeDeleted(match) // ta bort matchen lokalt i matcher
    fetch(fixUrl(`/matches/${match.id}`), {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  return (
    <div className="Match">
      <div className="delete-match-field">
        <input
          onChange={() => setEnableDelete(!enableDelete)}
          type="checkbox"
          name="delete-check"
        />
        <button
          className={enableDelete ? 'delete-btn' : ''}
          onClick={handleDelete}
          disabled={!enableDelete}
        >
          Radera Match
        </button>
      </div>
      <section>
        <div className="Winner">
          <h5>Vinnare</h5>
          <MatchHamster hamsterId={match.winnerId} />
        </div>
        <span></span>
        <div className="Loser">
          <h5>Förlorare</h5>
          <MatchHamster hamsterId={match.loserId} />
        </div>
      </section>
    </div>
  )
}

export default Match
