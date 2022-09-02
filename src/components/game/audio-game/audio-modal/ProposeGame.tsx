import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux'
import { gameSlice } from '../../../redux/reducers/gameSlice'
import Audiogame from '../Audiogame'
import AnswerControls from '../game-components/AnswerControls'

function ProposeGame() {
  const dispatch = useAppDispatch()
  const currentGroupPage = useAppSelector((state) => state.sprintGameSlice.currentGroupPage)
  const { isStartGame } = useAppSelector((state) => state.gameSlice)

  function handleProposeGame() {
    // console.log('start game')
    dispatch(gameSlice.actions.fetchStartGame(true))
  }

  return (
    <>
      {!isStartGame && (
        <>
          <h3>На предыдущих страницах все слова выучены!</h3>
          <h3>Желаете сыграть в игру с другими словами из этого раздела?</h3>
          <button type="button" onClick={handleProposeGame}>
            Играть
          </button>
          <button type="button">
            <Link to={`/dictionary/${currentGroupPage?.textbookSection}/${currentGroupPage?.page}`}>
              Вернуться в учебник
            </Link>
          </button>
        </>
      )}

      {isStartGame && (
        <>
          <Audiogame />
          <AnswerControls />
        </>
      )}
    </>
  )
}

export default ProposeGame
