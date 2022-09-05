/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react'
import { getDictPageWords, searchWord } from '../redux/fetching'
import { useAppDispatch, useAppSelector } from '../redux/hooks/redux'
import styles from './searchBlock.module.css'

function SearchBlock() {
  const [text, setText] = useState('')
  const [disable, setDisable] = useState(true)
  const dispatch = useAppDispatch()
  const userSearchWord = useAppSelector((state) => state.aggregatedSlice.searchWord)
  const searchHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(searchWord(text.toLocaleLowerCase()))
    setText('')
  }
  useEffect(() => {
    text.trim().length > 2 && setDisable(false)
    text.trim().length < 2 && setDisable(true)
  }, [text])
  useEffect(() => {
    if (userSearchWord.length) {
      dispatch(
        getDictPageWords(Number(userSearchWord[0].page), Number(userSearchWord[0].group)),
      )
    }
  }, [dispatch, userSearchWord])

  return (
    <div className={styles.searchContainer}>
      <input
        value={text}
        type="text"
        className={styles.searchInput}
        placeholder="Поиск слова"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
      />
      <button
        type="button"
        className={styles.searchButton}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => searchHandler(e)}
        disabled={disable}
      >
        Искать
      </button>
    </div>
  )
}
export default SearchBlock

