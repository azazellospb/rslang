/* eslint-disable max-len */
import React from 'react'
import { getWordsDataForSprintGame } from '../../components/redux/fetching'
import { useAppDispatch, useAppSelector } from '../../components/redux/hooks/redux'
import { timerWork } from '../../components/redux/reducers/sprintGameSlice'
import styles from './IfFromDictionaryButton.module.css'

function IfFromDictionaryButton() {
  const dispatch = useAppDispatch()
  const paramForFetch = useAppSelector((state) => state.sprintGameSlice.currentGroupPage)

  const handleClick = () => {
    dispatch(getWordsDataForSprintGame(paramForFetch!))
    dispatch(timerWork(5))
  }
  return (
    <button
      className={styles.button}
      type="button"
      onClick={handleClick}
    >
      Начать игру
    </button>

  )
}
export default IfFromDictionaryButton
