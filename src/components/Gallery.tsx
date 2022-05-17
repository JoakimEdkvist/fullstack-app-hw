import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import '../styles/Gallery.css'
import { Hamster } from '../models/Hamster'
import { fixUrl } from '../utils'
import HamsterAtom from '../atoms/HamsterAtom'
import GalleryHamster from './GalleryHamster'
import GalleryForm from './GalleryForm'

const Gallery = () => {
  const [error, setError] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [hamsters, setHamsters] = useRecoilState<Hamster[]>(HamsterAtom)

  const getData: () => Promise<void> = async () => {
    fetch(fixUrl(`/hamsters`))
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setError(null)
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
  }

  function handleDeletes(value: boolean) {
    getData()
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="Gallery">
      <GalleryForm />
      {hamsters ? (
        <div className="Grid">
          {hamsters.map((hamster) => (
            <GalleryHamster
              key={hamster.id}
              hamster={hamster}
              trackDeletes={handleDeletes}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default Gallery
