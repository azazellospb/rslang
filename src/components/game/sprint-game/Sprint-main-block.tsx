import React, { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux'
import { getRandomWord } from './sprint-game-actions'
import PlayingField from './SprintPlayingField'

import Timer from './timer'

function SprintGameMainBlock() {
  const dispatch = useAppDispatch()
  const gameData = useAppSelector((state) => state.sprintGameSlice.gameData)
  useMemo(() => {
    dispatch(getRandomWord(gameData))
  }, [dispatch, gameData])
  //= ===============================================
  return (
    <>
      <Timer />
      <PlayingField />
    </>
  )
}
export default SprintGameMainBlock
