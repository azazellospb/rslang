import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux'
import { gameSlice } from '../../../redux/reducers/gameSlice'
import Audiogame from '../Audiogame'
import AnswerControls from '../game-components/AnswerControls'
import styles from './ProposeGame.module.css'

function ProposeGame() {
  const dispatch = useAppDispatch()
  const currentGroupPage = useAppSelector((state) => state.sprintGameSlice.currentGroupPage)
  const { isStartGame } = useAppSelector((state) => state.gameSlice)

  function handleProposeGame() {
    dispatch(gameSlice.actions.fetchStartGame(true))
  }

  return (
    <div className={styles.proposeWrapper}>
      {!isStartGame && (
        <div className={styles.proposeModal}>
          <h3>На предыдущих страницах все слова выучены!</h3>
          <h3 className={styles.modalSubtitle}>
            Желаете сыграть в игру с другими словами из этого раздела?
          </h3>
          <button className={styles.game} type="button" onClick={handleProposeGame}>
            Играть
          </button>
          <button className={styles.back} type="button">
            <Link to={`/dictionary/${currentGroupPage?.textbookSection}/${currentGroupPage?.page}`}>
              Вернуться в учебник
            </Link>
          </button>
        </div>
      )}

      {isStartGame && (
        <>
          <Audiogame />
          <AnswerControls />
        </>
      )}
    </div>
  )
}

export default ProposeGame
