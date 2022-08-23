/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import styles from './sprint-game.module.css'
import { useAppSelector } from '../../redux/hooks/redux'
import GameStatList from './GameStatList'
import GameMenu from '../game-menu/GameMenu'

export interface IProp {
  id: number,
}
function GameStat() {
  const studiedWords = useAppSelector((state) => state.sprintGameSlice.studiedArr)
  const message = (
    <span className={styles.messageText}>
      Упс.... У Вас нет результатов! Пройдите наше испытание что проверить ваши знаия языка
    </span>
  )
  return (
    <section className={styles.gameStatContainer}>
      {Boolean(!studiedWords.length) && message}
      {Boolean(studiedWords.length) && <GameMenu />}
      {Boolean(studiedWords.length) && <GameStatList />}
    </section>
  )
}
export default GameStat
