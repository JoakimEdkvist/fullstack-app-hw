import { useEffect, useState } from 'react'
import { Hamster } from '../models/Hamster'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons'
import '../styles/Compete.css'
import CompetingHamster from './CompetingHamster'

const Compete = () => {
  const [error, setError] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [firstRandomHamster, setFirstRandomHamster] = useState<Hamster>()
  const [secondRandomHamster, setSecondRandomHamster] = useState<Hamster>()
  const [firstIsWinner, setFirstIsWinner] = useState<boolean>(false)
  const [secondIsWinner, setSecondIsWinner] = useState<boolean>(false)

  useEffect(() => {
    getFirstHamster()
    getSecondHamster()
  }, [])

  function getFirstHamster() {
    fetch(`https://hamsterwars-bend.herokuapp.com/hamsters/random`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setFirstRandomHamster(result)
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

  function getSecondHamster() {
    fetch(`https://hamsterwars-bend.herokuapp.com/hamsters/random`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setSecondRandomHamster(result)
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

  function handleFirstIsWinner(value: boolean) {
    setFirstIsWinner(value)
    console.log(
      `${firstRandomHamster?.name} vann denn fighten, ${secondRandomHamster?.name} förlorade!`
    )

    //efter uppdaterings post fetch
    // setFirstIsWinner(false)
    // setSecondIsWinner(false)
  }
  function handleSecondIsWinner(value: boolean) {
    setSecondIsWinner(value)
    console.log(
      `${secondRandomHamster?.name} vann denn fighten, ${firstRandomHamster?.name} förlorade!`
    )

    //efter uppdaterings post fetch
    // setFirstIsWinner(false)
    // setSecondIsWinner(false)
  }

  return (
    <div className="Compete">
      <div className="fight-container">
        {firstRandomHamster ? (
          <div className="first-hamster">
            <CompetingHamster
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
              setWinner={handleSecondIsWinner}
              hamster={secondRandomHamster}
            />
          </div>
        ) : (
          <h2>Vi letar efter din andra hamster åt dig!</h2>
        )}
      </div>
      <div>
        <h2>Hej</h2>
        <section className="button-container">
          <FontAwesomeIcon icon={faFireFlameCurved} size="lg" />
        </section>
        <p>
          Använd knappen för att rösta på den som du tycker förtjänar att vinna!
        </p>
      </div>
    </div>
  )
}
export default Compete
