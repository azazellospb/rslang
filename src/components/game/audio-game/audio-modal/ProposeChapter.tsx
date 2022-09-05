import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux'
import { gameSlice } from '../../../redux/reducers/gameSlice'
import styles from './ProposeGame.module.css'

function ProposeChapter() {
  const dispatch = useAppDispatch()
  const currentGroupPage = useAppSelector((state) => state.sprintGameSlice.currentGroupPage)
  function handleProposeChapter() {
    dispatch(gameSlice.actions.fetchGameOver(false))
  }
  return (
    <div className={styles.proposeWrapper}>
      <div className={styles.proposeModal}>
        <h3 className={styles.modalSubtitle}>
          Все слова из этого раздела изучены! Перейдите пожалуйста в новый раздел учебника!
        </h3>
        <button className={styles.back} type="button" onClick={handleProposeChapter}>
          <Link to={`/dictionary/${currentGroupPage?.textbookSection}/${currentGroupPage?.page}`}>
            Перейти в учебник
          </Link>
        </button>
      </div>
    </div>
  )
}

export default ProposeChapter
