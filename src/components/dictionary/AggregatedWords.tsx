/* eslint-disable no-template-curly-in-string */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import getWordsData from '../redux/fetching'
import { useAppDispatch, useAppSelector } from '../redux/hooks/redux'
import { getHardWords } from '../redux/reducers/aggregatedSlice'
import { getUserWordArray } from '../redux/reducers/wordSlice'
import WordCard from './WordCard'
import styles from './WordsBunch.module.css'

export default function AggregatedWords() {
  const aggregatedHard = useAppSelector(getHardWords)
  const userWords = useAppSelector(getUserWordArray)
  const toLoad = useSelector(getUserWordArray)
  const dispatch = useAppDispatch()
  useEffect(() => {
    aggregatedHard.map((word) => {
      const id = word.wordId
      if (word.difficulty === 'hard') {
        dispatch(getWordsData(undefined, undefined, undefined, id))
        // const wordTodel = toLoad.filter((word1) => word1.id === word)[0]
        // dispatch(deleteUserWord(wordTodel))
      }
      return word
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aggregatedHard, userWords])
  return (
    <div className={styles.wordBlock}>
      {toLoad.map((item) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <WordCard {...item} />
      ))}
    </div>
  )
}
