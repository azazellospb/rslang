import React, { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux'
import GameStat from './GameStat'
import { getRandomWord } from './sprint-game-actions'
import PlayingField from './SprintPlayingField'

import Timer from './timer'

function SprintGameMainBlock() {
  const dispatch = useAppDispatch()
  const gameData = useAppSelector((state) => state.sprintGameSlice.gameData)
  const timer = useAppSelector((state) => state.sprintGameSlice.timer)
  const counter = useAppSelector((state) => state.sprintGameSlice.turnCounter)
  const isFromDictionary = useAppSelector((state) => state.sprintGameSlice.isFromDictionary)
  useMemo(() => {
    dispatch(getRandomWord(gameData, counter))
  }, [counter, dispatch, gameData])
  return (
    <>
      { Boolean(timer) && <Timer /> }
      { Boolean(timer) && <PlayingField /> }
      {/* { Boolean(!timer) && <GameStat /> } */}
      { isFromDictionary
        ? ((Boolean(gameData.length === 0) || Boolean(!timer)) && <GameStat />)
        : (Boolean(!timer) && <GameStat />)}
    </>

  )
}
export default SprintGameMainBlock
