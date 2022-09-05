import React from 'react'
import { IUnlearnedWord } from '../../types/models'
import { useAppSelector } from '../redux/hooks/redux'
import { findedWord } from '../redux/reducers/aggregatedSlice'
import WordCard from './WordCard'

import styles from './WordsBunch.module.css'

export default function SearchedWord() {
  const pageData3 = useAppSelector(findedWord) as IUnlearnedWord[]
  const isEmpty = pageData3.length === 0
  return (
    <div className={styles.searchResult}>
      {!isEmpty && pageData3.map((item) => (
      // eslint-disable-next-line react/jsx-props-no-spreading, no-console, no-underscore-dangle
        <WordCard key={Math.random()} callback={() => console.log('')} id={item._id} reg="dict" />
      ))}
      {isEmpty && <div>К сожалению такого слова у нас нет.</div> }
    </div>
  )
}
