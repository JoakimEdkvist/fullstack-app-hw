import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Hamster } from '../models/Hamster'
import '../styles/CompetingHamster.css'
import {
  faArrowPointer,
  faFire,
  faFireFlameCurved,
  faHeart,
  faPeopleGroup
} from '@fortawesome/free-solid-svg-icons'

interface Props {
  hamster: Hamster
  setWinner: (value: boolean) => void
}

const CompetingHamster = ({ hamster, setWinner }: Props) => {
  function handleVote() {
    setWinner(true)
  }

  return (
    <div className="Competing-hamster">
      <div>
        <section className="name-experience">
          <h3>{hamster.name}</h3>
          <div>
            <h6>Experience: {hamster.games}</h6>
          </div>
        </section>
        <section>
          <img
            className="img"
            src={`../../src/assets/images/` + hamster.imgName}
            alt="hamster poster"
          />
        </section>
        <section>
          <h5>Diet: {hamster.favFood}</h5>
          <span className="line"></span>
          <div className="lower-card-sections">
            <section>
              <h6>Age: {hamster.age}</h6>
              <h6>Wins: {hamster.wins}</h6>
              <h6>Defeats: {hamster.defeats}</h6>
            </section>
            <section className="vote-section">
              <section onClick={handleVote} className="button-container">
                <FontAwesomeIcon icon={faFireFlameCurved} size="lg" />
              </section>
            </section>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CompetingHamster
