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
    <div className={styles.messageText}>
      <h3>Упс....!</h3>
      У Вас нет результатов!
      Попробуйте пройти наше испытание ещё раз, что бы проверить ваши знаия языка
    </div>
  )
  return (
    <section className={styles.gameStatContainer}>
      <GameMenu />
      {Boolean(!studiedWords.length) && message}
      {Boolean(studiedWords.length) && <GameStatList />}
    </section>
  )
}
export default GameStat
