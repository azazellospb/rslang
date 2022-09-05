/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
import React from 'react'
import { IProp } from '../../../types/sprint-game-models'
import { getUnlearnedWordsForGamesAfterCurrentPage } from '../../redux/fetching'
import { useAppDispatch } from '../../redux/hooks/redux'
import { choiceCategory, refreshGameParams } from '../sprint-game/sprint-game-actions'
import styles from './GameModal.module.css'

function CategoryButton({ id, num }: IProp) {
  const dispatch = useAppDispatch()
  const categoryButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    localStorage.getItem('userInfo')
      ? dispatch(getUnlearnedWordsForGamesAfterCurrentPage({ textbookSection: (e.target as HTMLButtonElement).id, page: 0 }))
      : dispatch(choiceCategory(e))
    dispatch(refreshGameParams())
  }

  return (
    <button
      id={String(id)}
      type="button"
      className={styles.categoryButton}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => categoryButton(e)}
    >
      Уровень
      {' '}
      <span className={styles.categoryTitle}>{num}</span>
    </button>
  )
}
export default CategoryButton
