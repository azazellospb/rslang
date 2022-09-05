import React, { useMemo } from 'react'
import Loader from '../../../ui/loader/Loader'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux'
import GameStat from './GameStat'
import { getRandomWord } from './sprint-game-actions'
import PlayingField from './SprintPlayingField'
// import styles from './sprint-game.module.css'
import Timer from './timer'

function SprintGameMainBlock() {
  const dispatch = useAppDispatch()
  const gameData = useAppSelector((state) => state.sprintGameSlice.gameData)
  const timer = useAppSelector((state) => state.sprintGameSlice.timer)
  const counter = useAppSelector((state) => state.sprintGameSlice.turnCounter)
  const isFromDictionary = useAppSelector((state) => state.sprintGameSlice.isFromDictionary)
  const gameLoader = useAppSelector((state) => state.sprintGameSlice.gameLoader)
  useMemo(() => {
    dispatch(getRandomWord(gameData, counter))
  }, [counter, dispatch, gameData])
  return (
    <>
      {gameLoader && <Loader />}
      { !gameLoader && Boolean(timer) && <Timer /> }
      { !gameLoader && Boolean(timer) && <PlayingField /> }
      {/* {(Boolean(gameData.length === 0) || Boolean(!timer)) && <GameStat />} */}
      { isFromDictionary
        ? ((Boolean(gameData.length === 0) || Boolean(!timer)) && <GameStat />)
        : ((Boolean(!timer)) && <GameStat />)}
    </>

  )
}
export default SprintGameMainBlock
