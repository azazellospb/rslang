/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'
import AnswerControls from './game-components/AnswerControls'
import { useAppSelector } from '../../redux/hooks/redux'
import { getBeforePageWords, getOtherUnlearned } from '../../redux/reducers/aggregatedSlice'
import ProposeChapter from './audio-modal/ProposeChapter'
import ProposeGame from './audio-modal/ProposeGame'
import Audiogame from './Audiogame'

function GameRunner() {
  const isFromDictionary = useAppSelector((state) => state.sprintGameSlice.isFromDictionary)
  const unlearnedDada = useAppSelector(getBeforePageWords)
  const proposeDada = useAppSelector(getOtherUnlearned)

  return (
    <>
      {/* <Audiogame />
      <AnswerControls /> */}
      {/* {!isFromDictionary && (
        <>
          <Audiogame />
          <AnswerControls />
        </>
      )} */}
      {!isFromDictionary || unlearnedDada.length > 0 ? (
        <>
          <Audiogame />
          <AnswerControls />
        </>
      ) : proposeDada.length === 0 ? (
        <ProposeChapter />
      ) : (
        <ProposeGame />
      )}
    </>
  )
}

export default GameRunner
