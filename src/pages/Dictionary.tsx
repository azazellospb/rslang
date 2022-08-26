import React from 'react'
import { NavLink } from 'react-router-dom'
// import AggregatedWords from '../components/dictionary/AggregatedWords'
import WordsBunch from '../components/dictionary/WordsBunch'
import { useAppSelector } from '../components/redux/hooks/redux'
import { getUserName } from '../components/redux/reducers/userSlice'
import styles from './Dictionary.module.css'

export default function Dictionary() {
  const name = useAppSelector(getUserName)
  // const ref = useRef<HTMLAnchorElement>(null)
  // const ref2 = useRef<HTMLAnchorElement>(null)
  // const [wordtype, setWordType] = useState(true)
  // const handleClick = () => {
  //   setWordType(false)
  // }
  // const handleClick2 = () => {
  //   setWordType(true)
  // }
  // const element1 = ref.current!
  // const element2 = ref2.current!
  // element1.addEventListener('click', handleClick)
  // element2.addEventListener('click', handleClick2)
  // // useEffect(() => {
  // //   if (name) {
  // //     setWordType(false)
  // //   }
  // // }, [name, wordtype])
  return (
    <div className={styles.dictWrapper}>
      <h2>Dictionary page</h2>
      <ul>
        <NavLink to="/dictionary/0/0"><li>Section A1</li></NavLink>
        <NavLink to="/dictionary/1/0"><li>Section A2</li></NavLink>
        <NavLink to="/dictionary/2/0"><li>Section B1</li></NavLink>
        <NavLink to="/dictionary/3/0"><li>Section B2</li></NavLink>
        <NavLink to="/dictionary/4/0"><li>Section C1</li></NavLink>
        <NavLink to="/dictionary/5/0"><li>Section C2</li></NavLink>
        {name && <NavLink to="/dictionary/difficult"><li>Difficult words</li></NavLink>}
      </ul>
      <WordsBunch />
    </div>
  )
}
export interface WordObject {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}
