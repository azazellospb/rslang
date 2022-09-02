import React from 'react'
import AudioIcon from './AudioIcon'
import styles from '../../game-stat/AudiogameStat.module.css'

function AudioBtn() {
  return (
    <div className={styles.audioBtn}>
      <AudioIcon />
    </div>
  )
}

export default AudioBtn
