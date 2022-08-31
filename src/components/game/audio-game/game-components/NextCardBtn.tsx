/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux'
import { getBeforePageWords, getOtherUnlearned } from '../../../redux/reducers/aggregatedSlice'
import { audioGameSlice } from '../../../redux/reducers/audioGameSlice'
import { currentWord } from '../../../redux/reducers/sprintGameSlice'
import styles from '../Audiogame.module.css'

export default function NextCardBtn() {
  const MAX_NUMBER_WORDS = 19
  let numberOfWords: number
  const dispatch = useAppDispatch()
  const startDada = useAppSelector(getBeforePageWords)
  const proposeDada = useAppSelector(getOtherUnlearned)

  // let data: IWord[] | IUnlearnedWord[]
  // if (startDada.length) {
  //   data = startDada
  // } else if (proposeDada.length) {
  //   data = proposeDada
  // } else {
  //   data = useAppSelector((state) => state.sprintGameSlice.gameData)
  // }
  // Эту строку убрать если код выше раскомментирован
  const data = useAppSelector((state) => state.sprintGameSlice.gameData)
  if (data.length > MAX_NUMBER_WORDS) {
    numberOfWords = MAX_NUMBER_WORDS
  } else {
    numberOfWords = data.length
  }

  const { changeStyle, counterProgress, counterWord } = useAppSelector(
    (state) => state.audioGameSlice,
  )
  // const dispatch = useAppDispatch()

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
