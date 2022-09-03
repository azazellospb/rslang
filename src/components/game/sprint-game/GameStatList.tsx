import React from 'react'
import styles from './sprint-game.module.css'
import { useAppSelector } from '../../redux/hooks/redux'
import GameStatCard from './GameStatCard'

function GameStatList() {
  const studiedWords = useAppSelector((state) => state.sprintGameSlice.studiedArr)
  return (
    <div className={styles.gameStatList}>
      {studiedWords.map((num, i) => (
        <GameStatCard key={num.id} id={i} />
      ))}
    </div>
  )
}
export default GameStatList
