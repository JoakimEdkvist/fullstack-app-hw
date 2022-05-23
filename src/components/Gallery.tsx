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
  const [haveJoined, setHaveJoined] = useState<boolean>(false)

  const getData: () => Promise<void> = async () => {
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
    setHaveJoined(false)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    getData()
  }, [haveJoined])

  return (
    <div className="Gallery">
      <GalleryForm setHaveJoined={setHaveJoined} />
      {hamsters ? (
        <div className="Grid">
          {hamsters.map((hamster) => (
            <GalleryHamster key={hamster.id} hamster={hamster} />
          ))}
        </div>
      ) : (
        <h2>
          Vi försökte hitta alla hamstrar men något gick fel tyvärr, försök
          senare.
        </h2>
      )}
    </div>
  )
}

export default Gallery
