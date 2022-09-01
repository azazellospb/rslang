import React, { useEffect, useState } from 'react'
import { aggregateHardWords } from '../redux/fetching'
import { useAppDispatch, useAppSelector } from '../redux/hooks/redux'
import { getHardWords } from '../redux/reducers/aggregatedSlice'
import WordCard from './WordCard'

import styles from './WordsBunch.module.css'

export default function AggregatedWords() {
  const aggregatedHard = useAppSelector(getHardWords)
  const dispatch = useAppDispatch()
  const [, setReload] = useState(false)
  useEffect(() => {
    dispatch(aggregateHardWords())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <div className={styles.wordBlock}>
      {(aggregatedHard.length === 0) && <span>Please add some words to see the list</span>}
      {aggregatedHard.map((item) => (
        // eslint-disable-next-line react/jsx-props-no-spreading, no-underscore-dangle
        <WordCard key={item._id + new Date().getTime()} callback={setReload} id={item._id} reg="hardWords" />
      ))}
    </div>
  )
}
