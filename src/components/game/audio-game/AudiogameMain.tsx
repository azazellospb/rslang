import React from 'react'
import { getUnlearnedWords } from '../../redux/fetching'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux'
import AudiogameStat from './game-stat/AudiogameStat'
import GameRunner from './GameRunner'

function AudiogameMain() {
  const dispatch = useAppDispatch()
  const { currentGroupPage } = useAppSelector((state) => state.sprintGameSlice)
  const isFromDictionary = useAppSelector((state) => state.sprintGameSlice.isFromDictionary)
  if (isFromDictionary) {
    dispatch(getUnlearnedWords(currentGroupPage?.page, Number(currentGroupPage?.textbookSection)))
  }
  const { gameOver } = useAppSelector((state) => state.gameSlice)

  return (
    // <>
    //   <Audiogame />
    //   <AnswerControls />
    // </>
    <div className="audiogame-container container">
      {gameOver ? <AudiogameStat /> : <GameRunner />}
    </div>
  )
}

export default AudiogameMain
