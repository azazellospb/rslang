import React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux'
import { fetchWordForSprintGameSuccess } from '../../redux/reducers/sprintGameSlice'
import { createStudiedWordAndPutItToArr, getRandomWord } from './sprint-game-actions'
import styles from './sprint-game.module.css'

function ButtonBlock() {
  const dispatch = useAppDispatch()
  const gameData = useAppSelector((state) => state.sprintGameSlice.gameData)
  const comparisonWord = useAppSelector((state) => state.sprintGameSlice.comparisonWord)
  const currentWord = useAppSelector((state) => state.sprintGameSlice.currentWord)
  const falseButtonHandle = () => {
    dispatch(getRandomWord(gameData))
    const examination = comparisonWord?.id !== currentWord?.id
    dispatch(createStudiedWordAndPutItToArr(currentWord, examination))
    dispatch(fetchWordForSprintGameSuccess(gameData.filter((words) => words !== currentWord)))
    // console.log(gameData.filter((words) => words !== currentWord))
  }
  const truthButtonHandle = () => {
    dispatch(getRandomWord(gameData))
    const examination = comparisonWord?.id === currentWord?.id
    dispatch(createStudiedWordAndPutItToArr(currentWord, examination))
    dispatch(fetchWordForSprintGameSuccess(gameData.filter((words) => words !== currentWord)))
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
