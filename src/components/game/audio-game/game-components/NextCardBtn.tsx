/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux'
import { audioGameSlice } from '../../../redux/reducers/audioGameSlice'
import styles from '../Audiogame.module.css'

export default function NextCardBtn() {
  const data = useAppSelector((state) => state.sprintGameSlice.gameData)
  const { changeStyle, counterProgress, counterWord } = useAppSelector(
    (state) => state.audioGameSlice,
  )
  const dispatch = useAppDispatch()

  const handleConfirmBtn = () => {
    if (counterWord > 19) {
      dispatch(audioGameSlice.actions.fetchCounterWord(counterWord))
      dispatch(audioGameSlice.actions.fetchCounterProgress(counterProgress))
      return
    }
    dispatch(audioGameSlice.actions.setCurrentWord(data[counterWord]))
    dispatch(audioGameSlice.actions.setStyles(false))
    dispatch(audioGameSlice.actions.fetchCounterWord(counterWord + 1))
    dispatch(audioGameSlice.actions.fetchCounterProgress(counterProgress + 1))
  }

  return (
    <div>
      <input
        type="button"
        value={!changeStyle ? 'Не знаю' : '-->'}
        className={changeStyle ? styles.answerBtn : `${styles.answerBtn} ${styles.changeBtn}`}
        onClick={handleConfirmBtn}
      />
    </div>
  )
}