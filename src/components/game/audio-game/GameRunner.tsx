/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import AnswerControls from './game-components/AnswerControls'
import { useAppSelector } from '../../redux/hooks/redux'
import { getBeforePageWords, getOtherUnlearned } from '../../redux/reducers/aggregatedSlice'
import ProposeChapter from './audio-modal/ProposeChapter'
import ProposeGame from './audio-modal/ProposeGame'
import Audiogame from './Audiogame'

function GameRunner() {
  const isFromDictionary = useAppSelector((state) => state.sprintGameSlice.isFromDictionary)
  const startDada = useAppSelector(getBeforePageWords)
  const proposeDada = useAppSelector(getOtherUnlearned)
  // let propose
  // if (proposeDada) {
  //   propose = ProposeGame
  // } else {
  //   propose = ProposeChapter
  // }
  return (
    <div>
      {/* <Audiogame />
      <AnswerControls /> */}
      {/* {!isFromDictionary && (
        <>
          <Audiogame />
          <AnswerControls />
        </>
      )} */}
      {!isFromDictionary ? (
        <>
          <Audiogame />
          <AnswerControls />
        </>
      ) : startDada.length > 0 ? (
        <>
          <Audiogame />
          <AnswerControls />
        </>
      ) : proposeDada.length > 0 ? (
        <ProposeGame />
      ) : (
        <ProposeChapter />
      )}
    </div>
  )
}

export default GameRunner
