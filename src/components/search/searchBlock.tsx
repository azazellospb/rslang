/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import getWordsData, { getDictPageWords, searchWord } from '../redux/fetching'
import { useAppDispatch, useAppSelector } from '../redux/hooks/redux'
import styles from './searchBlock.module.css'

function SearchBlock() {
  const [text, setText] = useState('')
  const [disable, setDisable] = useState(true)
  const { group = 0, page = 0 } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userSearchWord = useAppSelector((state) => state.aggregatedSlice.searchWord)
  const name = useAppSelector((state) => state.userReducer.name)
  const searchHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(searchWord(text.toLocaleLowerCase()))
    setText('')
  }
  const searchKeyHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.code === 'Enter') {
      dispatch(searchWord(text.toLocaleLowerCase()))
      setText('')
    }
  }
  useEffect(() => {
    text.trim().length > 2 && setDisable(false)
    text.trim().length < 2 && setDisable(true)
  }, [text])
  useEffect(() => {
    if (userSearchWord.length) {
      navigate(
        `/dictionary/${Number(userSearchWord[0].group)}/${Number(userSearchWord[0].page)}`,
        { replace: true },
      )
      if (name) {
        dispatch(
          getDictPageWords(Number(page), Number(group)),
        )
      } else dispatch(getWordsData(Number(page), Number(group)))
    }
  }, [dispatch, group, name, navigate, page, userSearchWord])

  return (
    <div
      className={styles.searchContainer}
      onKeyUp={(e: React.KeyboardEvent<HTMLDivElement>) => searchKeyHandler(e)}
    >
      <input
        value={text}
        type="text"
        className={styles.searchInput}
        placeholder="Мин 2 символа"
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
