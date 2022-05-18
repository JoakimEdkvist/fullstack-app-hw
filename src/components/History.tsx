import { OneMatch } from '../models/OneMatch'
import { fixUrl } from '../utils'
import { useEffect, useState } from 'react'
import Match from './Match'
import '../styles/History.css'

const History = () => {
  const [error, setError] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [matches, setMatches] = useState<OneMatch[]>()

  const getData: () => Promise<void> = async () => {
    fetch(fixUrl(`/matches`))
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setError(null)
          setMatches(result)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      {matches ? (
        <div className="History">
          {matches.map((match) => (
            <Match key={match.id} match={match} />
          ))}
        </div>
      ) : null}
    </>
  )
}
export default History
