import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux'
import Audiogame from '../Audiogame'
import AnswerControls from '../game-components/AnswerControls'
// import { useAppDispatch } from '../../../redux/hooks/redux'
// import { gameSlice } from '../../../redux/reducers/gameSlice'

function ProposeGame() {
  // const dispatch = useAppDispatch()
  const currentGroupPage = useAppSelector((state) => state.sprintGameSlice.currentGroupPage)
  let isStartGame = false
  let cancelGame = false
  function handleProposeGame() {
    // dispatch(gameSlice.actions.fetchGameOver(false))
    console.log('propose game')
    isStartGame = true
  }
  function handlCancelGame() {
    console.log('cancel game')
    cancelGame = true
  }

  return (
    <div>
      <h3>На предыдущих страницах все слова выучены!</h3>
      <h3>Желаете сыграть в игру с другими словами из этого раздела?</h3>
      <button type="button" onClick={handleProposeGame}>
        Играть
      </button>
      <button type="button" onClick={handlCancelGame}>
        Назад
      </button>
      <Link to={`/dictionary/${currentGroupPage?.textbookSection}/${currentGroupPage?.page}`}>
        Перейти в учебник
      </Link>
      {isStartGame ? (
        <>
          <Audiogame />
          <AnswerControls />
        </>
      ) : (
        <h3>Обработать кнопку отмены</h3>
      )}
    </div>
  )
}

export default ProposeGame
