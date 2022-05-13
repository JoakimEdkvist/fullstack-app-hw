import { atom, RecoilState } from 'recoil'

import { Hamster } from '../models/Hamster'

const HamsterAtom: RecoilState<Hamster[]> = atom({
  key: 'HamsterState', // any unique string
  default: [] as Hamster[] // this can also be an object with several values
})

export default HamsterAtom
