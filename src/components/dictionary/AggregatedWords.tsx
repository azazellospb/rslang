import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { aggregateHardWords } from '../redux/fetching'
import { useAppDispatch, useAppSelector } from '../redux/hooks/redux'
import { getHardWords } from '../redux/reducers/aggregatedSlice'
import WordCard from './WordCard'

import styles from './WordsBunch.module.css'

export default function AggregatedWords() {
  const aggregatedHard = useAppSelector(getHardWords)

  // сортировка по алфавиту в result
  // const mapped = aggregatedHard.map((el, i) => ({ index: i, value: el.word.toLowerCase() }))
  // mapped.sort((a, b) => {
  //   if (a.value > b.value) { return 1 }
  //   if (a.value < b.value) { return -1 }
  //   return 0
  // })
  const isHardPage = useLocation().pathname.split('/')[2] === 'difficult'
  // const result = mapped.map((el) => aggregatedHard[el.index])
  const dispatch = useAppDispatch()
  const [, setReload] = useState(false)
  useEffect(() => {
    dispatch(aggregateHardWords())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <div className={`${styles.wordBlock} ${isHardPage && styles.wordBlockHard}`}>
      {(aggregatedHard.length === 0) && (
      <div className={styles.msgWrapper}>
        <span>Здесь отображаются слова, отмеченные как сложные.</span>
      </div>
      )}
      {aggregatedHard.map((item) => (
        // eslint-disable-next-line react/jsx-props-no-spreading, no-underscore-dangle
        <WordCard key={item._id + new Date().getTime()} callback={setReload} id={item._id} reg="hardWords" />
      ))}
    </div>
  )
}
