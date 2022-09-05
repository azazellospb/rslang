/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { searchWord } from '../redux/fetching'
import { useAppDispatch } from '../redux/hooks/redux'
import styles from './searchBlock.module.css'

function SearchBlock(
  props: {
    callback: (act: boolean) => void
  },
) {
  const ref2 = useRef<HTMLInputElement>(null)
  const { callback } = props
  const [text, setText] = useState('')
  const dispatch = useAppDispatch()
  const searchHandler = () => {
    dispatch(searchWord(text.toLocaleLowerCase()))
    setText('')
  }
  useEffect(() => {
    let isDisabled = true
    const inputSearch = ref2.current!
    const toggleSearchBtn = () => {
      if (text.trim().length > 2) isDisabled = false
      else if (text.trim().length < 2) {
        isDisabled = true
      }
    }
    inputSearch.addEventListener('input', toggleSearchBtn)

    return () => {
      isDisabled
      inputSearch.removeEventListener('input', toggleSearchBtn)
    }
  }, [text])
  return (
    <div className={styles.searchContainer}>
      <input
        value={text}
        type="text"
        className={styles.searchInput}
        placeholder="Поиск слова"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        ref={ref2}
      />
      <Link
        className={`${styles.searchButton}`}
        onClick={() => {
          searchHandler()
          callback(false)
        }}
        to="/search"
      >
        Искать
      </Link>
    </div>
  )
}
export default SearchBlock
