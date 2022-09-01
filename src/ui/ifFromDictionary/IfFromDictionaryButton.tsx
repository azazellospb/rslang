/* eslint-disable max-len */
import React from 'react'
import { getUnlearnedWordsForGames } from '../../components/redux/fetching'
import { useAppDispatch, useAppSelector } from '../../components/redux/hooks/redux'
import styles from './IfFromDictionaryButton.module.css'

function IfFromDictionaryButton() {
  const dispatch = useAppDispatch()
  const currentGroupPage = useAppSelector((state) => state.sprintGameSlice.currentGroupPage)
  return (
    <button
      className={styles.button}
      type="button"
      onClick={() => dispatch(getUnlearnedWordsForGames(currentGroupPage!))}
    >
      Начать игру
    </button>

  )
}
export default IfFromDictionaryButton
