/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react'
// import Audiogame from '../components/game/audio-game/Audiogame'
import AudiogameMain from '../components/game/audio-game/AudiogameMain'
import FirstModalForGame from '../components/game/modal/FirstModalGame'
import { useAppSelector } from '../components/redux/hooks/redux'
import { IDescription } from '../types/sprint-game-models'

export default function AudioChallenge() {
  const descriptObj: IDescription = {
    title: 'Аудиовызов',
    description: 'Тренировка Аудиовызов развивает словарный запас. Вы должны выбрать перевод услышанного слова.',
  }
  const isOpenModal = useAppSelector((state) => state.sprintGameSlice.isModalOpen)
  return (
    <div className="audiogame-page">
      {isOpenModal && <FirstModalForGame obj={descriptObj} />}
      {!isOpenModal && <AudiogameMain />}
    </div>
  )
}
