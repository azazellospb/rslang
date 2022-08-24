/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-danger */
import React from 'react'
import styles from './sprint-game.module.css'
import { useAppSelector } from '../../redux/hooks/redux'

interface IIndexProp {
  id: number,
}
function GameStatCard({ id }: IIndexProp): JSX.Element {
  const studiedArr = useAppSelector((state) => state.sprintGameSlice.studiedArr)
  const getAudio = async () => {
    const audio = new Audio()
    audio.src = `http://localhost:8088/${studiedArr[id]?.audio}`
    await audio.play()
  }
  return (
    <section className={styles.gameStatCard}>
      <div className={`${styles.gameStatCardWord} ${styles.position}`}>
        {id + 1}
      </div>
      <div className={`${styles.gameStatCardWord} ${styles.currentWord}`}>
        {studiedArr[id].word}
      </div>
      <div className={`${styles.gameStatCard} ${styles.transcription}`}>
        {studiedArr[id].transcription}
      </div>
      <div className={`${styles.gameStatCard} ${styles.translate}`}>
        {studiedArr[id].wordTranslate}
      </div>
      <div className={`${styles.gameStatCard} ${styles.checked}`}>
        {studiedArr[id].studied ? 'ok' : 'no'}
      </div>
      <div className={`${styles.gameStatCard} ${styles.audio}`}>
        <div
          className={styles.soundImage}
          onClick={getAudio}
        >
          <img className={styles.sound} src="../../../../public/assets/other/stat_speaker_3760.png" alt="Sound" />
        </div>
      </div>
    </section>

  )
}
export default GameStatCard
