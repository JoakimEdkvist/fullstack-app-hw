import { OneMatch } from '../models/OneMatch'
import { fixUrl } from '../utils'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Hamster } from '../models/Hamster'
import Match from './Match'
import HamsterAtom from '../atoms/HamsterAtom'
import '../styles/History.css'

const History = () => {
  const [error, setError] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [matches, setMatches] = useState<OneMatch[]>()
  const [hamsters, setHamsters] = useRecoilState<Hamster[]>(HamsterAtom)
  const [matchToBeDeleted, setMatchToBeDeleted] = useState<OneMatch | null>(
    null
  )

  if (matchToBeDeleted !== null) {
    let newMatches = matches?.filter(
      (match) => match.id !== matchToBeDeleted.id
    )
    setMatches(newMatches)
    setMatchToBeDeleted(null)
  }

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
  const updateRecoilHamsters: () => Promise<void> = async () => {
    fetch(fixUrl(`/hamsters`))
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setError(null)
          setHamsters(result)
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
    updateRecoilHamsters()
    getData()
  }, [])

  // function handleDeletes(match: OneMatch) {
  //   console.log(match)
  //   return match
  //   // getData()
  // }

  return (
    <>
      {matches ? (
        <div className="History">
          <h1>Match historik</h1>
          {matches.map((match) => (
            <Match
              key={match.id}
              match={match}
              setMatchToBeDeleted={setMatchToBeDeleted}
            />
          ))}
        </div>
      ) : null}
    </>
  )
}
export default History
