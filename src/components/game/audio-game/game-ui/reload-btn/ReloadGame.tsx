import React from 'react'
import ReloadIcon from './ReloadIcon'
import styles from '../../game-stat/AudiogameStat.module.css'
import { useAppDispatch } from '../../../../redux/hooks/redux'
import { gameSlice } from '../../../../redux/reducers/gameSlice'
import { audioGameSlice } from '../../../../redux/reducers/audioGameSlice'

function ReloadGame() {
  const dispatch = useAppDispatch()
  const reloadHandle = () => {
    dispatch(audioGameSlice.actions.fetchCounterProgress(1))
    dispatch(audioGameSlice.actions.fetchCounterWord(0))
    dispatch(gameSlice.actions.fetchGameOver(false))
  }

  return (
    <button type="button" className={`${styles.reloadBtn}`} onClick={reloadHandle}>
      {/* ReloadGame */}
      <ReloadIcon />
    </button>
  )
}

export default ReloadGame
