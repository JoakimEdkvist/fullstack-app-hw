import { useEffect, useState } from 'react'
import { fixUrl } from '../utils'
import { useRecoilState } from 'recoil'
import '../styles/Home.css'
import { Hamster } from '../models/Hamster'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowPointer,
  faFire,
  faHeart,
  faPeopleGroup
} from '@fortawesome/free-solid-svg-icons'
import GalleryHamster from './GalleryHamster'
import { Link } from 'react-router-dom'

const Home = () => {
  const [error, setError] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [cutestHamster, setCutestHamster] = useState<Hamster[]>()

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  const getData: () => Promise<void> = async () => {
    fetch(fixUrl(`/hamsters/cutest`))
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setError(null)
          // if there is more then 1 cutest hamster it picks 1 randomly of them.
          if (result.length > 1) {
            let theCutestHamster =
              result[Math.floor(Math.random() * result.length)]
            console.log(theCutestHamster)
            let theCutestArr: Hamster[] = []
            theCutestArr.push(theCutestHamster)
            setCutestHamster(theCutestArr)
          } else {
            setCutestHamster(result)
          }
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

  function handleDeletes(value: boolean) {
    getData()
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      {error ? (
        <div>
          Tyvärr, något gick snett. Vill du försöka hämta den bästa hamstern
          igen?
          <button onClick={getData}>Hämta igen!</button>
        </div>
      ) : (
        <div className="Home">
          <h1>#1 Ranked Hamster</h1>

          {cutestHamster ? (
            <div className="cutest-section">
              {cutestHamster.map((hamster) => (
                <GalleryHamster
                  key={hamster.id}
                  hamster={hamster}
                  trackDeletes={handleDeletes}
                />
              ))}
            </div>
          ) : (
            <h2>We are currently loading...</h2>
          )}
          <div className="introduction">
            <section className="intro-links">
              <span>
                <Link to="/gallery">
                  <FontAwesomeIcon icon={faPeopleGroup} size="lg" />
                  <h6>Spana in Galleriet</h6>
                </Link>
              </span>
              <span>
                <Link to="/gallery">
                  <FontAwesomeIcon icon={faArrowPointer} size="lg" />
                  <h6>Hitta din favorit</h6>
                </Link>
              </span>
              <span>
                <Link to="/competing">
                  <FontAwesomeIcon icon={faHeart} size="lg" />
                  <h6>Tävla</h6>
                </Link>
              </span>
              <span>
                <Link to="/competing">
                  <FontAwesomeIcon icon={faFire} size="lg" />
                  <h6>Bli den hetaste Hamstern</h6>
                </Link>
              </span>
            </section>
            <section>
              <p>
                This is Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ullam quod dolores, non aperiam iusto quas maiores voluptas.
                Corporis eaque inventore iste voluptatem quae ullam minima
                tempore reprehenderit neque. Quia sit similique, quaerat
                aspernatur facere repellendus itaque, laboriosam blanditiis
                beatae non dolorum odit soluta sed accusamus exercitationem,
                velit nostrum voluptatem suscipit! Temporibus, voluptas!
                Consequatur aliquam iure sapiente architecto, quaerat tenetur at
                adipisci quo in suscipit possimus nemo ex modi, ducimus magnam
                magni laudantium maxime inventore. Voluptas officia corrupti
                vitae voluptatem dolore adipisci quibusdam dicta! Harum
                aspernatur inventore quas porro optio id nihil dicta, ipsum
                error laborum quo voluptatem, sunt tempore nemo!
              </p>
            </section>
          </div>
        </div>
      )}
    </>
  )
}

export default Home
