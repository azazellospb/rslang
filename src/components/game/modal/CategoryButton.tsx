/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
import React from 'react'
import { IProp } from '../../../types/sprint-game-models'
import { useAppDispatch } from '../../redux/hooks/redux'
import { choiceCategory, refreshGameParams } from '../sprint-game/sprint-game-actions'
import styles from './GameModal.module.css'

function CategoryButton({ id, num }: IProp) {
  const dispatch = useAppDispatch()
  const categoryButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(choiceCategory(e))
    dispatch(refreshGameParams())
  }

  return (
    <button
      id={String(id)}
      type="button"
      className={styles.categoryButton}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => categoryButton(e)}
    >
      {num}
    </button>
  )
}
export default CategoryButton
