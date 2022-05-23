import { useState } from 'react'
import { Hamster } from '../models/Hamster'
import { OneMatch } from '../models/OneMatch'
import { fixUrl } from '../utils'
import '../styles/GalleryHamster.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleInfo,
  faPlus,
  faXmark
} from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil'
import HamsterAtom from '../atoms/HamsterAtom'
import WinningMatch from './WinningMatch'

interface Props {
  hamster: Hamster
}

const GalleryHamster = ({ hamster }: Props) => {
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [enableDelete, setEnableDelete] = useState<boolean>(false)
  const [openStats, setOpenStats] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [wonMatches, setWonMatches] = useState<OneMatch[] | null>(null)
  const [hamsters, setHamsters] = useRecoilState<Hamster[]>(HamsterAtom)

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

  function handleShowStats() {
    setOpenStats(!openStats)
    if (openStats === false) {
      fetch(fixUrl(`/matchWinners/${hamster.id}`))
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true)
            setError(null)
            console.log(result)
            setWonMatches(result)
          },
          (error) => {
            setIsLoaded(true)
            setError(error)
          }
        )
    } else {
      setError(null)
      setIsLoaded(false)
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

    let HamsterToBeDeleted = hamster.id
    let newHamsters = hamsters?.filter(
      (hamster) => hamster.id !== HamsterToBeDeleted
    )
    setHamsters(newHamsters)
  }
  //
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
          <span className="icon">
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
              <span className="icon">
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </header>
            <section>
              <p>
                {'"'}
                Jag är {hamster.age} år gammal och min favorit mat är{' '}
                {hamster.favFood}.{'"'}
              </p>
              <p>
                {'"'}I mitt liv har jag gått {hamster.games} matcher, av dessa
                har jag vunnit {hamster.wins} och förlorat {hamster.defeats}{' '}
                antal matcher.{'"'}
              </p>
            </section>
            <div className="delete-hamster-field">
              <section>
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
                  ta bort hamster
                </button>
              </section>
              <section className="open-statistics">
                <button onClick={handleShowStats}>
                  STATISTIK{'  '}
                  {!openStats ? (
                    <FontAwesomeIcon icon={faPlus} />
                  ) : (
                    <FontAwesomeIcon icon={faXmark} />
                  )}
                </button>
              </section>
            </div>
            {openStats ? (
              <div>
                {error ? (
                  <div className="error">
                    Tyvärr, det verkar som din hamster inte vunnit några
                    tidigare matcher.
                  </div>
                ) : null}
                {wonMatches !== null ? (
                  <div>
                    {wonMatches.map((match) => (
                      <WinningMatch key={match.id} match={match} />
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
      </li>
    </div>
  )
}

export default GalleryHamster
