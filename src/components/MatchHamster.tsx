import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Hamster } from '../models/Hamster'
import { fixUrl, fixImgSrcPath } from '../utils'
import HamsterAtom from '../atoms/HamsterAtom'
import '../styles/MatchHamster.css'

interface Props {
  hamsterId: string
}

const MatchHamster = ({ hamsterId }: Props) => {
  const [error, setError] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [hamsters, setHamsters] = useRecoilState<Hamster[]>(HamsterAtom)
  const [theHamster, setTheHamster] = useState<Hamster>()

  useEffect(() => {
    //hitta rätt hamster i hamsters i recoilstate
    let obj: Hamster | undefined = hamsters.find((h) => h.id === hamsterId)
    setTheHamster(obj)
  }, [])

  return (
    <div>
      {theHamster ? (
        <div className="match-hamster">
          <img
            className="image"
            src={fixImgSrcPath(theHamster.imgName)}
            alt="hamster image"
          />
          <h6>{theHamster.name}</h6>
        </div>
      ) : (
        <h2>
          Vi försökte hitta en hamster som ville tävla men något gick fel
          tyvärr, försök senare.
        </h2>
      )}
    </div>
  )
}

export default MatchHamster
