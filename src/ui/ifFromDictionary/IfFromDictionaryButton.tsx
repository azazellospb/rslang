/* eslint-disable max-len */
import React from 'react'
import { filteredUnlearnedWordsLessThanCurrentPage } from '../../components/game/sprint-game/sprint-game-actions'
import { useAppDispatch, useAppSelector } from '../../components/redux/hooks/redux'
import styles from './IfFromDictionaryButton.module.css'

function IfFromDictionaryButton() {
  const dispatch = useAppDispatch()
  const unlearnedWords = useAppSelector((state) => state.aggregatedSlice.beforePageWords)
  const page = useAppSelector((state) => state.sprintGameSlice.currentGroupPage?.page)
  return (
    <button
      className={styles.button}
      type="button"
      onClick={() => dispatch(filteredUnlearnedWordsLessThanCurrentPage(unlearnedWords, page!))}
    >
      Начать игру
    </button>

  )
}
export default IfFromDictionaryButton
