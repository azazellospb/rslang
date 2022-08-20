/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react'
import FirstModalForGame from '../components/game/modal/FirstModalGame'
import { useAppSelector } from '../components/redux/hooks/redux'

export default function SprintChallenge() {
  const gameLoader = useAppSelector((state) => state.sprintGameSlice.gameLoader)
  return (
    <>
      {gameLoader && <FirstModalForGame />}
    </>

  )
}
