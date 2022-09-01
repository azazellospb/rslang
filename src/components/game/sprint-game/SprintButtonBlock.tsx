/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect } from 'react'
import { getWordsDataForSprintGame } from '../../redux/fetching'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux'
import { fetchWordForSprintGameSuccess, timerWork, /* timerWork, */ turnCounter } from '../../redux/reducers/sprintGameSlice'
import { createObjectForPostOrPutItToUserAggregatedWords, getRandomWord, createStudiedWordAndPutItToArr } from './sprint-game-actions'
import styles from './sprint-game.module.css'

function ButtonBlock() {
  const dispatch = useAppDispatch()
  const gameData = useAppSelector((state) => state.sprintGameSlice.gameData)
  const comparisonWord = useAppSelector((state) => state.sprintGameSlice.comparisonWord)
  const currentWord = useAppSelector((state) => state.sprintGameSlice.currentWord)
  const isFromDictionary = useAppSelector((state) => state.sprintGameSlice.isFromDictionary)
  const counter = useAppSelector((state) => state.sprintGameSlice.turnCounter)
  const aggregatedWordArr = useAppSelector((state) => state.aggregatedSlice.data)
  
  const falseButtonHandle = () => {
    dispatch(getRandomWord(gameData, counter))
    const examination = comparisonWord?.id !== currentWord?.id
    dispatch(createStudiedWordAndPutItToArr(currentWord, examination))
    dispatch(fetchWordForSprintGameSuccess(gameData.filter((words) => words !== currentWord)))
    dispatch(turnCounter())
    if (localStorage.getItem('userInfo')) dispatch(createObjectForPostOrPutItToUserAggregatedWords(currentWord, examination, aggregatedWordArr))
  }

  const truthButtonHandle = () => {
    dispatch(getRandomWord(gameData, counter))
    const examination = comparisonWord?.id === currentWord?.id
    dispatch(createStudiedWordAndPutItToArr(currentWord, examination))
    dispatch(fetchWordForSprintGameSuccess(gameData.filter((words) => words !== currentWord)))
    dispatch(turnCounter())
    if (localStorage.getItem('userInfo')) dispatch(createObjectForPostOrPutItToUserAggregatedWords(currentWord, examination, aggregatedWordArr))
  }

  useEffect(() => {
    (!localStorage.getItem('userInfo') || localStorage.getItem('userInfo'))
    && !isFromDictionary && gameData.length < 1 && dispatch(getWordsDataForSprintGame(
      {
        textbookSection: String(currentWord?.group),
        page: Math.floor(Math.random() * 30),
      },
    ))
  }, [currentWord?.group, dispatch, gameData.length, isFromDictionary])

  useEffect(() => {
    if (isFromDictionary && localStorage.getItem('userInfo') && gameData.length === 0) {
      dispatch(timerWork(0))
    }
  }, [currentWord?.group, dispatch, gameData.length, isFromDictionary])

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
