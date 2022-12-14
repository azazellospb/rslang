/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-danger */
import React from 'react'
import styles from './sprint-game.module.css'
import { useAppSelector } from '../../redux/hooks/redux'
import AudioIcon from '../audio-game/game-ui/audio-btn/AudioIcon'
import Endpoints from '../../../endpoints/endpoints'

interface IIndexProp {
  id: number,
}
function GameStatCard({ id }: IIndexProp): JSX.Element {
  const studiedArr = useAppSelector((state) => state.sprintGameSlice.studiedArr)
  const getAudio = async () => {
    const audio = new Audio()
    audio.src = `${Endpoints.ROOT}/${studiedArr[id]?.audio}`
    await audio.play()
  }
  return (
    <section className={`${styles.gameStatCard} ${styles.underline}`}>
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
        {studiedArr[id].learned
          ? <div className={styles.greenYes}>ok</div>
          : <div className={styles.redNo}>no</div>}
      </div>
      <div className={`${styles.gameStatCard} ${styles.audio}`}>
        <div
          className={styles.soundImage}
          onClick={getAudio}
        >
          <AudioIcon />
        </div>
      </div>
    </section>

  )
}
export default GameStatCard
