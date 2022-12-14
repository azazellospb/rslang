/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react'
import FirstModalForGame from '../components/game/modal/FirstModalGame'
import SprintGameMainBlock from '../components/game/sprint-game/Sprint-main-block'
import { useAppSelector } from '../components/redux/hooks/redux'
import { IDescription } from '../types/sprint-game-models'
import styles from '../components/game/sprint-game/sprint-game.module.css'

export default function SprintChallenge() {
  const descriptObj: IDescription = {
    title: 'Спринт',
    description: 'Tренирует навык быстрого перевода с английского языка на русский.Вам нужно выбрать соответствует ли перевод предложенному слову.',
  }
  const isOpenModal = useAppSelector((state) => state.sprintGameSlice.isModalOpen)
  return (
    <div className={styles.printChallengePage}>
      <div className={styles.printChallengePageContainer}>
        {isOpenModal && <FirstModalForGame obj={descriptObj} />}
        {/* {gameLoader && Loader} */}
        {!isOpenModal && <SprintGameMainBlock />}
      </div>
    </div>
  )
}
