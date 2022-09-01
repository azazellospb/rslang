import React from 'react'
import { useAppSelector } from '../../redux/hooks/redux'
import styles from './sprint-game.module.css'
import ButtonBlock from './SprintButtonBlock'

function PlayingField() {
  const url = 'http://localhost:8088'
  const currentWord = useAppSelector((state) => state.sprintGameSlice.currentWord)
  const translateWordForComparison = useAppSelector((state) => state.sprintGameSlice.comparisonWord)

  return (
    <section className={styles.sprintGameFieldWherePlaying}>
      <img
        className={styles.sprintGameFieldWherePlayingBackground}
        src={`${url}/${currentWord?.image}`}
        alt={`${currentWord?.word}`}
      />

      <section className={styles.fieldForGame}>
        <div className={styles.engWordField}>
          {currentWord?.word}
        </div>
        <div className={styles.translateEngWordField}>
          <span className="translate-word">
            {translateWordForComparison?.wordTranslate}
          </span>
        </div>
        <ButtonBlock />
      </section>
    </section>

  )
}
export default PlayingField
