import React from 'react'
import ReloadIcon from './ReloadIcon'
import styles from '../../game-stat/AudiogameStat.module.css'
import { useAppDispatch } from '../../../../redux/hooks/redux'
import { refreshAudiogameParams } from '../../audiogame-actions'

function ReloadGame() {
  const dispatch = useAppDispatch()
  const reloadHandle = () => {
    dispatch(refreshAudiogameParams())
  }

  return (
    <button type="button" className={`${styles.reloadBtn}`} onClick={reloadHandle}>
      <ReloadIcon />
    </button>
  )
}

export default ReloadGame
