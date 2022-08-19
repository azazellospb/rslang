/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
import React from 'react'
import { IFetchParam, IProp } from '../../types/sprint-game-models'
import { getWordsDataForSprintGame } from '../redux/fetching'
import { useAppDispatch } from '../redux/hooks/redux'
import styles from './GameModal.module.css'

function CategoryButton({ id, num }:IProp) {
  const dispatch = useAppDispatch()
  const choiceCategory = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const paramForFetch: IFetchParam = {
      textbookSection: (e.target as HTMLButtonElement).id,
      page: Math.floor(Math.random() * 30),
    }
    dispatch(getWordsDataForSprintGame(paramForFetch))
  }
  return (
    <button
      id={String(id)}
      type="button"
      className={styles.categoryButton}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => choiceCategory(e)}
    >
      {num}
    </button>
  )
}
export default CategoryButton
