/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
import React from 'react'
import { /* IFetchParam, */ IProp } from '../../../types/sprint-game-models'
// import { getWordsDataForSprintGame } from '../../redux/fetching'
import { useAppDispatch } from '../../redux/hooks/redux'
import { choiceCategory } from '../sprint-game/sprint-game-actions'
import styles from './GameModal.module.css'

function CategoryButton({ id, num }:IProp) {
  const dispatch = useAppDispatch()
  return (
    <button
      id={String(id)}
      type="button"
      className={styles.categoryButton}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => dispatch(choiceCategory(e))}
    >
      {num}
    </button>
  )
}
export default CategoryButton
