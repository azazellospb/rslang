import React from 'react'
import ReloadIcon from './ReloadIcon'
import styles from '../../game-stat/AudiogameStat.module.css'
import { audioGameSlice } from '../../../../redux/reducers/audioGameSlice'
import { useAppDispatch } from '../../../../redux/hooks/redux'
import { gameSlice } from '../../../../redux/reducers/gameSlice'
// import { refreshAudiogameParams } from '../../audiogame-actions'

function ReloadGame() {
  const dispatch = useAppDispatch()
  const reloadHandle = () => {
    // refreshAudiogameParams()
    dispatch(gameSlice.actions.fetchGameOver(false))
    dispatch(audioGameSlice.actions.fetchCounterProgress(1))
    dispatch(audioGameSlice.actions.fetchCounterWord(0))
    dispatch(audioGameSlice.actions.learnedWord({}))
    dispatch(audioGameSlice.actions.fetchTotalNumOfWords(20))
  }

  return (
    <button type="button" className={`${styles.reloadBtn}`} onClick={reloadHandle}>
      <ReloadIcon />
    </button>
  )
}

export default ReloadGame
