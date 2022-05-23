import { useEffect, useState } from 'react'
import { fixUrl } from '../utils'
import { useRecoilState } from 'recoil'
import '../styles/Home.css'
import { Hamster } from '../models/Hamster'
import HamsterAtom from '../atoms/HamsterAtom'
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
  const [hamsters, setHamsters] = useRecoilState<Hamster[]>(HamsterAtom)

  const getData: () => Promise<void> = async () => {
    setIsLoaded(false)
    setError(null)
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
            let theCutestArr: Hamster[] = []
            theCutestArr.push(theCutestHamster)
            setCutestHamster(theCutestArr)
          } else {
            setCutestHamster(result)
          }
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }

  useEffect(() => {
    if (hamsters.length === 0) {
      fetch(fixUrl(`/hamsters`))
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true)
            setError(null)
            setHamsters(result)
          },
          (error) => {
            setIsLoaded(true)
            setError(error)
          }
        )
    }
    getData()
  }, [])

  return (
    <>
      {error ? (
        <div className="Home">
          Tyvärr, något gick snett. Vill du försöka hämta den bästa hamstern
          igen? <button onClick={getData}> Försök igen!</button>
        </div>
      ) : (
        <div className="Home">
          <h1>#1 HAMSTER</h1>

          {cutestHamster ? (
            <div className="cutest-section">
              {cutestHamster.map((hamster) => (
                <GalleryHamster key={hamster.id} hamster={hamster} />
              ))}
            </div>
          ) : (
            <div className="cutest-section">
              <div className="loader"></div>{' '}
              <h2>Vi försöker just nu hämta den bästa hamstern...</h2>
            </div>
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
            <section className="intro-text">
              <h2>Välkommen till Hamster-Wars</h2>
              <p>
                Hamster-Wars är ett spinoff projekt baserat på den tidigare
                webbsidan Kittenwar. Appen går ut på att man kan b.la
              </p>
              <ul>
                <li>Rösta på den hamster du gillar bäst!</li>
                <li>Lägg till din egen Hamster och tävla i Hamster-Wars!</li>
                <li>Spana in alla olika hamstrar som finns under Galleriet.</li>
                <li>
                  Topp 5 lista under Statistik för både Vinnare och Förlorare.
                </li>
                <li>Hitta alla matcher och resultat under Historik.</li>
                <li>Bli hyllad på första sidan om du är den bästa!</li>
              </ul>
              <p>
                Det har varit regler och betygskrav som ligger till grund för
                appens design och funktionalitet.
              </p>
              <section>
                <h5>Arbetsverktyg:</h5>
                <p>Express, Firestore, React, Typescript.</p>
              </section>
            </section>
          </div>
        </div>
      )}
    </>
  )
}

export default Home
