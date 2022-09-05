import React, { useEffect } from 'react'
import { useAppSelector } from '../../redux/hooks/redux'
import styles from './sprint-game.module.css'
import ButtonBlock from './SprintButtonBlock'

function PlayingField() {
  const currentWord = useAppSelector((state) => state.sprintGameSlice.currentWord)
  const translateWordForComparison = useAppSelector((state) => state.sprintGameSlice.comparisonWord)

  useEffect(() => {
    const falseBtn = document.getElementById('ArrowLeft')
    const trueBtn = document.getElementById('ArrowRight')

    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowLeft':
          falseBtn?.click()
          break
        case 'ArrowRight':
          trueBtn?.click()
          break
        default:
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  })

  return (
    <>
      <h1 className={styles.sprintGameTitle}>Спринт</h1>
      <section className={styles.sprintGameFieldWherePlaying}>
        <div className={styles.engWordField}>
          {currentWord?.word}
        </div>
        <div className={styles.line} />
        <div className={styles.translateEngWordField}>
          <span className="translate-word">
            {translateWordForComparison?.wordTranslate}
          </span>
        </div>
        {/* </section> */}
      </section>
      <ButtonBlock />
    </>

  )
}
export default PlayingField
