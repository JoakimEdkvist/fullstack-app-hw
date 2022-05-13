import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import '../styles/Gallery.css'
import { Hamster } from '../models/Hamster'
import HamsterAtom from '../atoms/HamsterAtom'
import GalleryHamster from './GalleryHamster'
import GalleryForm from './GalleryForm'

const Gallery = () => {
  const [error, setError] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [hamsters, setHamsters] = useRecoilState<Hamster[]>(HamsterAtom)

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(`https://hamsterwars-bend.herokuapp.com/hamsters`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setHamsters(result)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])

  return (
    <div className="Gallery">
      <GalleryForm />
      {hamsters ? (
        <div className="Grid">
          {hamsters.map((hamster) => (
            <GalleryHamster key={hamster.id} hamster={hamster} />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default Gallery
