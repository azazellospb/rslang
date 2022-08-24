/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect } from 'react'
import { getWordsDataForSprintGame } from '../../redux/fetching'
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
  }
  const truthButtonHandle = () => {
    dispatch(getRandomWord(gameData))
    const examination = comparisonWord?.id === currentWord?.id
    dispatch(createStudiedWordAndPutItToArr(currentWord, examination))
    dispatch(fetchWordForSprintGameSuccess(gameData.filter((words) => words !== currentWord)))
  }
  useEffect(() => {
    gameData.length <= 1 && dispatch(getWordsDataForSprintGame(
      {
        textbookSection: String(currentWord?.group),
        page: Math.floor(Math.random() * 30),
      },
    ))
  }, [currentWord?.group, dispatch, gameData.length])

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
