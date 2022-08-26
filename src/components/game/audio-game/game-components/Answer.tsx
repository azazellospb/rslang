/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
import React, { useEffect, useState } from 'react'
import { IWord } from '../../../../types/models'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux'
import { audioGameSlice, progressWorker } from '../../../redux/reducers/audioGameSlice'
import { fetchWordForSprintGameSuccess } from '../../../redux/reducers/sprintGameSlice'
import styles from '../Audiogame.module.css'

function Answer({ keyNumber, index }: IAnswerBtn) {
  const gameData = useAppSelector((state) => state.sprintGameSlice.gameData)
  const currentWord = useAppSelector((state) => state.audioGameSlice.currentWord)
  const changeStyle = useAppSelector((state) => state.audioGameSlice.changeStyle)
  // const { currentWord, changeStyle } = useAppSelector((state) => state.audioGameSlice)
  const dispatch = useAppDispatch()

  // dispatch(fetchDeleteWord(currtWord))
  const [styleBtn, setStyle] = useState('')
  // let styleBtn = ''
  // const styleBtn = `${styles.answersItem} ${styles.changeStyle}`
  useEffect(() => {
    setStyle('')
  }, [])
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    console.log(e.currentTarget)

    if (/* gameData[index].id */ e.currentTarget.id === currentWord?.id) {
      dispatch(audioGameSlice.actions.setStyles(true))
      console.log(gameData.filter((words) => words !== currentWord))
      dispatch(fetchWordForSprintGameSuccess(gameData.filter((words) => words.id !== currentWord.id)))
      // setStyle(`${styles.answerRight}`)
      // changeStyle
      console.log('Yes', gameData[index].word)
      dispatch(progressWorker())
    } else {
      dispatch(audioGameSlice.actions.setStyles(true))
      dispatch(fetchWordForSprintGameSuccess(gameData.filter((words) => words !== currentWord)))

      // dispatch(fetchWordForSprintGameSuccess(data.filter((words) => words !== currtWord)))
      // dispatch(audioGameSlice.actions.learnedWord(currtWord))
      // setStyle(`${styles.answerWrong}`)
      dispatch(progressWorker())
    }
  }
  // (e: React.MouseEvent<HTMLButtonElement>)
  return (
    <button
      id={gameData[index].id}
      type="button"
      className={!changeStyle ? `${styles.answersItem}` : `${styleBtn}`}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e)}
      // onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e)}
      // onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => handleClick(e)}
      // role="button"
      // tabIndex={0}
      // disabled={changeStyle}
    >
      <span>{`${keyNumber}. `}</span>
      <span>{gameData[index].word}</span>
    </button>
  )
}

export default Answer

interface IAnswerBtn {
  keyNumber: number | string
  index: number,
}

interface IGameStat {
  right: IWord[]
  wrong: IWord[]
}
