import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fixUrl } from '../utils'
import { Hamster } from '../models/Hamster'
import '../styles/CompetingHamster.css'
import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons'

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
            <h6>Matcher: {hamster.games}</h6>
          </div>
        </section>
        <section>
          <img
            className="img"
            src={fixImgSrcPath(hamster.imgName)}
            alt="hamster poster"
          />
        </section>
        <section className="info">
          <h5>Diet: {hamster.favFood}</h5>
          <span className="line"></span>
          <div>
            {haveVotedOrNot ? (
              <section>
                <h4>Ålder: {hamster.age}</h4>
                <h4>Vinster: {hamster.wins}</h4>
                <h4>Förluster: {hamster.defeats}</h4>
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
