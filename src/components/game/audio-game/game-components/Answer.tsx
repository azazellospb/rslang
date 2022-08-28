/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { KeyboardEventHandler, useEffect, useState } from 'react'
import { IWord } from '../../../../types/models'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux'
import { audioGameSlice } from '../../../redux/reducers/audioGameSlice'
import sprintGameSlice, {
  fetchDeleteWord,
  fetchWordForSprintGameSuccess,
} from '../../../redux/reducers/sprintGameSlice'
import styles from '../Audiogame.module.css'

function Answer({ keyNumber, currtWord }: IAnswerBtn) {
  // function Answer({ keyNumber, currtWord, copyKey }: IAnswerBtn) {
  const { currentWord, changeStyle } = useAppSelector((state) => state.audioGameSlice)
  const dispatch = useAppDispatch()
  // const data = useAppSelector((state) => state.sprintGameSlice.gameData)
  const [styleBtn, setStyle] = useState('')
  // useEffect(() => {
  //   setStyle('')
  // }, [])
  function handleClick(
    e: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>,
  ) {
    if (currtWord.word === currentWord?.word) {
      dispatch(audioGameSlice.actions.setStyles(true))
      setStyle(`${styles.answerRight}`)
      // console.log('Yes', currtWord.word)
    } else {
      dispatch(audioGameSlice.actions.setStyles(true))
      setStyle(`${styles.answerWrong}`)
    }
  }

  return (
    <button
      type="button"
      className={!changeStyle ? `${styles.answersItem}` : `${styles.answersItem} ${styleBtn}`}
      // className={styleBtn}
      onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e)}
      // onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => handleClick(e)}
      disabled={changeStyle}
    >
      <span>{`${keyNumber}. `}</span>
      <span>{currtWord.word}</span>
    </button>
  )
}

export default Answer

interface IAnswerBtn {
  keyNumber: object | number | string
  currtWord: IWord
  // copyKey: string
  // answers: IWord[]
}

interface IGameStat {
  right: IWord[]
  wrong: IWord[]
}
