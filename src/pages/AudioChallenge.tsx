/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react'
import FirstModalForGame from '../components/game/modal/FirstModalGame'
import { useAppSelector } from '../components/redux/hooks/redux'
import { IDescription } from '../types/sprint-game-models'
import styles from '../components/game/sprint-game/sprint-game.module.css'

export default function AudioChallenge() {
  const descriptObj: IDescription = {
    title: 'Аудиовызов',
    description: 'Тренировка Аудиовызов развивает словарный запас. Вы должны выбрать перевод услышанного слова.',
  }
  const isOpenModal = useAppSelector((state) => state.sprintGameSlice.isModalOpen)
  return (
    <div className={styles.printChallengePage}>
      {isOpenModal && <FirstModalForGame obj={descriptObj} />}
      {/* {gameLoader && Loader} */}
      {!isOpenModal && 'Компонент Максима'/* <SprintGameMainBlock /> */}
    </div>
  )
}
