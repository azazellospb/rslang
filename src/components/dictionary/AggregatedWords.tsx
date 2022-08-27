import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import getWordsData from '../redux/fetching'
import { useAppDispatch, useAppSelector } from '../redux/hooks/redux'
import { getHardWords } from '../redux/reducers/aggregatedSlice'
import { getUserWordArray } from '../redux/reducers/wordSlice'
import WordCard from './WordCard'
import styles from './WordsBunch.module.css'

export default function AggregatedWords() {
  const aggregatedHard = useAppSelector(getHardWords)
  // const userWords = useAppSelector(getUserWordArray)
  const toLoad = useSelector(getUserWordArray)
  const [, setReload] = useState(false)
  const dispatch = useAppDispatch()
  useEffect(() => {
    aggregatedHard.map((word) => {
      const id = word.wordId
      if (word.difficulty === 'hard') {
        dispatch(getWordsData(undefined, undefined, undefined, id))
      }
      return word
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  })
  // eslint-disable-next-line no-console
  return (
    <div className={styles.wordBlock}>
      {(toLoad.length === 0) && <span>Please add some words to see the list</span>}
      {toLoad.map((item) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <WordCard key={item.id + new Date().getTime()} obj={item} callback={setReload} />
      ))}
    </div>
  )
}
