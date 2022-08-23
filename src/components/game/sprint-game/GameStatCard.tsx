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
      <div className={styles.gameStatCardWord}>
        <h3>{id + 1}</h3>
      </div>
      <div className={styles.gameStatCardWord}>
        <h3>{studiedArr[id].word}</h3>
      </div>
      <div className={styles.gameStatCardTranslate}>
        <h3>{studiedArr[id].transcription}</h3>
      </div>
      <div className={styles.gameStatCardTranslate}>
        <h3>{studiedArr[id].wordTranslate}</h3>
      </div>
      <div className={styles.gameStatCardTranslate}>
        <h3>{studiedArr[id].studied ? 'ok' : 'no'}</h3>
      </div>
      <div className={styles.gameStatCardTranslate}>
        <div
          className={styles.soundImage}
          onClick={getAudio}
        >
          <img className={styles.sound} src="https://cdn.icon-icons.com/icons2/37/PNG/512/speaker_3760.png" alt="Sound" />
        </div>
      </div>
    </section>

  )
}
export default GameStatCard
