import { useEffect, useState } from 'react'
import { Hamster } from '../models/Hamster'
import { fixUrl } from '../utils'
import '../styles/GalleryHamster.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleInfo,
  faComment,
  faHand,
  faPlus,
  faXmark
} from '@fortawesome/free-solid-svg-icons'

interface Props {
  hamster: Hamster
}

const GalleryHamster = ({ hamster }: Props) => {
  const [isClicked, setIsClicked] = useState<boolean>(false)
  function hideorShow() {
    setIsClicked(!isClicked)
  }
  return (
    <div onClick={hideorShow} className="GalleryHamster">
      <li key={hamster.id} className="item">
        <img
          className="img"
          src={fixUrl(`/img/${hamster.imgName}`)}
          alt="hamster poster"
        />
        <section className="hamster-information">
          <h3>{hamster.name}</h3>
        </section>
        {!isClicked ? (
          <span>
            <FontAwesomeIcon icon={faCircleInfo} size="lg" />
          </span>
        ) : null}
        {isClicked ? (
          <div onClick={hideorShow} className="info-container">
            <header className="hamster-information">
              <h5>{hamster.name}</h5>
              <span>
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </header>
            <section>
              <p>
                Jag är {hamster.age} år gammal och min favorit mat är{' '}
                {hamster.favFood}.
              </p>
              <p>
                I mitt liv har jag gått {hamster.games} matcher, av dessa har
                jag vunnit {hamster.wins} och förlorat {hamster.defeats} antal
                matcher.
              </p>
            </section>
          </div>
        ) : null}
      </li>
    </div>
  )
}

export default GalleryHamster
