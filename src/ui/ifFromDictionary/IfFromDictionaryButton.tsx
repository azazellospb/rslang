/* eslint-disable max-len */
import React from 'react'
// import { getAllNotLearningWordsFromAggregated } from '../../components/redux/fetching'
import { useAppDispatch } from '../../components/redux/hooks/redux'
import { timerWork } from '../../components/redux/reducers/sprintGameSlice'
import styles from './IfFromDictionaryButton.module.css'

function IfFromDictionaryButton() {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    // dispatch(getAllNotLearningWordsFromAggregated(paramForFetch!))
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
