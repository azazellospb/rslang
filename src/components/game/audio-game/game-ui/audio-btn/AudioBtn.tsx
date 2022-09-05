import React from 'react'
import AudioIconMain from './AudioIconMain'
import styles from '../../game-stat/AudiogameStat.module.css'

function AudioBtn() {
  return (
    <div className={styles.audioBtnMain}>
      <AudioIconMain />
    </div>
  )
}

export default AudioBtn
