import React from 'react'
import BookIcon from './BookIcon'
import styles from '../../game-stat/AudiogameStat.module.css'
import { useAppDispatch } from '../../../../redux/hooks/redux'
import { audioGameSlice } from '../../../../redux/reducers/audioGameSlice'
import { gameSlice } from '../../../../redux/reducers/gameSlice'

function BackToBook() {
  const dispatch = useAppDispatch()
  const ToBookHandle = () => {
    dispatch(audioGameSlice.actions.fetchCounterProgress(1))
    dispatch(audioGameSlice.actions.fetchCounterWord(0))
    dispatch(gameSlice.actions.fetchGameOver(false))
  }
  return (
    <button type="button" className={styles.toBookBtn} onClick={ToBookHandle}>
      {/* BackToBook */}
      <BookIcon />
    </button>
  )
}

export default BackToBook
