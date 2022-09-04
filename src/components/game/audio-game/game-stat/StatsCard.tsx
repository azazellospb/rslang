/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef } from 'react'
import Endpoints from '../../../../endpoints/endpoints'
import { useAppSelector } from '../../../redux/hooks/redux'
import AudioIcon from '../game-ui/audio-btn/AudioIcon'
import styles from './StatsCard.module.css'

function StatsCard({ id }: IStatCard) {
  const { learnedWords } = useAppSelector((state) => state.audioGameSlice)
  const voiceBtn = useRef<HTMLAudioElement>(null)
  function handleVoice() {
    voiceBtn.current?.play()
  }
  return (
    <section className={styles.gameStatCard}>
      <div className={`${styles.gameStatCardWord} ${styles.position}`}>{id + 1}</div>
      <div className={`${styles.gameStatCardWord} ${styles.currentWord}`}>
        {learnedWords[id].word}
      </div>
      <div className={`${styles.gameStatCard} ${styles.transcription}`}>
        {learnedWords[id].transcription}
      </div>
      <div className={`${styles.gameStatCard} ${styles.translate}`}>
        {learnedWords[id].wordTranslate}
      </div>
      <div className={`${styles.gameStatCard} ${styles.checked}`}>
        {learnedWords[id].learned ? (
          <div className={styles.greenYes}>ok</div>
        ) : (
          <div className={styles.redNo}>no</div>
        )}
      </div>
      <div className={`${styles.gameStatCard} ${styles.audio}`}>
        <button type="button" className={styles.soundImage} onClick={handleVoice}>
          <AudioIcon />
          <audio
            src={`${Endpoints.ROOT}/${learnedWords[id]?.audio}`}
            ref={voiceBtn}
            onClick={handleVoice}
          >
            _
          </audio>
        </button>
      </div>
    </section>
  )
}

export default StatsCard

interface IStatCard {
  id: number
}
