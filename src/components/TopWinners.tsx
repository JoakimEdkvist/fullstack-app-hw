import { Hamster } from '../models/Hamster'
import { fixUrl } from '../utils'
import { useEffect, useState } from 'react'
import GalleryHamster from './GalleryHamster'

const TopWinners = () => {
  const [error, setError] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [hamsters, setHamsters] = useState<Hamster[]>()
  const getData: () => Promise<void> = async () => {
    fetch(fixUrl(`/winners`))
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
  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      {hamsters ? (
        <div className="Grid">
          {hamsters.map((hamster) => (
            <GalleryHamster key={hamster.id} hamster={hamster} />
          ))}
        </div>
      ) : (
        <h2>
          Vi försökte hitta de 5 bästa vinnarna men något gick fel tyvärr,
          försök senare.
        </h2>
      )}
    </div>
  )
}

export default TopWinners
