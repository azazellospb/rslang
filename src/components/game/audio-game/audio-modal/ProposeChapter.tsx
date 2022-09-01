import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux'
import { gameSlice } from '../../../redux/reducers/gameSlice'

function ProposeChapter() {
  const dispatch = useAppDispatch()
  const currentGroupPage = useAppSelector((state) => state.sprintGameSlice.currentGroupPage)
  function handleProposeChapter() {
    dispatch(gameSlice.actions.fetchGameOver(false))
  }
  return (
    <>
      <h3>Все слова из этого раздела изучены! Перейдите пожалуйста в новый раздел учебника!</h3>
      <button type="button" onClick={handleProposeChapter}>
        <Link to={`/dictionary/${currentGroupPage?.textbookSection}/${currentGroupPage?.page}`}>
          Перейти в учебник
        </Link>
      </button>
    </>
  )
}

export default ProposeChapter
