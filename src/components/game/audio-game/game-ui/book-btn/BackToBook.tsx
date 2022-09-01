import React from 'react'
import { Link } from 'react-router-dom'
import BookIcon from './BookIcon'
import styles from '../../game-stat/AudiogameStat.module.css'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks/redux'
import { gameSlice } from '../../../../redux/reducers/gameSlice'
import { audioGameSlice } from '../../../../redux/reducers/audioGameSlice'

function BackToBook() {
  const dispatch = useAppDispatch()
  const ToBookHandle = () => {
    dispatch(gameSlice.actions.fetchGameOver(false))
    dispatch(audioGameSlice.actions.fetchCounterProgress(1))
    dispatch(audioGameSlice.actions.fetchCounterWord(0))
    dispatch(audioGameSlice.actions.learnedWord({}))
    dispatch(audioGameSlice.actions.fetchTotalNumOfWords(20))
  }
  const currentGroupPage = useAppSelector((state) => state.sprintGameSlice.currentGroupPage)
  return (
    <button type="button" className={styles.toBookBtn} onClick={ToBookHandle}>
      {currentGroupPage ? (
        <Link to={`/dictionary/${currentGroupPage?.textbookSection}/${currentGroupPage?.page}`}>
          <BookIcon />
        </Link>
      ) : (
        <Link to="/dictionary/0/0">
          <BookIcon />
        </Link>
      )}
    </button>
  )
}

export default BackToBook
