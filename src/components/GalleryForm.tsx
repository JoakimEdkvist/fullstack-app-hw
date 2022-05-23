import { SyntheticEvent, useState } from 'react'
import '../styles/GalleryForm.css'
import { useTransition, animated } from 'react-spring'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'
import { fixUrl } from '../utils'

interface Props {
  setHaveJoined: (value: boolean) => void
}

const GalleryForm = ({ setHaveJoined }: Props) => {
  const [name, setName] = useState<string>('')
  const [food, setFood] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [games, setGames] = useState<string>('')
  const [defeats, setDefeats] = useState<string>('')
  const [wins, setWins] = useState<string>('')
  const [imgName, setImgName] = useState<string>('')
  const [loves, setLoves] = useState<string>('')
  const [formVisible, setFormVisible] = useState<boolean>(false)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const myTransition = useTransition(formVisible, {
    config: { duration: 500 },
    from: {
      x: 0,
      y: -50,
      opacity: 0
    },
    enter: {
      x: 1,
      y: 1,
      opacity: 1
    },
    leave: {
      x: 0,
      y: -50,
      opacity: 0
    }
  })

  let newHamster = {
    name: name,
    age: Number(age),
    favFood: food,
    games: Number(games),
    defeats: Number(defeats),
    wins: Number(wins),
    imgName: imgName,
    loves: loves
  }

  function urlLeadsToImage(url: string) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
  }

  const nameIsValid = newHamster.name !== ''
  const foodIsValid = newHamster.favFood !== ''
  const ageIsValid = newHamster.age >= 0 && age !== ''
  const gamesIsValid = newHamster.games >= 0 && games !== ''
  const defeatsIsValid = newHamster.defeats >= 0 && defeats !== ''
  const winsIsValid = newHamster.wins >= 0 && wins !== ''
  const imgNameIsValid =
    urlLeadsToImage(newHamster.imgName) && imgName.startsWith('http')
  const lovesIsValid = newHamster.loves !== ''
  const formIsValid =
    nameIsValid &&
    foodIsValid &&
    ageIsValid &&
    gamesIsValid &&
    defeatsIsValid &&
    winsIsValid &&
    imgNameIsValid &&
    lovesIsValid

  function handleSubmit() {
    fetch(fixUrl('/hamsters'), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newHamster)
    })
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setFormVisible(!formVisible)
    }, 3000)
    setHaveJoined(true)
  }
  return (
    <>
      {myTransition((style, formVisible) =>
        !formVisible ? (
          <animated.div
            style={style}
            onClick={() => setFormVisible(!formVisible)}
            className="showFormButton"
          >
            <h3>Ny Hamster?</h3>
          </animated.div>
        ) : (
          <animated.div style={style} className="GalleryForm">
            {submitting ? (
              <div className="submitted-form">{name} har anslutit!</div>
            ) : (
              <form className="form-container">
                <section className="cross">
                  <FontAwesomeIcon
                    onClick={() => setFormVisible(false)}
                    icon={faXmark}
                  />
                </section>
                <section>
                  <h1>
                    <FontAwesomeIcon icon={faSkullCrossbones} />
                    Hamster
                  </h1>
                </section>
                <label>
                  <h5>
                    Namn: <br />
                    {!nameIsValid ? (
                      <span className="form-help-text">
                        vänligen fyll in ett namn
                      </span>
                    ) : null}
                  </h5>
                  <input
                    name="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="t.ex Benny"
                    required
                  />
                </label>
                <label>
                  <h5>
                    Favoritmat: <br />
                    {!foodIsValid ? (
                      <span className="form-help-text">
                        vänligen fyll in favoritmat
                      </span>
                    ) : null}
                  </h5>
                  <input
                    name="food"
                    type="text"
                    value={food}
                    onChange={(event) => setFood(event.target.value)}
                    placeholder="t.ex Pasta"
                    required
                  />
                </label>
                <label>
                  <h5>
                    Ålder: <br />
                    {!ageIsValid ? (
                      <span className="form-help-text">
                        vänligen fyll in din ålder
                      </span>
                    ) : null}
                  </h5>
                  <input
                    name="age"
                    type="text"
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                    placeholder="t.ex 11"
                    required
                  />
                </label>
                <label>
                  <h5>
                    Antal tidigare matcher: <br />
                    {!gamesIsValid ? (
                      <span className="form-help-text">
                        vänligen fyll in tidigare matcher
                      </span>
                    ) : null}
                  </h5>
                  <input
                    name="games"
                    type="text"
                    value={games}
                    onChange={(event) => setGames(event.target.value)}
                    placeholder="t.ex 2"
                    required
                  />
                </label>
                <label>
                  <h5>
                    Vinster: <br />
                    {!winsIsValid ? (
                      <span className="form-help-text">
                        vänligen fyll in tidigare vinster
                      </span>
                    ) : null}
                  </h5>
                  <input
                    name="wins"
                    type="text"
                    value={wins}
                    onChange={(event) => setWins(event.target.value)}
                    placeholder="t.ex 1"
                    required
                  />
                </label>
                <label>
                  <h5>
                    Förluster: <br />
                    {!defeatsIsValid ? (
                      <span className="form-help-text">
                        vänligen fyll in tidigare förluster
                      </span>
                    ) : null}
                  </h5>
                  <input
                    name="defeats"
                    type="text"
                    value={defeats}
                    onChange={(event) => setDefeats(event.target.value)}
                    placeholder="t.ex 1"
                    required
                  />
                </label>
                <label>
                  <h5>
                    Bildlänk: jpg,jpeg,png,webp,avif,gif,svg
                    <br />
                    {!imgNameIsValid ? (
                      <span className="form-help-text">
                        vänligen fyll in en https:// länk till din bild
                      </span>
                    ) : null}
                  </h5>
                  <input
                    name="imgName"
                    type="text"
                    value={imgName}
                    onChange={(event) => setImgName(event.target.value)}
                    placeholder="https://www.ab.se/1.png etc.."
                    required
                  />
                </label>
                <label>
                  <h5>
                    Favorit aktivitet: <br />
                    {!lovesIsValid ? (
                      <span className="form-help-text">
                        vänligen fyll in favoritaktivitet
                      </span>
                    ) : null}
                  </h5>
                  <input
                    name="loves"
                    type="text"
                    value={loves}
                    onChange={(event) => setLoves(event.target.value)}
                    placeholder="Springa etc.."
                    required
                  />
                </label>

                <button
                  disabled={!formIsValid}
                  onClick={handleSubmit}
                  type="submit"
                  className={`${formIsValid ? 'enabled-button' : ''}`}
                >
                  Lägg till Hamster! <br />
                  <FontAwesomeIcon icon={faSkullCrossbones} />
                </button>
              </form>
            )}
          </animated.div>
        )
      )}
    </>
  )
}

export default GalleryForm
