import React from 'react'
import { Link } from 'react-router-dom'
import BookIcon from './BookIcon'
import styles from '../../game-stat/AudiogameStat.module.css'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks/redux'
import { refreshAudiogameParams } from '../../audiogame-actions'

function BackToBook() {
  const dispatch = useAppDispatch()
  const ToBookHandle = () => {
    dispatch(refreshAudiogameParams())
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
