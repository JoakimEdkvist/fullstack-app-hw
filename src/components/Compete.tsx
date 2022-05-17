import { useEffect, useState } from 'react'
import { Hamster } from '../models/Hamster'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAnglesRight,
  faFireFlameCurved
} from '@fortawesome/free-solid-svg-icons'
import { fixUrl } from '../utils'
import '../styles/Compete.css'
import CompetingHamster from './CompetingHamster'
import { Link } from 'react-router-dom'

const Compete = () => {
  const [error, setError] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [firstRandomHamster, setFirstRandomHamster] = useState<Hamster>()
  const [secondRandomHamster, setSecondRandomHamster] = useState<Hamster>()
  const [firstIsWinner, setFirstIsWinner] = useState<boolean>(false)
  const [secondIsWinner, setSecondIsWinner] = useState<boolean>(false)
  const [haveVoted, setHaveVoted] = useState<boolean>(false)

  useEffect(() => {
    getFirstHamster()
    getSecondHamster()
  }, [])

  function handleFinishedVoting() {
    getFirstHamster()
    getSecondHamster()
    setHaveVoted(false)
  }

  const getFirstHamster: () => Promise<void> = async () => {
    fetch(fixUrl(`/hamsters/random`))
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setFirstRandomHamster(result)
          setFirstIsWinner(false)
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

  const getSecondHamster: () => Promise<void> = async () => {
    fetch(fixUrl(`/hamsters/random`))
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          if (result.id === firstRandomHamster?.id) getSecondHamster()
          else {
            setSecondRandomHamster(result)
            setSecondIsWinner(false)
          }
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }

  function handleFirstIsWinner(value: boolean) {
    setSecondIsWinner(false)
    setFirstIsWinner(true)
    if (secondRandomHamster !== undefined) {
      let updatedHamster = {
        ...secondRandomHamster,
        defeats: secondRandomHamster.defeats + 1,
        games: secondRandomHamster.games + 1
      }
      setSecondRandomHamster(updatedHamster)
      //uppdaterar den lokala hamstern innan jag uppdaterar firestore

      fetch(fixUrl(`/hamsters/${secondRandomHamster?.id}`), {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedHamster)
      })
    }

    if (firstRandomHamster !== undefined) {
      let updatedHamster = {
        ...firstRandomHamster,
        wins: firstRandomHamster.wins + 1,
        games: firstRandomHamster.games + 1
      }
      setFirstRandomHamster(updatedHamster)
      fetch(fixUrl(`/hamsters/${firstRandomHamster?.id}`), {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedHamster)
      })
    }

    postMatchResultFirstWinner()
    setHaveVoted(true)

    //efter uppdaterings post fetch
    // setFirstIsWinner(false)
    // setSecondIsWinner(false)
  }
  function handleSecondIsWinner(value: boolean) {
    setFirstIsWinner(false)
    setSecondIsWinner(true)
    if (secondRandomHamster !== undefined) {
      let updatedHamster = {
        ...secondRandomHamster,
        wins: secondRandomHamster.wins + 1,
        games: secondRandomHamster.games + 1
      }
      setSecondRandomHamster(updatedHamster)
      fetch(fixUrl(`/hamsters/${secondRandomHamster?.id}`), {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedHamster)
      })
    }

    if (firstRandomHamster !== undefined) {
      let updatedHamster = {
        ...firstRandomHamster,
        defeats: firstRandomHamster.defeats + 1,
        games: firstRandomHamster.games + 1
      }
      setFirstRandomHamster(updatedHamster)
      fetch(fixUrl(`/hamsters/${firstRandomHamster?.id}`), {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedHamster)
      })
    }

    postMatchResultSecondWinner()
    setHaveVoted(true)

    //efter uppdaterings post fetch
    // setFirstIsWinner(false)
    // setSecondIsWinner(false)
  }

  function postMatchResultFirstWinner() {
    fetch(fixUrl('/matches'), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        loserId: secondRandomHamster?.id,
        winnerId: firstRandomHamster?.id
      })
    })
  }

  function postMatchResultSecondWinner() {
    fetch(fixUrl('/matches'), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        loserId: firstRandomHamster?.id,
        winnerId: secondRandomHamster?.id
      })
    })
  }

  return (
    <>
      {haveVoted && firstRandomHamster && secondRandomHamster ? (
        <div className="after-vote-container ">
          <div className="hamsters-after-vote">
            {firstIsWinner && (
              <>
                <div className="winner">
                  <h1>The Winner is</h1>
                  <CompetingHamster
                    haveVotedOrNot={haveVoted}
                    setWinner={handleFirstIsWinner}
                    hamster={firstRandomHamster}
                  />
                </div>
                <div className="loser">
                  <h1>The Loser is</h1>
                  <CompetingHamster
                    haveVotedOrNot={haveVoted}
                    setWinner={handleSecondIsWinner}
                    hamster={secondRandomHamster}
                  />
                </div>
              </>
            )}
            {secondIsWinner && (
              <>
                <div className="winner">
                  <h1>The Winner is</h1>
                  <CompetingHamster
                    haveVotedOrNot={haveVoted}
                    setWinner={handleSecondIsWinner}
                    hamster={secondRandomHamster}
                  />
                </div>
                <div className="loser">
                  <h1>The Loser is</h1>
                  <CompetingHamster
                    haveVotedOrNot={haveVoted}
                    setWinner={handleFirstIsWinner}
                    hamster={firstRandomHamster}
                  />
                </div>
              </>
            )}
          </div>
          <div className="last-section">
            <h5>Vill du rösta på fler champions?</h5>
            <section className="buttons-last-section">
              <button
                onClick={handleFinishedVoting}
                className="button-container yes"
              >
                JA
              </button>
              <Link onClick={handleFinishedVoting} to="/">
                Nej, tillbaka till start.{' '}
                <FontAwesomeIcon icon={faAnglesRight} size="lg" />
              </Link>
            </section>
          </div>
        </div>
      ) : (
        <div className="Compete">
          <div className="fight-container">
            {firstRandomHamster ? (
              <div className="first-hamster">
                <CompetingHamster
                  haveVotedOrNot={haveVoted}
                  setWinner={handleFirstIsWinner}
                  hamster={firstRandomHamster}
                />
              </div>
            ) : (
              <h2>Vi letar efter din första hamster åt dig!</h2>
            )}
            <h1 className="vs">VS</h1>

            {secondRandomHamster ? (
              <div className="second-hamster">
                <CompetingHamster
                  haveVotedOrNot={haveVoted}
                  setWinner={handleSecondIsWinner}
                  hamster={secondRandomHamster}
                />
              </div>
            ) : (
              <h2>Vi letar efter din andra hamster åt dig!</h2>
            )}
          </div>
          <div className="instructions">
            <h2>Instruktioner</h2>
            <p>
              Klicka på respektive knapp för att rösta på den hamster som du
              tycker förtjänar att vinna!
            </p>
            <section className="button-container">
              <FontAwesomeIcon icon={faFireFlameCurved} size="lg" />
            </section>
          </div>
        </div>
      )}
    </>
  )
}
export default Compete
