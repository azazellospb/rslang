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

function Answer({ keyNumber, currtWord, copyKey }: IAnswerBtn) {
  const { currentWord, changeStyle } = useAppSelector((state) => state.audioGameSlice)
  const dispatch = useAppDispatch()
  console.log(copyKey)
  const data = useAppSelector((state) => state.sprintGameSlice.gameData)
  // dispatch(fetchDeleteWord(currtWord))
  const [styleBtn, setStyle] = useState('')
  // let styleBtn = ''
  // const styleBtn = `${styles.answersItem} ${styles.changeStyle}`
  useEffect(() => {
    setStyle('')
  }, [])
  function handleClick(
    e: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>,
  ) {
    console.log(e.currentTarget)

    if (currtWord.word === currentWord?.word) {
      dispatch(audioGameSlice.actions.setStyles(true))
      // dispatch(fetchWordForSprintGameSuccess(data.filter((words) => words !== currtWord)))
      // dispatch(audioGameSlice.actions.learnedWord(currtWord))
      setStyle(`${styles.answerRight}`)
      // changeStyle
      console.log('Yes', currtWord.word)
    } else {
      dispatch(audioGameSlice.actions.setStyles(true))
      // dispatch(fetchWordForSprintGameSuccess(data.filter((words) => words !== currtWord)))
      // dispatch(audioGameSlice.actions.learnedWord(currtWord))
      setStyle(`${styles.answerWrong}`)
    }
  }
  // (e: React.MouseEvent<HTMLButtonElement>)
  return (
    <button
      type="button"
      // className={!changeStyle ? `${styles.answersItem}` : `${styleBtn}`}
      className={styleBtn}
      onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e)}
      // onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e)}
      // onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => handleClick(e)}
      // role="button"
      // tabIndex={0}
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
  copyKey: string
  // onClick: () => void
  // answers: IWord[]
}

interface IGameStat {
  right: IWord[]
  wrong: IWord[]
}
