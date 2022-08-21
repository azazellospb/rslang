import React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux'
import { getRandomWord } from './sprint-game-actions'
import styles from './sprint-game.module.css'

function ButtonBlock() {
  const dispatch = useAppDispatch()
  const gameData = useAppSelector((state) => state.sprintGameSlice.gameData)
  const falseButtonHandle = () => {
    dispatch(getRandomWord(gameData))
  }
  const truthButtonHandle = () => {
    dispatch(getRandomWord(gameData))
  }
  return (
    <section className={styles.sprintButtonBlock}>
      <button
        type="button"
        className={styles.falseButton}
        onClick={falseButtonHandle}
      >
        Не верно!
      </button>
      <button
        type="button"
        className={styles.truthButton}
        onClick={truthButtonHandle}
      >
        Верно!
      </button>
    </section>
  )
}
export default ButtonBlock
