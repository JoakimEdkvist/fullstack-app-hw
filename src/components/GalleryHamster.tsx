import { useEffect, useState } from 'react'
import { Hamster } from '../models/Hamster'
import { fixUrl } from '../utils'
import '../styles/GalleryHamster.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleInfo,
  faComment,
  faFaceSadTear,
  faHand,
  faPlus,
  faSquareXmark,
  faXmark
} from '@fortawesome/free-solid-svg-icons'

interface Props {
  hamster: Hamster
  trackDeletes: (value: boolean) => void
}

const GalleryHamster = ({ hamster, trackDeletes }: Props) => {
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [enableDelete, setEnableDelete] = useState<boolean>(false)
  function hideorShow() {
    setIsClicked(!isClicked) // closing visible card
    setEnableDelete(false) // set delete checkbox unchecked when closing
  }

  function fixImgSrcPath(image: string) {
    if (image.startsWith('https')) {
      return image
    } else {
      return fixUrl(`/img/${image}`)
    }
  }

  const handleDelete = () => {
    fetch(fixUrl(`/hamsters/${hamster.id}`), {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    trackDeletes(true)
  }

  return (
    <div className="GalleryHamster">
      <li key={hamster.id} className="item">
        <img
          onClick={hideorShow}
          className="img"
          src={fixImgSrcPath(hamster.imgName)}
          alt="hamster poster"
        />
        <section className="hamster-information">
          <h3>{hamster.name}</h3>
        </section>
        {!isClicked ? (
          <span>
            <FontAwesomeIcon
              onClick={hideorShow}
              icon={faCircleInfo}
              size="lg"
            />
          </span>
        ) : null}
        {isClicked ? (
          <div className="info-container">
            <header onClick={hideorShow} className="hamster-information">
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
            <div className="delete-hamster-field">
              <input
                onChange={() => setEnableDelete(!enableDelete)}
                type="checkbox"
                name="delete-check"
              />
              <button onClick={handleDelete} disabled={!enableDelete}>
                Permanent Delete this hamster
              </button>
            </div>
          </div>
        ) : null}
      </li>
    </div>
  )
}

export default GalleryHamster
