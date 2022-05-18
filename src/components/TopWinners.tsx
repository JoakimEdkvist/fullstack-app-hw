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
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }
  useEffect(() => {
    getData()
  }, [])

  function handleDeletes(value: boolean) {
    getData()
  }

  return (
    <div>
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

export default TopWinners
