/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux'
import { audioGameSlice } from '../../../redux/reducers/audioGameSlice'
import { gameSlice } from '../../../redux/reducers/gameSlice'
import createLearnedWordAndPutItToArr from '../audiogame-actions'
import styles from '../Audiogame.module.css'

export default function NextCardBtn() {
  const data = useAppSelector((state) => state.sprintGameSlice.gameData)
  const {
    changeStyle, counterProgress, counterWord, currentWord,
  } = useAppSelector(
    (state) => state.audioGameSlice,
  )
  const dispatch = useAppDispatch()
  let endGame = '-->'
  if (counterWord >= data.length - 1) {
    endGame = 'Завершить игру'
  }
  const handleConfirmBtn = () => {
    if (counterWord >= data.length - 1) {
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
