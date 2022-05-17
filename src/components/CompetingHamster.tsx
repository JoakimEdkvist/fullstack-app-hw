import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { fixUrl } from '../utils'
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
  haveVotedOrNot: boolean
}

const CompetingHamster = ({ hamster, setWinner, haveVotedOrNot }: Props) => {
  function handleVote() {
    setWinner(true)
  }

  function fixImgSrcPath(image: string) {
    if (image.startsWith('https')) {
      return image
    } else {
      return fixUrl(`/img/${image}`)
    }
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
            src={fixImgSrcPath(hamster.imgName)}
            alt="hamster poster"
          />
        </section>
        <section>
          <h5>Diet: {hamster.favFood}</h5>
          <span className="line"></span>
          <div>
            {haveVotedOrNot ? (
              <section>
                <h6>Age: {hamster.age}</h6>
                <h6>Wins: {hamster.wins}</h6>
                <h6>Defeats: {hamster.defeats}</h6>
              </section>
            ) : null}
            {!haveVotedOrNot ? (
              <section className="vote-section lower-card-sections">
                <p>Rösta på mig!</p>
                <section onClick={handleVote} className="button-container">
                  <FontAwesomeIcon icon={faFireFlameCurved} size="lg" />
                </section>
              </section>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  )
}

export default CompetingHamster
