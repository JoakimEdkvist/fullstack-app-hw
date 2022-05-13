import { SyntheticEvent, useState } from 'react'
import '../styles/GalleryForm.css'
import { useTransition, animated, config } from 'react-spring'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'

const GalleryForm = () => {
  const [name, setName] = useState<string>('')
  const [food, setFood] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [games, setGames] = useState<string>('')
  const [defeats, setDefeats] = useState<string>('')
  const [wins, setWins] = useState<string>('')
  const [imgName, setImgName] = useState<string>('')
  const [loves, setLoves] = useState<string>('')
  const [formVisible, setFormVisible] = useState<boolean>(false)

  const myTransition = useTransition(formVisible, {
    config: { duration: 300 },
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

  const [submitting, setSubmitting] = useState<boolean>(false)
  const handleSubmit = (event: SyntheticEvent) => {
    setSubmitting(true)
    let object = {
      name: name,
      food: food,
      age: age,
      games: games,
      defeats: defeats,
      wins: wins,
      imgName: imgName,
      loves: loves
    }
    console.log(object)

    event.preventDefault()

    // const requestOptions = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer my-token',
    //     'My-Custom-Header': 'Here comes a new hamster'
    //   },
    //   body: JSON.stringify(object)
    // }
    // fetch('https://hamsterwars-bend.herokuapp.com/hamsters', requestOptions)

    setTimeout(() => {
      setSubmitting(false)
      setFormVisible(!formVisible)
    }, 3000)
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
            <h3>Join Battle</h3>
          </animated.div>
        ) : (
          <animated.div style={style} className="GalleryForm">
            {submitting ? (
              <div className="submitted-form">{name} joined the battle!</div>
            ) : (
              <form className="form-container" onSubmit={handleSubmit}>
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
                  <h5>Namn:</h5>
                  <input
                    name="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Benny"
                    required
                  />
                </label>
                <label>
                  <h5>Favoritmat:</h5>
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
                  <h5> Ålder:</h5>
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
                  <h5>Antal tidigare matcher:</h5>
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
                  <h5>Vinster:</h5>
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
                  <h5>Förluster:</h5>
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
                  <h5>Bildlänk:</h5>
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
                  <h5>Favorit aktivitet:</h5>
                  <input
                    name="loves"
                    type="text"
                    value={loves}
                    onChange={(event) => setLoves(event.target.value)}
                    placeholder="Springa etc.."
                    required
                  />
                </label>

                <button type="submit">
                  Join the Battle! <br />
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
