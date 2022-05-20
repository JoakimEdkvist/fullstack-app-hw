import { OneMatch } from '../models/OneMatch'
import { Hamster } from '../models/Hamster'
import HamsterAtom from '../atoms/HamsterAtom'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import '../styles/WinningMatch.css'

interface Props {
  match: OneMatch
}

const WinningMatch = ({ match }: Props) => {
  const [hamsters, setHamsters] = useRecoilState<Hamster[]>(HamsterAtom)
  const [winner, setWinner] = useState<Hamster | undefined>()
  const [loser, setLoser] = useState<Hamster | undefined>()

  useEffect(() => {
    let winner: Hamster | undefined = hamsters.find(
      (h) => h.id === match.winnerId
    )
    setWinner(winner)
    let loser: Hamster | undefined = hamsters.find(
      (h) => h.id === match.loserId
    )
    setLoser(loser)
  }, [])

  return (
    <div className="winning-match">
      <h5 className="winner">{winner?.name}</h5>
      <p>VS</p>
      <h5 className="loser">{loser?.name}</h5>
    </div>
  )
}

export default WinningMatch
