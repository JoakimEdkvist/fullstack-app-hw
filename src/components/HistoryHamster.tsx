import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Hamster } from '../models/Hamster'
import HamsterAtom from '../atoms/HamsterAtom'
interface Props {
  hamsterId: string
}

const HistoryHamster = ({ hamsterId }: Props) => {
  const [hamsters, setHamsters] = useRecoilState<Hamster[]>(HamsterAtom)
  // använd recoil state och rendera ut hamstrarna
  return <div>hej{hamsterId}</div>
}

export default HistoryHamster
