import React from 'react'
import ReloadIcon from './ReloadIcon'
import styles from '../../game-stat/AudiogameStat.module.css'
import { audioGameSlice } from '../../../../redux/reducers/audioGameSlice'
import { useAppDispatch } from '../../../../redux/hooks/redux'
import { gameSlice } from '../../../../redux/reducers/gameSlice'

function ReloadGame() {
  const dispatch = useAppDispatch()
  const reloadHandle = () => {
    dispatch(gameSlice.actions.fetchGameOver(false))
    dispatch(audioGameSlice.actions.fetchCounterProgress(1))
    dispatch(audioGameSlice.actions.fetchCounterWord(0))
    dispatch(audioGameSlice.actions.learnedWord({}))
  }

  return (
    <button type="button" className={`${styles.reloadBtn}`} onClick={reloadHandle}>
      <ReloadIcon />
    </button>
  )
}

export default ReloadGame
