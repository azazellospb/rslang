/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react'
import FirstModalForGame from '../components/game/modal/FirstModalGame'
import { useAppSelector } from '../components/redux/hooks/redux'
import { IDescription } from '../types/sprint-game-models'

export default function AudioChallenge() {
  const descriptObj: IDescription = {
    title: 'Аудиовызов',
    description: 'Тренировка Аудиовызов развивает словарный запас. Вы должны выбрать перевод услышанного слова.',
  }
  const gameLoader = useAppSelector((state) => state.sprintGameSlice.gameLoader)
  return (
    <>
      {gameLoader && <FirstModalForGame obj={descriptObj} />}
    </>
  )
}
