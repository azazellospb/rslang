/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { IWord } from '../../../../types/models'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux'
import { audioGameSlice } from '../../../redux/reducers/audioGameSlice'
import createLearnedWordAndPutItToArr from '../audiogame-actions'
import styles from '../Audiogame.module.css'

function Answer({ keyNumber, currtWord }: IAnswerBtn) {
  const { currentWord, changeStyle } = useAppSelector((state) => state.audioGameSlice)
  const dispatch = useAppDispatch()
  const [styleBtn, setStyle] = useState('')

  function handleClick(
    e: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>,
  ) {
    if (currtWord.word === currentWord?.word) {
      dispatch(audioGameSlice.actions.setStyles(true))
      setStyle(`${styles.answerRight}`)
      dispatch(createLearnedWordAndPutItToArr(currtWord, true))
      localStorage.setItem('newWords', currtWord.word)
    } else {
      dispatch(audioGameSlice.actions.setStyles(true))
      setStyle(`${styles.answerWrong}`)
      dispatch(createLearnedWordAndPutItToArr(currtWord, false))
    }
  }

  return (
    <button
      type="button"
      className={!changeStyle ? `${styles.answersItem}` : `${styles.answersItem} ${styleBtn}`}
      onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e)}
      disabled={changeStyle}
    >
      <span>{`${keyNumber}. `}</span>
      <span>{currtWord.wordTranslate}</span>
    </button>
  )
}

export default Answer

interface IAnswerBtn {
  keyNumber: object | number | string
  currtWord: IWord
}
