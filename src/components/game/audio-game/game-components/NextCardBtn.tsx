/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { IUnlearnedWord, IWord } from '../../../../types/models'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux'
import { getBeforePageWords, getOtherUnlearned } from '../../../redux/reducers/aggregatedSlice'
import { audioGameSlice } from '../../../redux/reducers/audioGameSlice'
import { gameSlice } from '../../../redux/reducers/gameSlice'
import createLearnedWordAndPutItToArr from '../audiogame-actions'
import styles from '../Audiogame.module.css'

export default function NextCardBtn() {
  const MAX_NUMBER_WORDS = 19
  let numberOfWords: number
  const dispatch = useAppDispatch()
  const startDada = useAppSelector(getBeforePageWords)
  const proposeDada = useAppSelector(getOtherUnlearned)

  let data: IWord[] | IUnlearnedWord[]
  if (startDada.length) {
    data = startDada
  } else if (proposeDada.length) {
    data = proposeDada
  } else {
    data = useAppSelector((state) => state.sprintGameSlice.gameData)
  }
  // const data = useAppSelector((state) => state.sprintGameSlice.gameData)
  if (data.length > MAX_NUMBER_WORDS) {
    numberOfWords = MAX_NUMBER_WORDS
  } else {
    numberOfWords = data.length
  }

  const { changeStyle, counterProgress, counterWord, currentWord } = useAppSelector(
    (state) => state.audioGameSlice,
  )

  let endGame = '▶▷▶▷▶'
  if (counterWord >= numberOfWords) {
    endGame = 'Завершить игру'
  }
  const handleConfirmBtn = () => {
    if (counterWord >= numberOfWords) {
      dispatch(gameSlice.actions.fetchGameOver(true))
      dispatch(createLearnedWordAndPutItToArr(currentWord, false))
      return
    }
    dispatch(audioGameSlice.actions.setCurrentWord(data[counterWord]))
    dispatch(audioGameSlice.actions.setStyles(false))
    dispatch(audioGameSlice.actions.fetchCounterWord(counterWord + 1))
    dispatch(audioGameSlice.actions.fetchCounterProgress(counterProgress + 1))
    dispatch(createLearnedWordAndPutItToArr(currentWord, false))
  }

  return (
    <div>
      <input
        type="button"
        value={!changeStyle ? 'Не знаю' : `${endGame}`}
        className={changeStyle ? styles.answerBtn : `${styles.answerBtn} ${styles.changeBtn}`}
        onClick={handleConfirmBtn}
      />
    </div>
  )
}
