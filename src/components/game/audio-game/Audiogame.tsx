/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React, { useRef } from 'react'
import Endpoints from '../../../endpoints/endpoints'
import { useAppSelector } from '../../redux/hooks/redux'
import styles from './Audiogame.module.css'
import AudioIcon from './game-ui/audio-btn/AudioIcon'

function Audiogame() {
  const { changeStyle, currentWord } = useAppSelector((state) => state.audioGameSlice)
  const voiceBtn = useRef<HTMLAudioElement>(null)
  const progress = useAppSelector((state) => state.audioGameSlice.counterProgress)

  function handleVoice() {
    voiceBtn.current?.play()
  }

  return (
    <div className={['container', styles.wrapper].join(' ')}>
      <div className={styles.counter}>{`${progress} / 20`}</div>
      <div className={styles.gameContent}>
        <div className={styles.answerContent}>
          <div className={styles.imgWrapper}>
            <img
              className={changeStyle ? styles.answerImg : `${styles.answerImg} ${styles.hideImg}`}
              src={`${Endpoints.ROOT}/${currentWord?.image}`}
              alt="ansver-img"
            />
          </div>
          <div className={styles.answerWordContainer}>
            <button
              type="button"
              className={changeStyle ? styles.playBtn : `${styles.playBtn} ${styles.hidePlayBtn}`}
              onClick={handleVoice}
            >
              <AudioIcon />
            </button>
            <audio
              src={`${Endpoints.ROOT}/${currentWord?.audio}`}
              autoPlay
              ref={voiceBtn}
              onClick={handleVoice}
            >
              _
            </audio>
            <span
              className={
                changeStyle ? styles.answerWord : `${styles.answerWord} ${styles.hiddenAnswer}`
              }
            >
              {`${currentWord?.word}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Audiogame
