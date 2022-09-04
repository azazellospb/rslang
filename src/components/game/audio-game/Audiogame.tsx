/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React, { useRef } from 'react'
import Endpoints from '../../../endpoints/endpoints'
import { useAppSelector } from '../../redux/hooks/redux'
import styles from './Audiogame.module.css'
import AudioIconMain from './game-ui/audio-btn/AudioIconMain'
import hide_answer from './game-ui/hide_answer.jpg'

function Audiogame() {
  const { changeStyle, currentWord, rightWords } = useAppSelector((state) => state.audioGameSlice)
  const voiceBtn = useRef<HTMLAudioElement>(null)
  const { totalNumOfWords, counterWord } = useAppSelector((state) => state.audioGameSlice)

  function handleVoice() {
    voiceBtn.current?.play()
  }

  return (
    <div className={[styles.wrapper].join(' ')}>
      <h3 className={styles.title}>Аудиовызов</h3>
      <div className={styles.answerWrapper}>
        <span className={styles.answerCounter}>{`Ответов: ${counterWord}/${totalNumOfWords}`}</span>
        <span className={styles.rightAnswer}>{`Верных ответов: ${rightWords}`}</span>
      </div>
      <div className={styles.gameContent}>
        <div className={styles.answerContent}>
          <div className={styles.imgWrapper}>
            {changeStyle ? (
              <img
                className={styles.answerImg}
                src={`${Endpoints.ROOT}/${currentWord?.image}`}
                alt="ansver-img"
              />
            ) : (
              <img className={styles.answerImg} src={hide_answer} alt="ansver-img" />
            )}
            {/* <img
              className={changeStyle ? styles.answerImg : `${styles.answerImg} ${styles.hideImg}`}
              src={`${Endpoints.ROOT}/${currentWord?.image}`}
              alt="ansver-img"
            /> */}
          </div>
          <div className={styles.answerWordContainer}>
            <button
              type="button"
              className={changeStyle ? `${styles.playBtn} ${styles.answerVisible}` : styles.playBtn}
              onClick={handleVoice}
            >
              <AudioIconMain />
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
